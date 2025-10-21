import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { useEvents } from "@/contexts/EventsContext";
import { useReviews } from "@/contexts/ReviewsContext";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Star, Filter, Calendar as CalendarIcon, Reply, MessageSquare } from "lucide-react";

interface ResponseDraft {
  [reviewId: string]: string;
}

const ratingColors: Record<number, string> = {
  1: 'bg-red-100 text-red-700',
  2: 'bg-orange-100 text-orange-700',
  3: 'bg-yellow-100 text-yellow-700',
  4: 'bg-green-100 text-green-700',
  5: 'bg-emerald-100 text-emerald-700'
};

const VerResenas = () => {
  const navigate = useNavigate();
  const { events } = useEvents();
  const { reviews, respondReview, filterReviews, getServiceStats } = useReviews();

  const [serviceFilter, setServiceFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [minRating, setMinRating] = useState<string>('');
  const [dateFrom, setDateFrom] = useState<Date | undefined>();
  const [dateTo, setDateTo] = useState<Date | undefined>();
  const [responseDraft, setResponseDraft] = useState<ResponseDraft>({});
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return filterReviews({
      serviceId: serviceFilter === 'all' ? undefined : serviceFilter,
      status: statusFilter === 'all' ? undefined : (statusFilter as 'pending' | 'responded'),
      from: dateFrom,
      to: dateTo,
      minRating: minRating ? parseInt(minRating, 10) : undefined,
    });
  }, [reviews, serviceFilter, statusFilter, minRating, dateFrom, dateTo]);

  const serviceStats = useMemo(() => {
    if (serviceFilter !== 'all') return getServiceStats(serviceFilter);
    // aggregate all
    const perService = events.map(ev => getServiceStats(ev.id));
    const totalCount = perService.reduce((a,b) => a + b.count, 0);
    if (totalCount === 0) return { average: 0, count: 0, distribution: {1:0,2:0,3:0,4:0,5:0} };
    const distribution: Record<number, number> = {1:0,2:0,3:0,4:0,5:0};
    let weighted = 0;
    perService.forEach(st => {
      weighted += st.average * st.count;
      (Object.keys(st.distribution) as unknown as number[]).forEach(r => {
        distribution[r] += st.distribution[r];
      });
    });
    return { average: +(weighted / totalCount).toFixed(2), count: totalCount, distribution };
  }, [serviceFilter, events, reviews]);

  const handleSendResponse = (id: string) => {
    const text = responseDraft[id];
    if (!text || !text.trim()) return;
    respondReview(id, 'provider', text.trim());
    setResponseDraft(prev => ({ ...prev, [id]: '' }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 py-10 space-y-8">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Reseñas de Clientes</h1>
            <p className="text-elegant-gray mt-2">Consulta, filtra y responde las opiniones de tus servicios.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowFilters(s => !s)} className="flex items-center gap-2">
              <Filter className="w-4 h-4" /> {showFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}
            </Button>
            <Button variant="outline" onClick={() => navigate(-1)}>Volver</Button>
          </div>
        </header>

        {showFilters && (
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle className="text-lg">Filtros</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-5 gap-4">
              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-medium">Servicio</label>
                <Select value={serviceFilter} onValueChange={v => setServiceFilter(v)}>
                  <SelectTrigger><SelectValue placeholder="Todos" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    {events.map(ev => <SelectItem key={ev.id} value={ev.id}>{ev.title}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium">Estado</label>
                <Select value={statusFilter} onValueChange={v => setStatusFilter(v)}>
                  <SelectTrigger><SelectValue placeholder="Todos" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="pending">Pendiente</SelectItem>
                    <SelectItem value="responded">Respondida</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium">Rating mínimo</label>
                <Input value={minRating} onChange={e => setMinRating(e.target.value.replace(/[^0-9]/g,''))} placeholder="1-5" />
              </div>
              <div className="flex gap-2 flex-wrap md:col-span-5">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4" /> {dateFrom ? format(dateFrom, 'dd/MM/yyyy') : 'Desde'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-2">
                    <Calendar mode="single" selected={dateFrom} onSelect={d => setDateFrom(d)} locale={es} />
                  </PopoverContent>
                </Popover>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4" /> {dateTo ? format(dateTo, 'dd/MM/yyyy') : 'Hasta'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-2">
                    <Calendar mode="single" selected={dateTo} onSelect={d => setDateTo(d)} locale={es} />
                  </PopoverContent>
                </Popover>
                <Button variant="ghost" onClick={() => { setServiceFilter('all'); setStatusFilter('all'); setMinRating(''); setDateFrom(undefined); setDateTo(undefined); }}>Reiniciar</Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2 space-y-4">
            {filtered.length === 0 && (
              <Card className="border-0 shadow-card">
                <CardContent className="p-8 text-center text-sm text-elegant-gray">
                  No hay reseñas que coincidan con los filtros.
                </CardContent>
              </Card>
            )}
            {filtered.map(r => {
              const ratingClass = ratingColors[r.rating];
              return (
                <Card key={r.id} className="border border-border/60 bg-white/80 backdrop-blur shadow-sm">
                  <CardContent className="p-5 space-y-4">
                    <div className="flex justify-between items-start gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${ratingClass} flex items-center gap-1`}>
                            <Star className="w-3 h-3" /> {r.rating}
                          </span>
                          <span className="text-sm font-medium text-foreground">{r.userName}</span>
                          <span className="text-xs text-elegant-gray">{format(new Date(r.createdAt), 'dd MMM yyyy', { locale: es })}</span>
                        </div>
                        <p className="text-sm text-foreground leading-relaxed">{r.comment}</p>
                        {r.response && (
                          <div className="mt-3 pl-4 border-l-2 border-purple-300 space-y-1">
                            <div className="flex items-center gap-2 text-xs text-purple-600">
                              <Reply className="w-3 h-3" /> Respuesta ({format(new Date(r.response.respondedAt), 'dd MMM HH:mm', { locale: es })})
                            </div>
                            <p className="text-sm text-foreground">{r.response.text}</p>
                          </div>
                        )}
                      </div>
                      <div className="text-right space-y-2">
                        <Badge variant={r.status === 'responded' ? 'default' : 'secondary'} className={r.status === 'responded' ? 'bg-green-600 hover:bg-green-600' : ''}>
                          {r.status === 'responded' ? 'Respondida' : 'Pendiente'}
                        </Badge>
                      </div>
                    </div>
                    {r.status === 'pending' && (
                      <div className="space-y-2">
                        <Textarea placeholder="Escribe una respuesta para el cliente" value={responseDraft[r.id] || ''} onChange={e => setResponseDraft(prev => ({ ...prev, [r.id]: e.target.value }))} rows={2} />
                        <div className="flex justify-end">
                          <Button size="sm" onClick={() => handleSendResponse(r.id)} className="flex items-center gap-2">
                            <MessageSquare className="w-4 h-4" /> Responder
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
          <div className="space-y-4">
            <Card className="border-0 shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Resumen</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="flex items-end gap-3">
                  <div className="text-4xl font-bold text-foreground">{serviceStats.average}</div>
                  <div className="flex flex-col text-xs text-elegant-gray">
                    <span>Promedio</span>
                    <span>{serviceStats.count} reseñas</span>
                  </div>
                </div>
                <div className="space-y-2">
                  {[5,4,3,2,1].map(r => {
                    const total = serviceStats.count || 1;
                    const value = serviceStats.distribution[r] || 0;
                    const pct = Math.round((value / total) * 100);
                    return (
                      <div key={r} className="flex items-center gap-2">
                        <span className="w-4 text-xs font-medium">{r}</span>
                        <div className="flex-1 h-2 bg-gray-200 rounded overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-purple-400 to-blue-500" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="w-10 text-right text-xs tabular-nums">{value}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Consejos</CardTitle>
              </CardHeader>
              <CardContent className="text-xs space-y-3 text-elegant-gray">
                <p>Responder rápidamente a reseñas mejora la confianza del cliente.</p>
                <p>Mantén un tono cordial y ofrece soluciones cuando la reseña contenga feedback crítico.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VerResenas;
