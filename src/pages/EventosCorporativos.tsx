import Navigation from "@/components/Navigation";
import EventSelection from "@/components/EventSelection";
import Services from "@/components/Services";
import ServiceProviders from "@/components/ServiceProviders";
import QuoteForm from "@/components/QuoteForm";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, ArrowRight, Monitor, Users, Presentation, Network } from "lucide-react";
import corporateEventImage from "@/assets/corporate-event.jpg";

const EventosCorporativos = () => {
  const corporateServices = [
    {
      title: "Tecnología AV",
      description: "Equipos de audio, video y proyección de última generación",
      icon: Monitor,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Conferencias y Seminarios",
      description: "Organización completa de eventos educativos y profesionales",
      icon: Presentation,
      color: "from-cyan-500 to-teal-500"
    },
    {
      title: "Networking Events",
      description: "Espacios diseñados para generar conexiones de negocio",
      icon: Network,
      color: "from-teal-500 to-green-500"
    },
    {
      title: "Team Building",
      description: "Actividades para fortalecer equipos y cultura empresarial",
      icon: Users,
      color: "from-green-500 to-blue-500"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        {/* Primero las opciones de tipos de eventos */}
        <EventSelection />
        
        {/* Después los planes específicos de eventos corporativos */}
        <section className="py-20 bg-gradient-to-b from-blue-50/50 to-cyan-50/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Planes para Eventos Corporativos
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Soluciones profesionales que proyecten excelencia y generen resultados
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {corporateServices.map((service, index) => (
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
        <div className="bg-gradient-to-b from-cyan-50/50 to-blue-50/50">
          <ServiceProviders eventType="corporativos" />
        </div>
        <QuoteForm />
      </main>
      <Footer />
    </div>
  );
};

export default EventosCorporativos;