import React, { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';

export interface NotificationItem {
  id: string;
  type: 'price-change';
  serviceId: string;
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
  oldPrice?: number;
  newPrice?: number;
}

interface NotificationsContextType {
  notifications: NotificationItem[];
  addNotification: (n: Omit<NotificationItem, 'id' | 'createdAt' | 'read'>) => void;
  markRead: (id: string) => void;
  markAllRead: () => void;
  unreadCount: number;
  recentPriceNotifications: (limit?: number) => NotificationItem[];
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);
const STORAGE_KEY = 'app-notifications-v1';

export const NotificationsProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setNotifications(JSON.parse(raw));
    } catch (e) {
      console.error('Error loading notifications store', e);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
  }, [notifications]);

  const addNotification = useCallback((n: Omit<NotificationItem, 'id' | 'createdAt' | 'read'>) => {
    setNotifications(prev => [{
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      createdAt: new Date().toISOString(),
      read: false,
      ...n
    }, ...prev]);
  }, []);

  const markRead = useCallback((id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications(prev => prev.map(n => n.read ? n : { ...n, read: true }));
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const recentPriceNotifications = useCallback((limit = 5) => notifications.filter(n => n.type === 'price-change').slice(0, limit), [notifications]);

  return (
    <NotificationsContext.Provider value={{ notifications, addNotification, markRead, markAllRead, unreadCount, recentPriceNotifications }}>
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => {
  const ctx = useContext(NotificationsContext);
  if (!ctx) throw new Error('useNotifications must be used within NotificationsProvider');
  return ctx;
};
