import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Baby, Heart, Briefcase, ArrowRight, Sparkles, Music, Palette, Camera, Gift, Utensils, MapPin, Mail, Users, Truck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Navigation from "@/components/Navigation";
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

  const specializedServices = [
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

  const allServices = [
    {
      title: "Decoración",
      description: "Ambientación personalizada con los más finos detalles",
      icon: Palette,
      color: "from-purple-400 to-pink-500",
      price: "Desde $2,500 MXN"
    },
    {
      title: "Catering", 
      description: "Menús gourmet adaptados a tus gustos y presupuesto",
      icon: Utensils,
      color: "from-orange-500 to-red-500", 
      price: "Desde $350 MXN/persona"
    },
    {
      title: "Entretenimiento",
      description: "Animación, música en vivo y espectáculos únicos",
      icon: Music,
      color: "from-blue-400 to-blue-600",
      price: "Desde $3,000 MXN"
    },
    {
      title: "Fotografía y Video",
      description: "Capturamos cada momento especial profesionalmente", 
      icon: Camera,
      color: "from-green-400 to-teal-500",
      price: "Desde $4,500 MXN"
    },
    {
      title: "Lugares y Sedes",
      description: "Espacios únicos y perfectos para tu celebración",
      icon: MapPin,
      color: "from-orange-400 to-yellow-500", 
      price: "Desde $8,000 MXN"
    },
    {
      title: "Invitaciones",
      description: "Diseños digitales y físicos que impresionan",
      icon: Mail,
      color: "from-pink-400 to-rose-500",
      price: "Desde $15 MXN/unidad"
    },
    {
      title: "Logística", 
      description: "Coordinación completa para que no te preocupes por nada",
      icon: Truck,
      color: "from-blue-500 to-purple-600",
      price: "Desde $2,000 MXN"
    },
    {
      title: "Gestión de Invitados",
      description: "Control de asistencia y comunicación personalizada", 
      icon: Users,
      color: "from-cyan-400 to-blue-500",
      price: "Desde $1,500 MXN"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 font-montserrat overflow-hidden">
      <Navigation />
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-rose-200/30 to-pink-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-yellow-200/20 to-orange-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4 lg:p-8">
        <div className="max-w-7xl mx-auto w-full">
          
          {/* Header Section */}
          <div className="text-center mb-8 lg:mb-10">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200/50 mb-6">
              <Sparkles className="w-4 h-4 text-rose-500" />
              <span className="text-sm font-medium text-gray-700">Planificación de Eventos Premium</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mb-6 leading-tight tracking-tight">
              ¿Qué tipo de <span className="bg-gradient-to-r from-rose-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">evento quieres crear?</span>
            </h1>
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

          {/* Servicios Especializados Section */}
          <section className="mt-32 mb-24">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Servicios 
                <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent ml-2">
                  Especializados
                </span>
              </h2>
              <p className="text-xl text-elegant-gray max-w-3xl mx-auto">
                Todo lo que necesitas para hacer de la celebración un momento inolvidable
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {specializedServices.map((service, index) => (
                <Card key={index} className="group border-0 shadow-card hover:shadow-luxury transition-all duration-300 hover:scale-105 bg-white/90 backdrop-blur-sm">
                  <CardHeader className="text-center pb-2">
                    <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-foreground group-hover:text-blue-600 transition-colors duration-300">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-elegant-gray text-center">
                      {service.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Nuestros Servicios Section */}
          <section className="mt-24 mb-24 bg-white/50 backdrop-blur-sm rounded-3xl p-8 lg:p-12">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Nuestros
                <span className="bg-gradient-to-r from-rose-500 to-gold bg-clip-text text-transparent ml-2">
                  Servicios
                </span>
              </h2>
              <p className="text-xl text-elegant-gray max-w-3xl mx-auto">
                Servicios integrales para hacer de tu evento una experiencia inolvidable
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {allServices.map((service, index) => (
                <Card key={index} className="group border-0 shadow-card hover:shadow-luxury transition-all duration-300 hover:scale-105 bg-white">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-rose-600 transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-elegant-gray text-sm mb-4 leading-relaxed">
                      {service.description}
                    </p>
                    <p className="text-rose-500 font-bold text-sm">
                      {service.price}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

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