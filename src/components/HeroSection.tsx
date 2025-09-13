import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Users, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-event.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Elegant event setup"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-deep-navy/70 via-rose/20 to-gold/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <Sparkles className="w-16 h-16 text-gold mx-auto mb-4 animate-pulse" />
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
          Hacemos Tus
          <span className="block bg-gradient-to-r from-gold-light to-rose-light bg-clip-text text-transparent">
            Eventos Perfectos
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
          Creamos experiencias inolvidables para bodas, eventos corporativos, 
          celebraciones infantiles y más. Tu visión, nuestra experiencia.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button 
            size="lg"
            className="bg-gradient-to-r from-rose to-gold hover:from-rose/90 hover:to-gold/90 text-white font-semibold px-8 py-4 rounded-full shadow-luxury transition-all duration-300 hover:shadow-xl hover:scale-105"
          >
            ¡Planea tu Evento Ahora!
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          <Button 
            variant="outline"
            size="lg"
            className="border-2 border-white text-white hover:bg-white hover:text-deep-navy font-semibold px-8 py-4 rounded-full transition-all duration-300"
          >
            Ver Galería
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Calendar className="w-8 h-8 text-gold mr-2" />
              <span className="text-4xl font-bold text-white">500+</span>
            </div>
            <p className="text-white/80">Eventos Realizados</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Users className="w-8 h-8 text-gold mr-2" />
              <span className="text-4xl font-bold text-white">10K+</span>
            </div>
            <p className="text-white/80">Invitados Felices</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Sparkles className="w-8 h-8 text-gold mr-2" />
              <span className="text-4xl font-bold text-white">5</span>
            </div>
            <p className="text-white/80">Años de Experiencia</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;