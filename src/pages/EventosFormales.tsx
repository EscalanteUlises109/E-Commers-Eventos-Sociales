import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import Services from "@/components/Services";
import ServiceProviders from "@/components/ServiceProviders";
import QuoteForm from "@/components/QuoteForm";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
        {/* Hero Section Personalizado para Formales */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src={weddingEventImage} 
              alt="Eventos Formales" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-rose-600/80 via-pink-600/60 to-purple-600/80"></div>
          </div>
          
          <div className="relative z-10 text-center text-white px-4">
            <div className="mb-6">
              <Heart className="w-16 h-16 mx-auto mb-4 text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Eventos
              <span className="block bg-gradient-to-r from-rose-300 to-gold bg-clip-text text-transparent">
                Formales
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Bodas, XV años y celebraciones elegantes que marquen momentos especiales con distinción y estilo
            </p>
            <Button className="bg-gradient-to-r from-rose to-gold hover:from-rose/90 hover:to-gold/90 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-xl">
              Planear Mi Evento Formal
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>

        {/* Componentes existentes adaptados */}
        <div className="bg-gradient-to-b from-rose-50/50 to-pink-50/50">
          <ServiceProviders />
        </div>
        <QuoteForm />
      </main>
      <Footer />
    </div>
  );
};

export default EventosFormales;