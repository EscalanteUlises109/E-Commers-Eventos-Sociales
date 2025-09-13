import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Palette, 
  UtensilsCrossed, 
  Music, 
  Camera, 
  MapPin, 
  Mail, 
  Users, 
  Clipboard 
} from "lucide-react";

const Services = () => {
  const services = [
    {
      title: "Decoración",
      description: "Ambientación personalizada con los más finos detalles",
      icon: Palette,
      price: "Desde $2,500 MXN",
      color: "from-purple-400 to-pink-400"
    },
    {
      title: "Catering",
      description: "Menús gourmet adaptados a tus gustos y presupuesto",
      icon: UtensilsCrossed,
      price: "Desde $350 MXN/persona",
      color: "from-orange-400 to-red-400"
    },
    {
      title: "Entretenimiento",
      description: "Animación, música en vivo y espectáculos únicos",
      icon: Music,
      price: "Desde $3,000 MXN",
      color: "from-blue-400 to-indigo-400"
    },
    {
      title: "Fotografía y Video",
      description: "Capturamos cada momento especial profesionalmente",
      icon: Camera,
      price: "Desde $4,500 MXN",
      color: "from-green-400 to-teal-400"
    },
    {
      title: "Lugares y Sedes",
      description: "Espacios únicos y perfectos para tu celebración",
      icon: MapPin,
      price: "Desde $8,000 MXN",
      color: "from-yellow-400 to-orange-400"
    },
    {
      title: "Invitaciones",
      description: "Diseños digitales y físicos que impresionan",
      icon: Mail,
      price: "Desde $15 MXN/unidad",
      color: "from-pink-400 to-rose-400"
    },
    {
      title: "Logística",
      description: "Coordinación completa para que no te preocupes por nada",
      icon: Clipboard,
      price: "Desde $2,000 MXN",
      color: "from-indigo-400 to-purple-400"
    },
    {
      title: "Gestión de Invitados",
      description: "Control de asistencia y comunicación personalizada",
      icon: Users,
      price: "Desde $1,500 MXN",
      color: "from-teal-400 to-cyan-400"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Nuestros
            <span className="bg-gradient-to-r from-rose to-gold bg-clip-text text-transparent ml-2">
              Servicios
            </span>
          </h2>
          <p className="text-xl text-elegant-gray max-w-3xl mx-auto">
            Servicios integrales para hacer de tu evento una experiencia inolvidable
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-elegant transition-all duration-300 hover:scale-105 border-champagne bg-white/60 backdrop-blur-sm">
              <CardHeader className="text-center pb-2">
                <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-card`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-lg font-bold text-foreground group-hover:text-rose transition-colors duration-300">
                  {service.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="text-center space-y-3">
                <p className="text-sm text-elegant-gray leading-relaxed">
                  {service.description}
                </p>
                <div className="pt-2 border-t border-champagne">
                  <span className="text-lg font-semibold bg-gradient-to-r from-rose to-gold bg-clip-text text-transparent">
                    {service.price}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-elegant-gray mb-4">
            ¿Necesitas un paquete personalizado? ¡Hablemos!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="px-6 py-3 bg-gradient-to-r from-champagne to-gold-light rounded-full">
              <span className="text-deep-navy font-semibold">📞 WhatsApp: +52 55 1234-5678</span>
            </div>
            <div className="px-6 py-3 bg-gradient-to-r from-rose-light to-champagne rounded-full">
              <span className="text-deep-navy font-semibold">✉️ eventos@perfectos.com</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;