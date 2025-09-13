import Navigation from "@/components/Navigation";
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
        {/* Hero Section Personalizado para Infantiles */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src={kidsEventImage} 
              alt="Eventos Infantiles" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 via-purple-600/60 to-pink-600/80"></div>
          </div>
          
          <div className="relative z-10 text-center text-white px-4">
            <div className="mb-6">
              <Baby className="w-16 h-16 mx-auto mb-4 text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Eventos
              <span className="block bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                Infantiles
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Creamos celebraciones mágicas llenas de diversión, color y alegría para hacer felices a los más pequeños
            </p>
            <Button className="bg-gradient-to-r from-yellow-400 to-pink-500 hover:from-yellow-500 hover:to-pink-600 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-xl">
              Planear Mi Evento Infantil
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>

        {/* Servicios Especializados */}
        <section className="py-20 bg-gradient-to-b from-blue-50/50 to-purple-50/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Servicios Especializados
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Todo lo que necesitas para hacer de la celebración un momento inolvidable
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {infantileServices.map((service, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-gray-600 text-sm">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Componentes existentes adaptados */}
        <div className="bg-gradient-to-b from-blue-50/50 to-purple-50/50">
          <ServiceProviders eventType="infantiles" />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EventosInfantiles;