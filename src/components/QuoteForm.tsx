import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { CalendarDays, Users, DollarSign, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const QuoteForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    eventDate: "",
    guestCount: "",
    budget: "",
    services: [] as string[],
    message: ""
  });

  const eventTypes = [
    "Boda",
    "XV Años",
    "Bautizo/Comunión",
    "Cumpleaños Infantil",
    "Cumpleaños Adulto",
    "Evento Corporativo",
    "Conferencia",
    "Graduación",
    "Aniversario",
    "Otro"
  ];

  const availableServices = [
    "Decoración",
    "Catering",
    "Entretenimiento/Música",
    "Fotografía y Video",
    "Lugar/Sede",
    "Invitaciones",
    "Logística",
    "Gestión de Invitados"
  ];

  const handleServiceChange = (service: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      services: checked 
        ? [...prev.services, service]
        : prev.services.filter(s => s !== service)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.eventType) {
      toast({
        title: "Campos requeridos",
        description: "Por favor completa todos los campos obligatorios.",
        variant: "destructive"
      });
      return;
    }

    // Simulate form submission
    toast({
      title: "¡Cotización enviada!",
      description: "Te contactaremos en las próximas 24 horas con tu cotización personalizada.",
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      eventType: "",
      eventDate: "",
      guestCount: "",
      budget: "",
      services: [],
      message: ""
    });
  };

  return (
    <section className="py-20 bg-gradient-to-b from-champagne/20 to-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Solicita tu
            <span className="bg-gradient-to-r from-rose to-gold bg-clip-text text-transparent ml-2">
              Cotización
            </span>
          </h2>
          <p className="text-xl text-elegant-gray max-w-2xl mx-auto">
            Cuéntanos sobre tu evento y te enviaremos una propuesta personalizada
          </p>
        </div>

        <Card className="border-0 shadow-luxury bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-foreground">
              Información del Evento
            </CardTitle>
            <CardDescription className="text-elegant-gray">
              Completa el formulario y te contactaremos en menos de 24 horas
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground font-medium">
                    Nombre Completo *
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="border-champagne focus:border-rose transition-colors duration-300"
                    placeholder="Tu nombre completo"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground font-medium">
                    Correo Electrónico *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="border-champagne focus:border-rose transition-colors duration-300"
                    placeholder="tu@email.com"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-foreground font-medium">
                    Teléfono
                  </Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="border-champagne focus:border-rose transition-colors duration-300"
                    placeholder="+52 55 1234-5678"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="eventType" className="text-foreground font-medium">
                    Tipo de Evento *
                  </Label>
                  <Select value={formData.eventType} onValueChange={(value) => setFormData({...formData, eventType: value})}>
                    <SelectTrigger className="border-champagne focus:border-rose transition-colors duration-300">
                      <SelectValue placeholder="Selecciona el tipo de evento" />
                    </SelectTrigger>
                    <SelectContent>
                      {eventTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Event Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="eventDate" className="text-foreground font-medium flex items-center">
                    <CalendarDays className="w-4 h-4 mr-2 text-rose" />
                    Fecha del Evento
                  </Label>
                  <Input
                    id="eventDate"
                    type="date"
                    value={formData.eventDate}
                    onChange={(e) => setFormData({...formData, eventDate: e.target.value})}
                    className="border-champagne focus:border-rose transition-colors duration-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="guestCount" className="text-foreground font-medium flex items-center">
                    <Users className="w-4 h-4 mr-2 text-rose" />
                    Número de Invitados
                  </Label>
                  <Input
                    id="guestCount"
                    value={formData.guestCount}
                    onChange={(e) => setFormData({...formData, guestCount: e.target.value})}
                    className="border-champagne focus:border-rose transition-colors duration-300"
                    placeholder="ej. 50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget" className="text-foreground font-medium flex items-center">
                    <DollarSign className="w-4 h-4 mr-2 text-rose" />
                    Presupuesto Estimado
                  </Label>
                  <Select value={formData.budget} onValueChange={(value) => setFormData({...formData, budget: value})}>
                    <SelectTrigger className="border-champagne focus:border-rose transition-colors duration-300">
                      <SelectValue placeholder="Selecciona rango" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10000-25000">$10,000 - $25,000 MXN</SelectItem>
                      <SelectItem value="25000-50000">$25,000 - $50,000 MXN</SelectItem>
                      <SelectItem value="50000-100000">$50,000 - $100,000 MXN</SelectItem>
                      <SelectItem value="100000+">$100,000+ MXN</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Services */}
              <div className="space-y-4">
                <Label className="text-foreground font-medium text-lg">
                  Servicios Requeridos
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {availableServices.map((service) => (
                    <div key={service} className="flex items-center space-x-2">
                      <Checkbox
                        id={service}
                        checked={formData.services.includes(service)}
                        onCheckedChange={(checked) => handleServiceChange(service, !!checked)}
                        className="border-champagne data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-rose data-[state=checked]:to-gold"
                      />
                      <Label htmlFor={service} className="text-foreground text-sm">
                        {service}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message" className="text-foreground font-medium">
                  Detalles Adicionales
                </Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="border-champagne focus:border-rose transition-colors duration-300 min-h-24"
                  placeholder="Cuéntanos más sobre tu visión del evento, preferencias especiales, o cualquier detalle importante..."
                />
              </div>

              {/* Submit Button */}
              <Button 
                type="submit"
                className="w-full bg-gradient-to-r from-rose to-gold hover:from-rose/90 hover:to-gold/90 text-white font-semibold py-4 rounded-full shadow-elegant transition-all duration-300 hover:shadow-luxury hover:scale-105"
                size="lg"
              >
                <Send className="w-5 h-5 mr-2" />
                Enviar Solicitud de Cotización
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default QuoteForm;