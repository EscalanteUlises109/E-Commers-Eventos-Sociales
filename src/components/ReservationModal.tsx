import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, MapPin, Clock, Star, Phone, Mail, User, MessageSquare } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

import { useFavorites, Service } from "@/contexts/FavoritesContext";
import { useAvailability } from "@/contexts/AvailabilityContext";

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: Service | null;
}

const ReservationModal = ({ isOpen, onClose, service }: ReservationModalProps) => {
  const { toast } = useToast();
  const { addBooking, isDateUnavailable, getDateInfo } = useAvailability();
  const [date, setDate] = useState<Date>();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    guestCount: "",
    venue: "",
    budget: "",
    message: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!service || !date || !formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Campos requeridos",
        description: "Por favor completa todos los campos obligatorios.",
        variant: "destructive",
      });
      return;
    }

    // Registrar booking en disponibilidad
    addBooking(service.id, date);
    toast({
      title: "¡Reserva enviada!",
      description: `Tu solicitud para ${service.title} ha sido enviada. Te contactaremos pronto.`,
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      eventType: "",
      guestCount: "",
      venue: "",
      budget: "",
      message: ""
    });
    setDate(undefined);
    onClose();
  };

  if (!service) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground flex items-center gap-2">
            Reservar Servicio
            {service.featured && (
              <Badge className="bg-gradient-to-r from-rose to-gold text-white border-0">
                Destacado
              </Badge>
            )}
          </DialogTitle>
          <DialogDescription>
            Completa el formulario para solicitar una cotización personalizada
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Service Information */}
          <div className="space-y-4">
            <div className="relative h-48 rounded-lg overflow-hidden">
              <img 
                src={service.image} 
                alt={service.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <Badge className="absolute top-3 left-3 bg-white/90 text-foreground">
                {service.category}
              </Badge>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-bold text-foreground">{service.title}</h3>
              <p className="text-elegant-gray">{service.description}</p>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2 text-elegant-gray">
                  <MapPin className="w-4 h-4" />
                  {service.location}
                </div>
                <div className="flex items-center gap-2 text-elegant-gray">
                  <Clock className="w-4 h-4" />
                  {service.duration}
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{service.rating}</span>
                  <span className="text-elegant-gray text-xs">reseñas</span>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-foreground">{service.price}</div>
                  <div className="text-xs text-elegant-gray">Precio base</div>
                </div>
              </div>
            </div>
          </div>

          {/* Reservation Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Nombre completo *
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Tu nombre completo"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="tu@email.com"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Teléfono *
                </Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="+52 55 1234 5678"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Fecha del evento *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP", { locale: es }) : "Selecciona una fecha"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      locale={es}
                      disabled={(d) => isDateUnavailable(service.id, d)}
                      modifiers={{
                        booked: (d) => getDateInfo(service.id, d)?.status === 'booked'
                      }}
                      modifiersClassNames={{
                        booked: 'bg-yellow-200 text-yellow-900 hover:bg-yellow-300'
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="eventType">Tipo de evento</Label>
                <Select onValueChange={(value) => handleInputChange("eventType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cumpleanos">Cumpleaños</SelectItem>
                    <SelectItem value="boda">Boda</SelectItem>
                    <SelectItem value="xv-anos">XV Años</SelectItem>
                    <SelectItem value="bautizo">Bautizo</SelectItem>
                    <SelectItem value="corporativo">Corporativo</SelectItem>
                    <SelectItem value="conferencia">Conferencia</SelectItem>
                    <SelectItem value="otro">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="guestCount">Número de invitados</Label>
                <Input
                  id="guestCount"
                  type="number"
                  value={formData.guestCount}
                  onChange={(e) => handleInputChange("guestCount", e.target.value)}
                  placeholder="Ej: 50"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="venue">Lugar del evento</Label>
                <Input
                  id="venue"
                  value={formData.venue}
                  onChange={(e) => handleInputChange("venue", e.target.value)}
                  placeholder="Dirección o nombre del lugar"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget">Presupuesto aproximado</Label>
                <Select onValueChange={(value) => handleInputChange("budget", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona rango" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10000-25000">$10,000 - $25,000</SelectItem>
                    <SelectItem value="25000-50000">$25,000 - $50,000</SelectItem>
                    <SelectItem value="50000-100000">$50,000 - $100,000</SelectItem>
                    <SelectItem value="100000+">$100,000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Mensaje adicional
              </Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                placeholder="Cuéntanos más detalles sobre tu evento..."
                rows={3}
              />
            </div>

            <DialogFooter className="gap-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose}
              >
                Cancelar
              </Button>
              <Button 
                type="submit"
                className="bg-gradient-to-r from-rose to-gold hover:from-rose/90 hover:to-gold/90 text-white"
              >
                Enviar Solicitud
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReservationModal;