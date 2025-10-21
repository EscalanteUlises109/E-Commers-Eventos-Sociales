import React, { createContext, useContext, useEffect, useMemo, useState, useCallback, ReactNode } from 'react';
import { useNotifications } from './NotificationsContext';

// Types
export interface CartItem {
  id: string;          // service/product id
  title: string;
  price: number;       // numeric price in MXN
  image?: string;
  quantity: number;
  category?: string;
  max?: number;        // optional max per item (stock/limit)
}

export interface AppliedCoupon {
  code: string;
  type: 'percent' | 'fixed';
  value: number; // percent (0-100) or fixed amount
  description?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  updateQty: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  subtotal: number;
  discountTotal: number;
  taxTotal: number;
  shipping: number;
  total: number;
  itemCount: number;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  coupon?: AppliedCoupon | null;
  availableCoupons: AppliedCoupon[];
  setShippingMode: (mode: ShippingMode) => void;
  shippingMode: ShippingMode;
}

type ShippingMode = 'standard' | 'express' | 'pickup';

const CartContext = createContext<CartContextType | undefined>(undefined);
const STORAGE_KEY = 'app-cart-v1';
const COUPON_KEY = 'app-cart-coupon-v1';

// Simple coupon catalog (could be extended / fetched later)
const COUPONS: AppliedCoupon[] = [
  { code: 'BIENVENIDO10', type: 'percent', value: 10, description: '10% de descuento en tu primera compra' },
  { code: 'ENVIOGRATIS', type: 'fixed', value: 150, description: 'Equivalente a envío estándar gratis' },
  { code: 'VIP25', type: 'percent', value: 25, description: '25% para clientes VIP (demo)' }
];

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [coupon, setCoupon] = useState<AppliedCoupon | null>(null);
  const [shippingMode, setShippingMode] = useState<ShippingMode>('standard');
  // Notifications (lazy try/catch in case provider order changes)
  let notify: ReturnType<typeof useNotifications>['addNotification'] | undefined;
  try { notify = useNotifications().addNotification; } catch {}

  // Load persisted state
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
      const c = localStorage.getItem(COUPON_KEY);
      if (c) {
        const parsed: AppliedCoupon = JSON.parse(c);
        if (COUPONS.find(cp => cp.code === parsed.code)) setCoupon(parsed);
      }
    } catch (e) {
      console.error('Error loading cart', e);
    }
  }, []);

  // Persist
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);
  useEffect(() => {
    if (coupon) localStorage.setItem(COUPON_KEY, JSON.stringify(coupon));
    else localStorage.removeItem(COUPON_KEY);
  }, [coupon]);

  const addItem: CartContextType['addItem'] = useCallback((item) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      const qty = item.quantity ?? 1;
      if (existing) {
        const newQty = Math.min((existing.quantity + qty), existing.max || 99);
        if (notify) {
          notify({
            type: 'price-change', // reusing type until more types added
            serviceId: item.id,
            title: 'Cantidad actualizada',
            message: `Ahora tienes ${newQty} × ${item.title} en el carrito.`
          });
        }
        return prev.map(i => i.id === item.id ? { ...i, quantity: newQty } : i);
      }
      if (notify) {
        notify({
          type: 'price-change',
          serviceId: item.id,
          title: 'Añadido al carrito',
          message: `${item.title} agregado al carrito.`
        });
      }
      return [...prev, { ...item, quantity: Math.min(qty, item.max || 99) }];
    });
  }, []);

  const updateQty: CartContextType['updateQty'] = useCallback((id, quantity) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, quantity: Math.max(1, Math.min(quantity, i.max || 99)) } : i));
  }, []);

  const removeItem: CartContextType['removeItem'] = useCallback((id) => {
    setItems(prev => prev.filter(i => i.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setCoupon(null);
  }, []);

  // Pricing logic
  const subtotal = useMemo(() => items.reduce((acc, i) => acc + i.price * i.quantity, 0), [items]);

  const discountTotal = useMemo(() => {
    if (!coupon) return 0;
    if (coupon.type === 'percent') return subtotal * (coupon.value / 100);
    return Math.min(coupon.value, subtotal);
  }, [coupon, subtotal]);

  const shipping = useMemo(() => {
    if (!items.length) return 0;
    switch (shippingMode) {
      case 'pickup': return 0;
      case 'express': return 299;
      default: return 149; // standard
    }
  }, [shippingMode, items.length]);

  const taxable = subtotal - discountTotal;
  const taxRate = 0.16; // IVA 16% demo
  const taxTotal = useMemo(() => Math.round(taxable * taxRate), [taxable]);
  const total = useMemo(() => Math.max(0, taxable + taxTotal + shipping), [taxable, taxTotal, shipping]);

  const itemCount = useMemo(() => items.reduce((acc, i) => acc + i.quantity, 0), [items]);

  const applyCoupon: CartContextType['applyCoupon'] = useCallback((code) => {
    const found = COUPONS.find(c => c.code.toLowerCase() === code.trim().toLowerCase());
    if (!found) return false;
    setCoupon(found);
    if (notify) {
      notify({
        type: 'price-change',
        serviceId: 'coupon-'+found.code,
        title: 'Cupón aplicado',
        message: `Se aplicó el cupón ${found.code}.`
      });
    }
    return true;
  }, []);

  const removeCoupon = useCallback(() => setCoupon(null), []);

  const value: CartContextType = {
    items,
    addItem,
    updateQty,
    removeItem,
    clearCart,
    subtotal,
    discountTotal,
    taxTotal,
    shipping,
    total,
    itemCount,
    applyCoupon,
    removeCoupon,
    coupon,
    availableCoupons: COUPONS,
    setShippingMode,
    shippingMode
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
