import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Baby, Heart, Briefcase, ArrowRight } from "lucide-react";
import kidsEventImage from "@/assets/kids-event.jpg";
import weddingEventImage from "@/assets/wedding-event.jpg";
import corporateEventImage from "@/assets/corporate-event.jpg";

const EventTypes = () => {
  const eventTypes = [
    {
      title: "Eventos Infantiles",
      description: "Celebraciones mágicas llenas de diversión, color y alegría para los más pequeños.",
      icon: Baby,
      image: kidsEventImage,
      features: ["Decoración temática", "Animación profesional", "Catering infantil", "Fotografía"],
      color: "from-blue-400 to-purple-500"
    },
    {
      title: "Eventos Formales",
      description: "Bodas, XV años y celebraciones elegantes que marquen momentos especiales.",
      icon: Heart,
      image: weddingEventImage,
      features: ["Decoración elegante", "Servicio de lujo", "Fotografía profesional", "Coordinación completa"],
      color: "from-rose to-pink-400"
    },
    {
      title: "Eventos Corporativos",
      description: "Conferencias, reuniones y lanzamientos que proyecten profesionalismo.",
      icon: Briefcase,
      image: corporateEventImage,
      features: ["Tecnología AV", "Catering ejecutivo", "Logística profesional", "Networking"],
      color: "from-gold to-amber-400"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-champagne/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Tipos de 
            <span className="bg-gradient-to-r from-rose to-gold bg-clip-text text-transparent ml-2">
              Eventos
            </span>
          </h2>
          <p className="text-xl text-elegant-gray max-w-3xl mx-auto">
            Especializados en crear experiencias únicas para cada ocasión especial
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {eventTypes.map((event, index) => (
            <Card key={index} className="group overflow-hidden border-0 shadow-card hover:shadow-luxury transition-all duration-500 hover:scale-105 bg-white/80 backdrop-blur-sm">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${event.color} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
                <div className="absolute top-4 left-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${event.color} rounded-full flex items-center justify-center shadow-lg`}>
                    <event.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
              
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-bold text-foreground group-hover:text-rose transition-colors duration-300">
                  {event.title}
                </CardTitle>
                <CardDescription className="text-elegant-gray text-base">
                  {event.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {event.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-foreground">
                      <div className="w-1.5 h-1.5 bg-gradient-to-r from-rose to-gold rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button className="w-full bg-gradient-to-r from-rose to-gold hover:from-rose/90 hover:to-gold/90 text-white font-medium py-2 rounded-full transition-all duration-300 group-hover:shadow-elegant">
                  Más Información
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventTypes;