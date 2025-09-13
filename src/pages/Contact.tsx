import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Campos requeridos",
        description: "Por favor completa todos los campos obligatorios.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "¡Mensaje enviado!",
      description: "Te contactaremos pronto. ¡Gracias por tu interés!",
    });

    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const contactInfo = [
    {
      title: "Teléfono",
      info: "+52 55 1234-5678",
      description: "Lunes a Viernes: 9:00 AM - 7:00 PM",
      icon: Phone,
      color: "from-green-400 to-emerald-400"
    },
    {
      title: "WhatsApp",
      info: "+52 55 9876-5432",
      description: "Disponible 24/7 para emergencias",
      icon: MessageCircle,
      color: "from-green-500 to-green-600"
    },
    {
      title: "Email",
      info: "eventos@perfectos.com",
      description: "Respuesta en menos de 24 horas",
      icon: Mail,
      color: "from-blue-400 to-blue-500"
    },
    {
      title: "Oficina",
      info: "Av. Reforma 123, CDMX",
      description: "Cita previa requerida",
      icon: MapPin,
      color: "from-purple-400 to-purple-500"
    }
  ];

  const workingHours = [
    { day: "Lunes - Viernes", hours: "9:00 AM - 7:00 PM" },
    { day: "Sábados", hours: "10:00 AM - 6:00 PM" },
    { day: "Domingos", hours: "Cerrado (Emergencias por WhatsApp)" }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-b from-champagne/20 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              ¡Hablemos de tu
              <span className="bg-gradient-to-r from-rose to-gold bg-clip-text text-transparent ml-2">
                Evento Perfecto!
              </span>
            </h1>
            <p className="text-xl text-elegant-gray max-w-3xl mx-auto leading-relaxed">
              Estamos aquí para convertir tu visión en realidad. Contáctanos y 
              comencemos a planear algo extraordinario juntos.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((contact, index) => (
              <Card key={index} className="text-center border-0 shadow-card hover:shadow-elegant transition-all duration-300 hover:scale-105 bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <div className={`w-16 h-16 bg-gradient-to-br ${contact.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <contact.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-lg font-bold text-foreground">
                    {contact.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="font-semibold text-foreground">
                    {contact.info}
                  </p>
                  <p className="text-sm text-elegant-gray">
                    {contact.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form and Hours */}
      <section className="py-16 bg-gradient-to-b from-background to-champagne/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="border-0 shadow-luxury bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-foreground">
                  Envíanos un Mensaje
                </CardTitle>
                <p className="text-elegant-gray">
                  ¿Tienes una pregunta específica? ¡Escríbenos!
                </p>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-foreground font-medium">
                        Nombre Completo *
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="border-champagne focus:border-rose transition-colors duration-300"
                        placeholder="Tu nombre"
                        required
                      />
                    </div>

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

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-foreground font-medium">
                      Mensaje *
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="border-champagne focus:border-rose transition-colors duration-300 min-h-32"
                      placeholder="Cuéntanos sobre tu evento o pregunta..."
                      required
                    />
                  </div>

                  <Button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-rose to-gold hover:from-rose/90 hover:to-gold/90 text-white font-semibold py-3 rounded-full shadow-elegant transition-all duration-300"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Enviar Mensaje
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Hours and Additional Info */}
            <div className="space-y-8">
              {/* Working Hours */}
              <Card className="border-0 shadow-card bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-foreground flex items-center">
                    <Clock className="w-6 h-6 mr-2 text-rose" />
                    Horarios de Atención
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {workingHours.map((schedule, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-champagne last:border-b-0">
                        <span className="font-medium text-foreground">
                          {schedule.day}
                        </span>
                        <span className="text-elegant-gray">
                          {schedule.hours}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Response */}
              <Card className="border-0 shadow-card bg-gradient-to-br from-rose/10 to-gold/10">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-foreground">
                    🚀 Respuesta Rápida
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-elegant-gray mb-4">
                    ¿Necesitas una respuesta inmediata? ¡Úsanos por WhatsApp!
                  </p>
                  <Button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-full">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    WhatsApp: +52 55 9876-5432
                  </Button>
                </CardContent>
              </Card>

              {/* Location */}
              <Card className="border-0 shadow-card bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-foreground flex items-center">
                    <MapPin className="w-6 h-6 mr-2 text-rose" />
                    Nuestra Oficina
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="font-semibold text-foreground">
                      EventosPerfectos
                    </p>
                    <p className="text-elegant-gray">
                      Av. Reforma 123, Piso 5<br />
                      Col. Juárez, CDMX 06600<br />
                      Ciudad de México
                    </p>
                    <p className="text-sm text-elegant-gray mt-4">
                      * Cita previa requerida para visitas a oficina
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;