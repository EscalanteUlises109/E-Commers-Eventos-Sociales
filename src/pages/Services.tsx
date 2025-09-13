import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Palette, Utensils, Music, Camera, MapPin, Mail, Truck, Users } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Services = () => {
  const allServices = [
    {
      title: "Decoración",
      description: "Ambientación personalizada con los más finos detalles",
      icon: Palette,
      color: "from-purple-400 to-pink-500",
      price: "Desde $2,500 MXN"
    },
    {
      title: "Catering", 
      description: "Menús gourmet adaptados a tus gustos y presupuesto",
      icon: Utensils,
      color: "from-orange-500 to-red-500", 
      price: "Desde $350 MXN/persona"
    },
    {
      title: "Entretenimiento",
      description: "Animación, música en vivo y espectáculos únicos",
      icon: Music,
      color: "from-blue-400 to-blue-600",
      price: "Desde $3,000 MXN"
    },
    {
      title: "Fotografía y Video",
      description: "Capturamos cada momento especial profesionalmente", 
      icon: Camera,
      color: "from-green-400 to-teal-500",
      price: "Desde $4,500 MXN"
    },
    {
      title: "Lugares y Sedes",
      description: "Espacios únicos y perfectos para tu celebración",
      icon: MapPin,
      color: "from-orange-400 to-yellow-500", 
      price: "Desde $8,000 MXN"
    },
    {
      title: "Invitaciones",
      description: "Diseños digitales y físicos que impresionan",
      icon: Mail,
      color: "from-pink-400 to-rose-500",
      price: "Desde $15 MXN/unidad"
    },
    {
      title: "Logística", 
      description: "Coordinación completa para que no te preocupes por nada",
      icon: Truck,
      color: "from-blue-500 to-purple-600",
      price: "Desde $2,000 MXN"
    },
    {
      title: "Gestión de Invitados",
      description: "Control de asistencia y comunicación personalizada", 
      icon: Users,
      color: "from-cyan-400 to-blue-500",
      price: "Desde $1,500 MXN"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 font-montserrat">
      <Navigation />
      
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-rose-200/30 to-pink-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-yellow-200/20 to-orange-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Nuestros
              <span className="bg-gradient-to-r from-rose-500 to-gold bg-clip-text text-transparent ml-2">
                Servicios
              </span>
            </h1>
            <p className="text-xl text-elegant-gray max-w-3xl mx-auto">
              Servicios integrales para hacer de tu evento una experiencia inolvidable
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {allServices.map((service, index) => (
              <Card key={index} className="group border-0 shadow-card hover:shadow-luxury transition-all duration-300 hover:scale-105 bg-white">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-rose-600 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-elegant-gray text-sm mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <p className="text-rose-500 font-bold text-sm">
                    {service.price}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Services;