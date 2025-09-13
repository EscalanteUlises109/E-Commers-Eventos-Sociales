import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Users, Target, Heart, Calendar, Sparkles } from "lucide-react";

const About = () => {
  const values = [
    {
      title: "Excelencia",
      description: "Cada detalle cuenta. Nos esforzamos por la perfección en cada evento.",
      icon: Award,
      color: "from-gold to-yellow-400"
    },
    {
      title: "Compromiso",
      description: "Tu visión es nuestra misión. Trabajamos hasta hacer tu sueño realidad.",
      icon: Target,
      color: "from-rose to-pink-400"
    },
    {
      title: "Pasión",
      description: "Amamos lo que hacemos y se refleja en cada celebración que creamos.",
      icon: Heart,
      color: "from-red-400 to-rose"
    }
  ];

  const stats = [
    { number: "500+", label: "Eventos Realizados", icon: Calendar },
    { number: "10K+", label: "Invitados Felices", icon: Users },
    { number: "5", label: "Años de Experiencia", icon: Sparkles },
    { number: "98%", label: "Clientes Satisfechos", icon: Heart }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-b from-champagne/20 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Sobre
              <span className="bg-gradient-to-r from-rose to-gold bg-clip-text text-transparent ml-2">
                Nosotros
              </span>
            </h1>
            <p className="text-xl text-elegant-gray max-w-3xl mx-auto leading-relaxed">
              Somos un equipo apasionado de profesionales dedicados a crear experiencias 
              inolvidables que superan todas las expectativas.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Nuestra Historia
              </h2>
              <div className="space-y-4 text-elegant-gray leading-relaxed">
                <p>
                  Todo comenzó hace más de 5 años con una simple idea: crear eventos 
                  que no solo cumplan expectativas, sino que las superen completamente. 
                  Desde entonces, hemos tenido el privilegio de formar parte de más de 
                  500 celebraciones únicas.
                </p>
                <p>
                  Nuestro equipo combina creatividad, experiencia y atención al detalle 
                  para transformar espacios ordinarios en experiencias extraordinarias. 
                  Cada evento es una nueva oportunidad de crear algo mágico.
                </p>
                <p>
                  Desde íntimas reuniones familiares hasta grandes celebraciones corporativas, 
                  nos especializamos en entender la esencia de cada ocasión y plasmarla 
                  en cada elemento del evento.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-rose/20 to-gold/20 rounded-2xl p-8 shadow-luxury">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-rose to-gold rounded-full flex items-center justify-center mx-auto mb-6">
                    <Sparkles className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    Nuestra Misión
                  </h3>
                  <p className="text-elegant-gray leading-relaxed">
                    Crear experiencias inolvidables que conecten personas, celebren momentos 
                    especiales y generen recuerdos que duren toda la vida.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gradient-to-b from-background to-champagne/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Nuestros Valores
            </h2>
            <p className="text-xl text-elegant-gray">
              Los principios que guían cada decisión y cada detalle
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center border-0 shadow-card hover:shadow-elegant transition-all duration-300 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground">
                    {value.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-elegant-gray leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-deep-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Resultados que Hablan
            </h2>
            <p className="text-xl text-white/80">
              Números que reflejan nuestro compromiso con la excelencia
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-rose to-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-gold-light mb-2">
                  {stat.number}
                </div>
                <div className="text-white/80">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Nuestro Equipo
            </h2>
            <p className="text-xl text-elegant-gray max-w-3xl mx-auto">
              Profesionales apasionados trabajando juntos para hacer realidad tus sueños
            </p>
          </div>

          <div className="bg-gradient-to-r from-champagne/50 to-gold-light/50 rounded-2xl p-8 text-center">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Un Equipo Completo a Tu Servicio
              </h3>
              <p className="text-elegant-gray leading-relaxed mb-6">
                Contamos con especialistas en decoración, coordinación, catering, entretenimiento, 
                fotografía y logística. Cada miembro de nuestro equipo aporta años de experiencia 
                y una pasión genuina por crear momentos perfectos.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <span className="bg-white/80 px-4 py-2 rounded-full text-foreground font-medium">
                  Coordinadores Certificados
                </span>
                <span className="bg-white/80 px-4 py-2 rounded-full text-foreground font-medium">
                  Decoradores Profesionales
                </span>
                <span className="bg-white/80 px-4 py-2 rounded-full text-foreground font-medium">
                  Chefs Especializados
                </span>
                <span className="bg-white/80 px-4 py-2 rounded-full text-foreground font-medium">
                  Fotógrafos Expertos
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;