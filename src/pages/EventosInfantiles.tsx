import Navigation from "@/components/Navigation";
import EventSelection from "@/components/EventSelection";
import Services from "@/components/Services";
import ServiceProviders from "@/components/ServiceProviders";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Baby, ArrowRight, Palette, Music, Camera, Gift } from "lucide-react";
import kidsEventImage from "@/assets/kids-event.jpg";

const EventosInfantiles = () => {
  const infantileServices = [
    {
      title: "Animación Profesional",
      description: "Shows interactivos con magos, payasos y personajes favoritos",
      icon: Music,
      color: "from-blue-400 to-purple-500"
    },
    {
      title: "Decoración Temática",
      description: "Ambientación personalizada con los temas favoritos de los niños",
      icon: Palette,
      color: "from-purple-400 to-pink-500"
    },
    {
      title: "Fotografía Infantil",
      description: "Captura cada momento especial con estilo artístico",
      icon: Camera,
      color: "from-pink-400 to-rose-500"
    },
    {
      title: "Sorpresas y Regalos",
      description: "Detalles especiales que harán sonreír a todos los niños",
      icon: Gift,
      color: "from-rose-400 to-orange-500"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        {/* Primero las opciones de tipos de eventos */}
        <EventSelection />
        
        {/* Después los planes específicos de eventos infantiles */}
        <section className="py-20 bg-gradient-to-b from-blue-50/50 to-purple-50/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Planes para Eventos Infantiles
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Selecciona el plan perfecto para hacer de la celebración un momento inolvidable
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {infantileServices.map((service, index) => (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/90 backdrop-blur-sm hover:-translate-y-2">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                    <Button className={`bg-gradient-to-r ${service.color} text-white font-semibold px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300`}>
                      Ver Detalles
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Proveedores especializados */}
        <div className="bg-gradient-to-b from-purple-50/50 to-blue-50/50">
          <ServiceProviders eventType="infantiles" />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EventosInfantiles;