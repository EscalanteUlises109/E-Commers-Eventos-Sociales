import React, { createContext, useContext, useEffect, useMemo, useState, ReactNode, useCallback } from 'react';
import { useEvents } from './EventsContext';

export interface Promotion {
  id: string;
  label: string;
  percent: number; // 10 = 10% descuento
  start: string;   // YYYY-MM-DD
  end: string;     // YYYY-MM-DD
  active: boolean;
}

export interface PricingData {
  serviceId: string;
  base: number; // precio base numérico (sin formato)
  promotions: Promotion[];
  lastUpdated: string;
}

interface PricingContextType {
  pricing: Record<string, PricingData>;
  getBasePrice: (serviceId: string) => number | undefined;
  getEffectivePrice: (serviceId: string, date?: Date) => { price: number; appliedPromotion?: Promotion } | undefined;
  setBasePrice: (serviceId: string, newBase: number) => void;
  addPromotion: (serviceId: string, promo: Omit<Promotion, 'id'>) => Promotion;
  togglePromotion: (serviceId: string, promoId: string) => void;
  deletePromotion: (serviceId: string, promoId: string) => void;
  hasActivePromotion: (serviceId: string) => boolean;
}

const PricingContext = createContext<PricingContextType | undefined>(undefined);
const STORAGE_KEY = 'app-pricing-v1';

// Helper parse "$45,000" -> 45000
const parsePriceString = (v: string): number => {
  const cleaned = v.replace(/[^0-9,\.]/g, '').replace(/\./g, '').replace(/,/g, '.');
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
};

const isWithin = (d: Date, start: string, end: string) => {
  const ds = new Date(start + 'T00:00:00');
  const de = new Date(end + 'T23:59:59');
  return d >= ds && d <= de;
};

export const PricingProvider = ({ children }: { children: ReactNode }) => {
  const { events } = useEvents();
  const [pricing, setPricing] = useState<Record<string, PricingData>>({});

  // Load
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setPricing(JSON.parse(raw));
    } catch (e) {
      console.error('Error loading pricing store', e);
    }
  }, []);

  // Initialize missing services
  useEffect(() => {
    setPricing(prev => {
      let changed = false;
      const draft = { ...prev };
      events.forEach(ev => {
        if (!draft[ev.id]) {
          draft[ev.id] = {
            serviceId: ev.id,
            base: parsePriceString(ev.price),
            promotions: [],
            lastUpdated: new Date().toISOString()
          };
          changed = true;
        }
      });
      return changed ? draft : prev;
    });
  }, [events]);

  // Persist
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pricing));
  }, [pricing]);

  const setBasePrice = useCallback((serviceId: string, newBase: number) => {
    setPricing(prev => ({
      ...prev,
      [serviceId]: {
        ...(prev[serviceId] || { serviceId, base: newBase, promotions: [], lastUpdated: new Date().toISOString() }),
        base: newBase,
        lastUpdated: new Date().toISOString()
      }
    }));
  }, []);

  const addPromotion = useCallback((serviceId: string, promo: Omit<Promotion, 'id'>): Promotion => {
    const newPromo: Promotion = { id: `${Date.now()}-${Math.random().toString(16).slice(2)}`, ...promo };
    setPricing(prev => ({
      ...prev,
      [serviceId]: {
        ...(prev[serviceId] || { serviceId, base: 0, promotions: [], lastUpdated: new Date().toISOString() }),
        promotions: [newPromo, ...(prev[serviceId]?.promotions || [])],
        lastUpdated: new Date().toISOString()
      }
    }));
    return newPromo;
  }, []);

  const togglePromotion = useCallback((serviceId: string, promoId: string) => {
    setPricing(prev => ({
      ...prev,
      [serviceId]: {
        ...(prev[serviceId]!),
        promotions: prev[serviceId].promotions.map(p => p.id === promoId ? { ...p, active: !p.active } : p),
        lastUpdated: new Date().toISOString()
      }
    }));
  }, []);

  const deletePromotion = useCallback((serviceId: string, promoId: string) => {
    setPricing(prev => ({
      ...prev,
      [serviceId]: {
        ...(prev[serviceId]!),
        promotions: prev[serviceId].promotions.filter(p => p.id !== promoId),
        lastUpdated: new Date().toISOString()
      }
    }));
  }, []);

  const getBasePrice = useCallback((serviceId: string) => pricing[serviceId]?.base, [pricing]);

  const getEffectivePrice = useCallback((serviceId: string, date: Date = new Date()) => {
    const data = pricing[serviceId];
    if (!data) return undefined;
    if (!data.promotions.length) return { price: data.base };
    const activePromos = data.promotions.filter(p => p.active && isWithin(date, p.start, p.end));
    if (!activePromos.length) return { price: data.base };
    // Apply max discount
    const best = activePromos.reduce((acc, p) => p.percent > acc.percent ? p : acc, activePromos[0]);
    const discounted = Math.round(data.base * (1 - best.percent / 100));
    return { price: discounted, appliedPromotion: best };
  }, [pricing]);

  const hasActivePromotion = useCallback((serviceId: string) => {
    const eff = getEffectivePrice(serviceId);
    const base = getBasePrice(serviceId);
    return !!eff && !!base && eff.price < base;
  }, [getEffectivePrice, getBasePrice]);

  const value = useMemo(() => ({
    pricing,
    getBasePrice,
    getEffectivePrice,
    setBasePrice,
    addPromotion,
    togglePromotion,
    deletePromotion,
    hasActivePromotion
  }), [pricing, getBasePrice, getEffectivePrice, setBasePrice, addPromotion, togglePromotion, deletePromotion, hasActivePromotion]);

  return <PricingContext.Provider value={value}>{children}</PricingContext.Provider>;
};

export const usePricing = () => {
  const ctx = useContext(PricingContext);
  if (!ctx) throw new Error('usePricing must be used within PricingProvider');
  return ctx;
};

export const formatCurrency = (n: number) => {
  return n.toLocaleString('es-MX', { style: 'currency', currency: 'MXN', minimumFractionDigits: 0 });
};
