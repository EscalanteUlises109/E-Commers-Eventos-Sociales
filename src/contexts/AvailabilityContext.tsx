import React, { createContext, useContext, useCallback, useEffect, useState, ReactNode } from 'react';
import { format } from 'date-fns';

export interface AvailabilityDay {
  date: string;          // YYYY-MM-DD
  status: 'available' | 'blocked' | 'booked';
  capacity?: number;     // Optional capacity for that date
  used?: number;         // Number of bookings/reservations
  notes?: string;
}

interface AvailabilityContextType {
  getServiceDays: (serviceId: string) => AvailabilityDay[];
  toggleBlockDate: (serviceId: string, date: Date) => void;
  setCapacity: (serviceId: string, date: Date, capacity: number) => void;
  addBooking: (serviceId: string, date: Date) => void; // increments used and sets status booked if capacity reached
  isDateUnavailable: (serviceId: string, date: Date) => boolean;
  getDateInfo: (serviceId: string, date: Date) => AvailabilityDay | undefined;
  listServicesWithAvailability: () => string[];
}

interface StoreShape {
  [serviceId: string]: AvailabilityDay[];
}

const AvailabilityContext = createContext<AvailabilityContextType | undefined>(undefined);

const STORAGE_KEY = 'app-availability-v1';

export const AvailabilityProvider = ({ children }: { children: ReactNode }) => {
  const [store, setStore] = useState<StoreShape>({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setStore(JSON.parse(raw));
    } catch (e) {
      console.error('Error loading availability', e);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  }, [store]);

  const getServiceDays = useCallback((serviceId: string) => {
    return store[serviceId] || [];
  }, [store]);

  const upsertDay = useCallback((serviceId: string, updater: (prev: AvailabilityDay[]) => AvailabilityDay[]) => {
    setStore(prev => ({ ...prev, [serviceId]: updater(prev[serviceId] || []) }));
  }, []);

  const dateKey = (d: Date) => format(d, 'yyyy-MM-dd');

  const toggleBlockDate = useCallback((serviceId: string, date: Date) => {
    const key = dateKey(date);
    upsertDay(serviceId, days => {
      const existing = days.find(d => d.date === key);
      if (!existing) {
        return [...days, { date: key, status: 'blocked' }];
      }
      // Toggle logic: blocked -> available, available -> blocked, booked remains booked
      if (existing.status === 'booked') return days; // don't toggle booked automatically
      const nextStatus = existing.status === 'blocked' ? 'available' : 'blocked';
      return days.map(d => d.date === key ? { ...d, status: nextStatus } : d);
    });
  }, [upsertDay]);

  const setCapacity = useCallback((serviceId: string, date: Date, capacity: number) => {
    const key = dateKey(date);
    upsertDay(serviceId, days => {
      const existing = days.find(d => d.date === key);
      if (!existing) {
        return [...days, { date: key, status: 'available', capacity, used: 0 }];
      }
      return days.map(d => d.date === key ? { ...d, capacity } : d);
    });
  }, [upsertDay]);

  const addBooking = useCallback((serviceId: string, date: Date) => {
    const key = dateKey(date);
    upsertDay(serviceId, days => {
      const existing = days.find(d => d.date === key);
      if (!existing) {
        return [...days, { date: key, status: 'booked', capacity: 1, used: 1 }];
      }
      if (existing.status === 'blocked') return days; // cannot book blocked
      const used = (existing.used || 0) + 1;
      const capacity = existing.capacity || 1;
      const status = used >= capacity ? 'booked' : 'available';
      return days.map(d => d.date === key ? { ...d, used, capacity, status } : d);
    });
  }, [upsertDay]);

  const isDateUnavailable = useCallback((serviceId: string, date: Date) => {
    const key = dateKey(date);
    const day = (store[serviceId] || []).find(d => d.date === key);
    return !!day && (day.status === 'blocked' || day.status === 'booked');
  }, [store]);

  const getDateInfo = useCallback((serviceId: string, date: Date) => {
    const key = dateKey(date);
    return (store[serviceId] || []).find(d => d.date === key);
  }, [store]);

  const listServicesWithAvailability = useCallback(() => Object.keys(store), [store]);

  return (
    <AvailabilityContext.Provider value={{
      getServiceDays,
      toggleBlockDate,
      setCapacity,
      addBooking,
      isDateUnavailable,
      getDateInfo,
      listServicesWithAvailability
    }}>
      {children}
    </AvailabilityContext.Provider>
  );
};

export const useAvailability = () => {
  const ctx = useContext(AvailabilityContext);
  if (!ctx) throw new Error('useAvailability must be used within AvailabilityProvider');
  return ctx;
};
