import Navigation from "@/components/Navigation";
import EventSelection from "@/components/EventSelection";
import Services from "@/components/Services";
import ServiceProviders from "@/components/ServiceProviders";
import QuoteForm from "@/components/QuoteForm";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ArrowRight, Crown, Camera, Music, Utensils } from "lucide-react";
import weddingEventImage from "@/assets/wedding-event.jpg";

const EventosFormales = () => {
  const formalServices = [
    {
      title: "Ceremonias Elegantes",
      description: "Organización completa de bodas y ceremonias especiales",
      icon: Crown,
      color: "from-rose-400 to-pink-500"
    },
    {
      title: "Fotografía Profesional",
      description: "Captura artística de tus momentos más importantes",
      icon: Camera,
      color: "from-pink-400 to-rose-500"
    },
    {
      title: "Música y Entretenimiento",
      description: "Bandas y DJ especializados en eventos elegantes",
      icon: Music,
      color: "from-rose-500 to-red-500"
    },
    {
      title: "Catering Gourmet",
      description: "Menús exquisitos y servicio de alta cocina",
      icon: Utensils,
      color: "from-red-400 to-rose-400"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        {/* Primero las opciones de tipos de eventos */}
        <EventSelection />
        
        {/* Después los planes específicos de eventos formales */}
        <section className="py-20 bg-gradient-to-b from-rose-50/50 to-pink-50/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Planes para Eventos Formales
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Elegancia y distinción en cada detalle de tu celebración especial
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {formalServices.map((service, index) => (
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
        <div className="bg-gradient-to-b from-pink-50/50 to-rose-50/50">
          <ServiceProviders eventType="formales" />
        </div>
        <QuoteForm />
      </main>
      <Footer />
    </div>
  );
};

export default EventosFormales;