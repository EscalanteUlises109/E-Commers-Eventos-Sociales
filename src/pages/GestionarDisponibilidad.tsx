import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEvents } from "@/contexts/EventsContext";
import { useAvailability } from "@/contexts/AvailabilityContext";
import { useState, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { CalendarIcon, Lock, Unlock, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const GestionarDisponibilidad = () => {
  const navigate = useNavigate();
  const { events } = useEvents();
  const { getServiceDays, toggleBlockDate, setCapacity, getDateInfo } = useAvailability();
  const { toast } = useToast();

  const [selectedServiceId, setSelectedServiceId] = useState<string>(events[0]?.id || "");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [capacityInput, setCapacityInput] = useState<string>("");

  const serviceDays = useMemo(() => selectedServiceId ? getServiceDays(selectedServiceId) : [], [selectedServiceId, getServiceDays]);

  const handleToggleBlock = () => {
    if (!selectedServiceId || !selectedDate) return;
    toggleBlockDate(selectedServiceId, selectedDate);
  };

  const handleSetCapacity = () => {
    if (!selectedServiceId || !selectedDate) return;
    const cap = parseInt(capacityInput, 10);
    if (isNaN(cap) || cap <= 0) {
      toast({ title: 'Capacidad inválida', description: 'Ingresa un número mayor a 0', variant: 'destructive' });
      return;
    }
    setCapacity(selectedServiceId, selectedDate, cap);
    toast({ title: 'Capacidad establecida', description: `Capacidad ${cap} para ${format(selectedDate, 'PPP', { locale: es })}` });
  };

  const selectedDayInfo = selectedDate && selectedServiceId ? getDateInfo(selectedServiceId, selectedDate) : undefined;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Navigation />
      <main className="max-w-6xl mx-auto px-4 py-10 space-y-8">
        <header>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2"><CalendarIcon className="w-7 h-7 text-purple-600" /> Calendario de Disponibilidad</h1>
          <p className="text-elegant-gray mt-2">Administra días disponibles, capacidad y bloquea fechas no operables.</p>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 border-0 shadow-card">
            <CardHeader>
              <CardTitle>Selecciona fechas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium">Servicio</label>
                  <Select value={selectedServiceId} onValueChange={setSelectedServiceId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un servicio" />
                    </SelectTrigger>
                    <SelectContent>
                      {events.map(ev => (
                        <SelectItem key={ev.id} value={ev.id}>{ev.title}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Fecha seleccionada</label>
                  <div className="h-10 px-3 flex items-center rounded-md border bg-white text-sm">
                    {selectedDate ? format(selectedDate, 'PPP', { locale: es }) : '—'}
                  </div>
                </div>
              </div>

              <div className="rounded-lg border bg-white p-4">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  locale={es}
                  className="mx-auto"
                  modifiers={{
                    blocked: (date) => !!serviceDays.find(d => d.date === format(date, 'yyyy-MM-dd') && d.status === 'blocked'),
                    booked: (date) => !!serviceDays.find(d => d.date === format(date, 'yyyy-MM-dd') && d.status === 'booked')
                  }}
                  modifiersClassNames={{
                    blocked: 'bg-red-200 text-red-800 hover:bg-red-300',
                    booked: 'bg-yellow-200 text-yellow-800 hover:bg-yellow-300'
                  }}
                />
                <div className="flex gap-4 justify-center mt-4 text-xs">
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-red-200 border"/> Bloqueada</span>
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-yellow-200 border"/> Completa</span>
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-white border"/> Disponible</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 items-end">
                <Button type="button" variant="outline" disabled={!selectedDate || !selectedServiceId} onClick={handleToggleBlock} className={cn(selectedDayInfo?.status === 'blocked' && 'border-red-500 text-red-600')}> 
                  {selectedDayInfo?.status === 'blocked' ? <Unlock className="w-4 h-4 mr-2" /> : <Lock className="w-4 h-4 mr-2" />} 
                  {selectedDayInfo?.status === 'blocked' ? 'Desbloquear día' : 'Bloquear día'}
                </Button>
                <div className="space-y-1">
                  <label className="text-xs font-medium">Capacidad del día</label>
                  <div className="flex gap-2">
                    <Input placeholder="Ej: 3" className="w-24" value={capacityInput} onChange={(e) => setCapacityInput(e.target.value)} />
                    <Button type="button" onClick={handleSetCapacity} disabled={!selectedDate || !selectedServiceId}>Guardar</Button>
                  </div>
                  {selectedDayInfo && (
                    <p className="text-xs text-elegant-gray flex items-center gap-1"><Users className="w-3 h-3" /> {selectedDayInfo.used || 0}/{selectedDayInfo.capacity || '—'} reservas</p>
                  )}
                </div>
                <Button type="button" variant="outline" onClick={() => navigate(-1)}>Volver</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle>Días configurados</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              {serviceDays.length === 0 && <p className="text-sm text-elegant-gray">Aún no has configurado fechas.</p>}
              {serviceDays
                .slice()
                .sort((a,b) => a.date.localeCompare(b.date))
                .map(day => {
                  const d = parseISO(day.date);
                  return (
                    <div key={day.date} className="flex items-center justify-between p-3 rounded-lg border bg-white/70">
                      <div>
                        <p className="text-sm font-medium">{format(d, 'PPP', { locale: es })}</p>
                        <p className="text-xs text-elegant-gray">Capacidad: {day.capacity || '—'} • Usadas: {day.used || 0}</p>
                      </div>
                      <Badge className={cn('text-xs', day.status === 'blocked' && 'bg-red-500', day.status === 'booked' && 'bg-yellow-500 text-black', day.status === 'available' && 'bg-green-500')}>{day.status}</Badge>
                    </div>
                  );
                })}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default GestionarDisponibilidad;
