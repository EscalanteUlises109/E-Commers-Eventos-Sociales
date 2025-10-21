import React from 'react';
import { useCart } from '@/contexts/CartContext';
import { X, Trash2, Plus, Minus, ShoppingCart, Percent, Truck, Loader2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface CartSidebarProps {
  open: boolean;
  onClose: () => void;
  onGoCheckout?: () => void;
}

export const CartSidebar: React.FC<CartSidebarProps> = ({ open, onClose, onGoCheckout }) => {
  const { items, updateQty, removeItem, clearCart, subtotal, discountTotal, taxTotal, shipping, total, coupon, applyCoupon, removeCoupon, availableCoupons, setShippingMode, shippingMode } = useCart();
  const [code, setCode] = React.useState('');
  const [couponError, setCouponError] = React.useState<string | null>(null);
  const [applying, setApplying] = React.useState(false);
  const { toast } = require('@/hooks/use-toast');

  React.useEffect(() => { if (!open) { setCode(''); setCouponError(null); } }, [open]);

  const handleApply = () => {
    if (!code.trim() || applying) return;
    setApplying(true);
    setTimeout(() => {
      const ok = applyCoupon(code.trim());
      setApplying(false);
      if (!ok) {
        setCouponError('Cupón inválido');
        toast.toast({ title: 'Cupón inválido', description: 'Verifica el código ingresado.' });
      } else {
        setCouponError(null);
        toast.toast({ title: 'Cupón aplicado', description: 'El descuento se aplicó correctamente.' });
      }
    }, 500);
  };

  return (
    <div className={`fixed inset-0 z-[70] transition-pointer-events ${open ? '' : 'pointer-events-none'}`} aria-hidden={!open}>
      {/* Backdrop */}
      <div className={`absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`} onClick={onClose} />
      {/* Panel */}
      <aside className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl border-l flex flex-col translate-x-${open ? '0' : 'full'} transition-transform duration-300`}> 
        <div className="p-4 flex items-center justify-between border-b">
          <h2 className="text-lg font-bold flex items-center gap-2"><ShoppingCart className="w-5 h-5 text-rose" /> Tu Carrito</h2>
          <Button variant="ghost" size="sm" onClick={onClose}><X className="w-5 h-5" /></Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 && (
            <div className="text-center py-16">
              <ShoppingCart className="w-12 h-12 mx-auto text-gray-300 mb-4" />
              <p className="font-semibold text-foreground mb-2">Tu carrito está vacío</p>
              <p className="text-sm text-elegant-gray">Explora servicios y agrégalos para planear tu evento perfecto.</p>
            </div>
          )}
          {items.map(it => (
            <div key={it.id} className="border rounded-xl p-4 bg-white/70 backdrop-blur-sm shadow-sm flex gap-4 relative">
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center text-xs font-medium">
                {it.image ? <img src={it.image} alt={it.title} className="w-full h-full object-cover" /> : it.category || 'SERV'}
              </div>
              <div className="flex-1 space-y-1">
                <p className="font-semibold leading-tight line-clamp-2">{it.title}</p>
                <p className="text-xs text-elegant-gray capitalize">{it.category}</p>
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-2">
                    <Button size="icon" variant="outline" className="h-7 w-7" onClick={() => updateQty(it.id, it.quantity - 1)} disabled={it.quantity <= 1}><Minus className="w-3 h-3" /></Button>
                    <span className="text-sm font-medium w-6 text-center">{it.quantity}</span>
                    <Button size="icon" variant="outline" className="h-7 w-7" onClick={() => updateQty(it.id, it.quantity + 1)} disabled={it.max ? it.quantity >= it.max : false}><Plus className="w-3 h-3" /></Button>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">${(it.price * it.quantity).toLocaleString('es-MX')}</p>
                    <p className="text-[11px] text-elegant-gray">${it.price.toLocaleString('es-MX')} c/u</p>
                  </div>
                </div>
              </div>
              <button className="absolute top-2 right-2 text-gray-400 hover:text-red-500" onClick={() => removeItem(it.id)}>
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Coupon & Summary */}
        <div className="border-t p-4 space-y-4 bg-white/90 backdrop-blur">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium flex items-center gap-1"><Truck className="w-4 h-4 text-rose" /> Envío</span>
              <select value={shippingMode} onChange={e => setShippingMode(e.target.value as any)} className="text-sm border rounded px-2 py-1 bg-white">
                <option value="standard">Estándar ${items.length ? '149' : '0'}</option>
                <option value="express">Express 299</option>
                <option value="pickup">Recoger (Gratis)</option>
              </select>
            </div>
            <div className="flex gap-2 items-start">
              <Input placeholder="Código de cupón" value={code} onChange={e => setCode(e.target.value)} className="h-9" />
              {!coupon && <Button onClick={handleApply} variant="outline" className="h-9 text-xs disabled:opacity-60" disabled={applying}>
                {applying ? <Loader2 className="w-3 h-3 mr-1 animate-spin" /> : <Percent className="w-3 h-3 mr-1" />} 
                {applying ? 'Validando' : 'Aplicar'}
              </Button>}
              {coupon && <Button onClick={() => { removeCoupon(); setCode(''); toast.toast({ title: 'Cupón removido' }); }} variant="outline" className="h-9 text-xs" >Quitar</Button>}
            </div>
            {couponError && <p className="text-xs text-red-500">{couponError}</p>}
            {coupon && <p className="text-xs text-green-600">Cupón aplicado: {coupon.code} ({coupon.description || (coupon.type === 'percent' ? `${coupon.value}%` : `$${coupon.value}`)})</p>}
            {!coupon && code.length === 0 && (
              <div className="flex flex-wrap gap-2">
                {availableCoupons.slice(0,2).map(c => (
                  <button key={c.code} onClick={() => { setCode(c.code); }} className="text-[11px] px-2 py-1 rounded-full bg-rose/10 text-rose hover:bg-rose/20 transition">{c.code}</button>
                ))}
              </div>
            )}
          </div>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toLocaleString('es-MX')}</span></div>
            {discountTotal > 0 && <div className="flex justify-between text-green-600"><span>Descuento</span><span>- ${discountTotal.toLocaleString('es-MX')}</span></div>}
            <div className="flex justify-between"><span>Impuestos (IVA)</span><span>${taxTotal.toLocaleString('es-MX')}</span></div>
            <div className="flex justify-between"><span>Envío</span><span>${shipping.toLocaleString('es-MX')}</span></div>
            <div className="flex justify-between font-semibold text-foreground pt-1 border-t"><span>Total</span><span>${total.toLocaleString('es-MX')}</span></div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="w-1/3 text-xs" disabled={!items.length} onClick={clearCart}><Trash2 className="w-4 h-4 mr-1" /> Vaciar</Button>
            <Button className="flex-1 bg-gradient-to-r from-rose to-gold hover:from-rose/90 hover:to-gold/90" disabled={!items.length} onClick={onGoCheckout}>Continuar</Button>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default CartSidebar;
