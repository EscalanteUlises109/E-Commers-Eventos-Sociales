import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Baby, Heart, Briefcase, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EventSelection = () => {
  const navigate = useNavigate();

  const eventTypes = [
    {
      title: "Eventos Infantiles",
      subtitle: "DIVERSIÓN Y MAGIA",
      description: "Celebraciones llenas de color, risas y momentos mágicos para los más pequeños",
      icon: Baby,
      features: [
        "Animación Profesional",
        "Decoración Temática", 
        "Catering Infantil",
        "Fotografía Artística"
      ],
      buttonText: "Explorar Infantiles",
      buttonGradient: "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500",
      iconGradient: "bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500",
      subtitleColor: "text-purple-600",
      dotColor: "bg-purple-500",
      route: "/eventos-infantiles"
    },
    {
      title: "Eventos Formales", 
      subtitle: "ELEGANCIA Y DISTINCIÓN",
      description: "Bodas, XV años y celebraciones que marcan momentos especiales con estilo único",
      icon: Heart,
      features: [
        "Ceremonias Elegantes",
        "Fotografía de Lujo",
        "Catering Gourmet", 
        "Coordinación Completa"
      ],
      buttonText: "Explorar Formales",
      buttonGradient: "bg-gradient-to-r from-pink-500 to-red-500",
      iconGradient: "bg-gradient-to-br from-pink-500 to-red-500",
      subtitleColor: "text-pink-600",
      dotColor: "bg-pink-500",
      route: "/eventos-formales"
    },
    {
      title: "Eventos Corporativos",
      subtitle: "PROFESIONALISMO E IMPACTO", 
      description: "Conferencias y reuniones que proyectan excelencia y generan resultados",
      icon: Briefcase,
      features: [
        "Tecnología AV",
        "Networking Premium",
        "Logística Profesional",
        "Producción Integral"
      ],
      buttonText: "Explorar Corporativos",
      buttonGradient: "bg-gradient-to-r from-blue-600 to-cyan-500",
      iconGradient: "bg-gradient-to-br from-blue-600 to-cyan-500", 
      subtitleColor: "text-blue-600",
      dotColor: "bg-blue-500",
      route: "/eventos-corporativos"
    }
  ];

  const handleEventSelection = (route: string) => {
    navigate(route);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título Principal */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            ¿Qué tipo de{" "}
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              evento quieres crear?
            </span>
          </h2>
        </div>

        {/* Grid de Tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {eventTypes.map((event, index) => (
            <Card 
              key={index} 
              className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm cursor-pointer"
              onClick={() => handleEventSelection(event.route)}
            >
              <CardContent className="p-8">
                {/* Ícono */}
                <div className="mb-6">
                  <div className={`w-16 h-16 ${event.iconGradient} rounded-2xl flex items-center justify-center shadow-lg`}>
                    <event.icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Subtítulo */}
                <div className="mb-2">
                  <span className={`text-xs font-bold uppercase tracking-wider ${event.subtitleColor}`}>
                    {event.subtitle}
                  </span>
                </div>

                {/* Título */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {event.title}
                </h3>

                {/* Descripción */}
                <p className="text-gray-600 text-base leading-relaxed mb-6">
                  {event.description}
                </p>

                {/* Lista de características */}
                <div className="space-y-3 mb-8">
                  {event.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      <div className={`w-2 h-2 ${event.dotColor} rounded-full`}></div>
                      <span className="text-sm font-medium text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Botón */}
                <Button 
                  className={`w-full ${event.buttonGradient} hover:opacity-90 text-white font-semibold py-3 rounded-xl transition-all duration-300 group-hover:shadow-lg`}
                >
                  <span className="flex items-center justify-center gap-2">
                    {event.buttonText}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventSelection;