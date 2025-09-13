import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import Services from "@/components/Services";
import ServiceProviders from "@/components/ServiceProviders";
import QuoteForm from "@/components/QuoteForm";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
        {/* Hero Section Personalizado para Corporativos */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src={corporateEventImage} 
              alt="Eventos Corporativos" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 via-cyan-600/60 to-teal-600/80"></div>
          </div>
          
          <div className="relative z-10 text-center text-white px-4">
            <div className="mb-6">
              <Briefcase className="w-16 h-16 mx-auto mb-4 text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Eventos
              <span className="block bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent">
                Corporativos
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Conferencias, reuniones y lanzamientos que proyecten profesionalismo y generen impacto en tu industria
            </p>
            <Button className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-xl">
              Planear Mi Evento Corporativo
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>

        {/* Componentes existentes adaptados */}
        <div className="bg-gradient-to-b from-blue-50/50 to-cyan-50/50">
          <ServiceProviders />
        </div>
        <QuoteForm />
      </main>
      <Footer />
    </div>
  );
};

export default EventosCorporativos;