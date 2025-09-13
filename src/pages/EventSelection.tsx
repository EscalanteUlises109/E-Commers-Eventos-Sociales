import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Baby, Heart, Briefcase, ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import kidsEventImage from "@/assets/kids-event.jpg";
import weddingEventImage from "@/assets/wedding-event.jpg";
import corporateEventImage from "@/assets/corporate-event.jpg";

const EventSelection = () => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const eventTypes = [
    {
      title: "Eventos Infantiles",
      subtitle: "Diversión y Magia",
      description: "Celebraciones llenas de color, risas y momentos mágicos para los más pequeños",
      icon: Baby,
      image: kidsEventImage,
      features: ["Animación Profesional", "Decoración Temática", "Catering Infantil", "Fotografía Artística"],
      color: "from-blue-500 via-purple-500 to-pink-500",
      bgColor: "from-blue-50 to-purple-50",
      route: "/eventos-infantiles",
      accent: "blue"
    },
    {
      title: "Eventos Formales",
      subtitle: "Elegancia y Distinción",
      description: "Bodas, XV años y celebraciones que marcan momentos especiales con estilo único",
      icon: Heart,
      image: weddingEventImage,
      features: ["Ceremonias Elegantes", "Fotografía de Lujo", "Catering Gourmet", "Coordinación Completa"],
      color: "from-rose-500 via-pink-500 to-red-500",
      bgColor: "from-rose-50 to-pink-50",
      route: "/eventos-formales",
      accent: "rose"
    },
    {
      title: "Eventos Corporativos",
      subtitle: "Profesionalismo e Impacto",
      description: "Conferencias y reuniones que proyectan excelencia y generan resultados",
      icon: Briefcase,
      image: corporateEventImage,
      features: ["Tecnología AV", "Networking Premium", "Logística Profesional", "Producción Integral"],
      color: "from-slate-600 via-blue-600 to-cyan-600",
      bgColor: "from-slate-50 to-blue-50",
      route: "/eventos-corporativos",
      accent: "slate"
    }
  ];

  const handleEventSelection = (route: string) => {
    navigate(route);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 font-montserrat overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-rose-200/30 to-pink-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-yellow-200/20 to-orange-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4 lg:p-8">
        <div className="max-w-7xl mx-auto w-full">
          
          {/* Header Section */}
          <div className="text-center mb-16 lg:mb-20">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200/50 mb-6">
              <Sparkles className="w-4 h-4 text-rose-500" />
              <span className="text-sm font-medium text-gray-700">Planificación de Eventos Premium</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-6 leading-tight tracking-tight">
              ¿Qué tipo de
              <span className="block bg-gradient-to-r from-rose-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                evento quieres crear?
              </span>
            </h1>
            
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium">
              Especialistas en transformar ideas en experiencias inolvidables. 
              <br className="hidden sm:block" />
              Elige tu tipo de evento y descubre servicios diseñados especialmente para ti.
            </p>
          </div>

          {/* Event Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {eventTypes.map((event, index) => (
              <Card 
                key={index}
                className="group relative overflow-hidden border-0 bg-white/70 backdrop-blur-md shadow-lg hover:shadow-2xl transition-all duration-700 cursor-pointer transform hover:-translate-y-2"
                onClick={() => handleEventSelection(event.route)}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Background Image */}
                <div className="absolute inset-0 overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-white/90 group-hover:bg-white/80 transition-colors duration-500"></div>
                  <div className={`absolute inset-0 bg-gradient-to-br ${event.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>
                </div>

                <div className="relative z-10 p-8 h-full flex flex-col">
                  {/* Icon */}
                  <div className="mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${event.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-500 ${hoveredCard === index ? 'rotate-12 scale-110' : ''}`}>
                      <event.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-grow">
                    <div className="mb-2">
                      <span className={`text-xs font-semibold uppercase tracking-wider ${
                        event.accent === 'blue' ? 'text-blue-600' : 
                        event.accent === 'rose' ? 'text-rose-600' : 'text-slate-600'
                      }`}>
                        {event.subtitle}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl lg:text-3xl font-black text-gray-900 mb-4 group-hover:text-gray-800 transition-colors duration-300">
                      {event.title}
                    </h3>
                    
                    <p className="text-gray-600 text-base leading-relaxed mb-6 font-medium">
                      {event.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-2 mb-8">
                      {event.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-3">
                          <div className={`w-1.5 h-1.5 bg-gradient-to-r ${event.color} rounded-full`}></div>
                          <span className="text-sm font-medium text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Button 
                    className={`w-full bg-gradient-to-r ${event.color} hover:shadow-lg text-white font-semibold py-4 rounded-xl transition-all duration-300 group-hover:scale-105`}
                  >
                    <span className="flex items-center justify-center gap-2">
                      Explorar {event.title.split(' ')[1]}
                      <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${hoveredCard === index ? 'translate-x-1' : ''}`} />
                    </span>
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Footer Note */}
          <div className="text-center mt-16 lg:mt-20">
            <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm px-6 py-3 rounded-full border border-gray-200/50">
              <span className="text-sm font-medium text-gray-600">
                ¿Necesitas ayuda para decidir? 
              </span>
              <Button variant="ghost" className="text-sm font-semibold text-rose-600 hover:text-rose-700 p-0 h-auto">
                Contáctanos
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventSelection;