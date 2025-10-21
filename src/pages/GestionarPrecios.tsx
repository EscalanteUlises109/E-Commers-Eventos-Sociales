import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { useEvents } from "@/contexts/EventsContext";
import { usePricing, formatCurrency } from "@/contexts/PricingContext";
import { useNotifications } from "@/contexts/NotificationsContext";
import { useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar as CalendarIcon, Percent, ChevronRight, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

interface PromoDraft {
  label: string;
  percent: string;
  start?: Date;
  end?: Date;
}

const GestionarPrecios = () => {
  const navigate = useNavigate();
  const { events } = useEvents();
  const { pricing, setBasePrice, addPromotion, togglePromotion, deletePromotion, getBasePrice, getEffectivePrice } = usePricing();
  const { addNotification } = useNotifications();
  const { toast } = useToast();

  const [selectedService, setSelectedService] = useState<string>(events[0]?.id || "");
  const [baseInput, setBaseInput] = useState<string>(() => {
    const bp = selectedService ? getBasePrice(selectedService) : 0;
    return bp ? String(bp) : "";
  });
  const [promoDraft, setPromoDraft] = useState<PromoDraft>({ label: "", percent: "", start: undefined, end: undefined });
  const [showPromoForm, setShowPromoForm] = useState(false);

  const servicePricing = selectedService ? pricing[selectedService] : undefined;
  const effective = selectedService ? getEffectivePrice(selectedService) : undefined;

  const handleChangeService = (id: string) => {
    setSelectedService(id);
    const bp = getBasePrice(id) || 0;
    setBaseInput(String(bp));
  };

  const handleSaveBase = () => {
    if (!selectedService) return;
    const num = parseInt(baseInput, 10);
    if (isNaN(num) || num <= 0) {
      toast({ title: 'Valor inválido', description: 'Ingresa un número mayor a 0', variant: 'destructive' });
      return;
    }
    const old = getBasePrice(selectedService) || 0;
    setBasePrice(selectedService, num);
    addNotification({
      type: 'price-change',
      serviceId: selectedService,
      title: 'Precio base actualizado',
      message: `El precio base cambió de ${formatCurrency(old)} a ${formatCurrency(num)}`,
      oldPrice: old,
      newPrice: num
    });
    toast({ title: 'Precio actualizado', description: 'Los clientes verán el nuevo precio.' });
  };

  const handleAddPromotion = () => {
    if (!selectedService) return;
    const percent = parseInt(promoDraft.percent, 10);
    if (!promoDraft.label || isNaN(percent) || percent <= 0 || percent >= 100 || !promoDraft.start || !promoDraft.end) {
      toast({ title: 'Datos incompletos', description: 'Completa etiqueta, porcentaje (1-99) y rango de fechas.', variant: 'destructive' });
      return;
    }
    const promo = addPromotion(selectedService, {
      label: promoDraft.label,
      percent,
      start: format(promoDraft.start, 'yyyy-MM-dd'),
      end: format(promoDraft.end, 'yyyy-MM-dd'),
      active: true
    });
    addNotification({
      type: 'price-change',
      serviceId: selectedService,
      title: 'Nueva promoción',
      message: `${promo.label}: ${percent}% de descuento`,
      oldPrice: getBasePrice(selectedService),
      newPrice: getEffectivePrice(selectedService)?.price
    });
    toast({ title: 'Promoción agregada', description: 'Descuento aplicado para fechas dentro del rango.' });
    setPromoDraft({ label: "", percent: "", start: undefined, end: undefined });
    setShowPromoForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 py-10 space-y-8">
        <header className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Gestionar Precios</h1>
            <p className="text-elegant-gray mt-2">Administra precios base y promociones activas.</p>
          </div>
          <Button variant="outline" onClick={() => navigate(-1)}>Volver</Button>
        </header>

        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle>Selecciona Servicio</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Servicio</label>
                <Select value={selectedService} onValueChange={handleChangeService}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona" />
                  </SelectTrigger>
                  <SelectContent>
                    {events.map(ev => (
                      <SelectItem key={ev.id} value={ev.id}>{ev.title}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Precio Base (MXN)</label>
                <div className="flex gap-2">
                  <Input value={baseInput} onChange={(e) => setBaseInput(e.target.value.replace(/[^0-9]/g, ''))} placeholder="45000" />
                  <Button type="button" onClick={handleSaveBase}>Guardar</Button>
                </div>
                {effective && effective.price !== (getBasePrice(selectedService) || 0) && (
                  <p className="text-xs text-green-600">Precio efectivo actual: {formatCurrency(effective.price)}</p>
                )}
              </div>
            </div>
            {servicePricing && servicePricing.promotions.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-semibold text-sm">Promociones</h3>
                <div className="space-y-3">
                  {servicePricing.promotions.map(promo => {
                    const isActiveNow = promo.active && new Date() >= new Date(promo.start + 'T00:00:00') && new Date() <= new Date(promo.end + 'T23:59:59');
                    return (
                      <div key={promo.id} className="flex items-start justify-between p-3 rounded-lg border bg-white/70">
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center gap-2 font-medium">
                            <Percent className="w-4 h-4 text-purple-600" /> {promo.label}
                            {isActiveNow && <Badge className="bg-green-500">Activa</Badge>}
                            {!promo.active && <Badge variant="secondary" className="bg-gray-200 text-gray-700">Inactiva</Badge>}
                          </div>
                          <p className="text-elegant-gray text-xs">{promo.percent}% • {format(new Date(promo.start), 'dd MMM', { locale: es })} <ChevronRight className="inline w-3 h-3" /> {format(new Date(promo.end), 'dd MMM', { locale: es })}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => togglePromotion(selectedService, promo.id)}>{promo.active ? 'Desactivar' : 'Activar'}</Button>
                          <Button size="sm" variant="destructive" onClick={() => deletePromotion(selectedService, promo.id)}>Eliminar</Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {!showPromoForm && (
              <Button variant="outline" onClick={() => setShowPromoForm(true)}>Agregar Promoción</Button>
            )}

            {showPromoForm && (
              <div className="border rounded-lg p-4 space-y-4 bg-white/60">
                <h4 className="font-semibold text-sm flex items-center gap-2"><Percent className="w-4 h-4 text-purple-600" /> Nueva Promoción</h4>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-medium">Etiqueta</label>
                    <Input value={promoDraft.label} onChange={(e) => setPromoDraft(d => ({ ...d, label: e.target.value }))} placeholder="Promo Primavera" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium">% Descuento</label>
                    <Input value={promoDraft.percent} onChange={(e) => setPromoDraft(d => ({ ...d, percent: e.target.value.replace(/[^0-9]/g, '') }))} placeholder="15" />
                  </div>
                </div>
                <div className="flex flex-wrap gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-medium">Inicio</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="justify-start w-40">
                          <CalendarIcon className="w-4 h-4 mr-2" /> {promoDraft.start ? format(promoDraft.start, 'dd/MM/yyyy') : 'Seleccionar'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="p-2">
                        <Calendar mode="single" selected={promoDraft.start} onSelect={(d) => setPromoDraft(p => ({ ...p, start: d }))} locale={es} />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium">Fin</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="justify-start w-40">
                          <CalendarIcon className="w-4 h-4 mr-2" /> {promoDraft.end ? format(promoDraft.end, 'dd/MM/yyyy') : 'Seleccionar'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="p-2">
                        <Calendar mode="single" selected={promoDraft.end} onSelect={(d) => setPromoDraft(p => ({ ...p, end: d }))} locale={es} />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="flex items-end gap-2">
                    <Button type="button" onClick={handleAddPromotion}>Guardar</Button>
                    <Button type="button" variant="ghost" onClick={() => { setShowPromoForm(false); setPromoDraft({ label: "", percent: "", start: undefined, end: undefined }); }}>Cancelar</Button>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-elegant-gray">
                  <AlertCircle className="w-4 h-4" /> La promoción aplica el mayor descuento activo dentro del rango.
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default GestionarPrecios;
