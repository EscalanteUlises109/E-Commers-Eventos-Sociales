import Navigation from "@/components/Navigation";

import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Baby, ArrowRight, Palette, Music, Camera, Gift } from "lucide-react";
import kidsEventImage from "@/assets/kids-event.jpg";

const EventosInfantiles = () => {
  const infantilePlans = [
    {
      name: "Plan Básico",
      price: "$299",
      duration: "4 horas",
      description: "Perfecto para celebraciones íntimas",
      features: [
        "Decoración temática básica",
        "1 animador profesional",
        "Juegos y actividades",
        "Música ambiente",
        "Setup y limpieza"
      ],
      color: "from-blue-400 to-purple-500",
      popular: false
    },
    {
      name: "Plan Premium",
      price: "$599", 
      duration: "6 horas",
      description: "La elección más popular para fiestas completas",
      features: [
        "Decoración temática premium",
        "2 animadores profesionales", 
        "Show de magia o títeres",
        "Fotografía básica",
        "Catering infantil (snacks)",
        "Piñata y sorpresas",
        "Setup y limpieza"
      ],
      color: "from-purple-500 to-pink-500",
      popular: true
    },
    {
      name: "Plan Deluxe",
      price: "$899",
      duration: "8 horas", 
      description: "La experiencia completa e inolvidable",
      features: [
        "Decoración temática de lujo",
        "3 animadores especializados",
        "Show completo + personajes",
        "Fotografía profesional",
        "Catering completo",
        "Torta personalizada",
        "Regalos y sorpresas",
        "Coordinador de eventos",
        "Setup y limpieza"
      ],
      color: "from-pink-500 to-rose-500",
      popular: false
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        {/* Header */}
        <section className="relative py-20 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-8">
              <Baby className="w-16 h-16 mx-auto mb-4 text-blue-600" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Planes para
              <span className="block bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Eventos Infantiles
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Selecciona el plan perfecto para hacer de la celebración un momento mágico e inolvidable
            </p>
          </div>
        </section>

        {/* Planes */}
        <section className="py-20 bg-gradient-to-b from-white to-blue-50/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {infantilePlans.map((plan, index) => (
                <Card 
                  key={index} 
                  className={`relative group hover:shadow-2xl transition-all duration-500 border-0 bg-white ${plan.popular ? 'ring-2 ring-purple-500 scale-105' : ''}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                        Más Popular
                      </span>
                    </div>
                  )}
                  
                  <CardContent className="p-8">
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                      <div className="mb-2">
                        <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                        <span className="text-gray-600 ml-2">/ {plan.duration}</span>
                      </div>
                      <p className="text-gray-600">{plan.description}</p>
                    </div>

                    <div className="space-y-3 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-3">
                          <div className={`w-2 h-2 bg-gradient-to-r ${plan.color} rounded-full`}></div>
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Button 
                      className={`w-full bg-gradient-to-r ${plan.color} hover:shadow-lg text-white font-semibold py-3 rounded-xl transition-all duration-300 group-hover:scale-105`}
                    >
                      <span className="flex items-center justify-center gap-2">
                        Seleccionar Plan
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Servicios adicionales */}
        <section className="py-20 bg-gradient-to-b from-blue-50/30 to-purple-50/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Servicios Adicionales
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Personaliza tu evento con servicios extras
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Palette className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Decoración Extra</h3>
                  <p className="text-gray-600 text-sm mb-3">Elementos decorativos adicionales</p>
                  <p className="text-lg font-bold text-blue-600">+$99</p>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Music className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">DJ Profesional</h3>
                  <p className="text-gray-600 text-sm mb-3">Música y sonido de calidad</p>
                  <p className="text-lg font-bold text-purple-600">+$149</p>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Sesión de Fotos</h3>
                  <p className="text-gray-600 text-sm mb-3">Fotografía profesional extra</p>
                  <p className="text-lg font-bold text-pink-600">+$199</p>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-rose-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Gift className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Pack de Regalos</h3>
                  <p className="text-gray-600 text-sm mb-3">Sorpresas adicionales para niños</p>
                  <p className="text-lg font-bold text-orange-600">+$79</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        
      </main>
      <Footer />
    </div>
  );
};

export default EventosInfantiles;