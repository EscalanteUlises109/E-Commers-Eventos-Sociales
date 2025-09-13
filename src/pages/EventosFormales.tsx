import Navigation from "@/components/Navigation";
import ServiceProviders from "@/components/ServiceProviders";
import QuoteForm from "@/components/QuoteForm";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ArrowRight, Crown, Camera, Music, Utensils } from "lucide-react";

const EventosFormales = () => {
  const formalPlans = [
    {
      name: "Plan Íntimo",
      price: "$1,299",
      guests: "Hasta 50 invitados",
      description: "Perfecto para celebraciones elegantes e íntimas",
      features: [
        "Decoración clásica y elegante",
        "Ceremonias personalizadas",
        "Fotografía básica (2 horas)",
        "Catering para cóctel",
        "Coordinador de eventos",
        "Música ambiental"
      ],
      color: "from-rose-400 to-pink-500",
      popular: false
    },
    {
      name: "Plan Elegante",
      price: "$2,899", 
      guests: "Hasta 100 invitados",
      description: "La elección perfecta para bodas y quinceañeros",
      features: [
        "Decoración premium personalizada",
        "Ceremonia completa con protocolo", 
        "Fotografía profesional (6 horas)",
        "Video ceremonial",
        "Catering gourmet completo",
        "Banda o DJ profesional",
        "Coordinador especializado",
        "Transporte nupcial"
      ],
      color: "from-pink-500 to-rose-500",
      popular: true
    },
    {
      name: "Plan de Lujo",
      price: "$5,999",
      guests: "Hasta 200 invitados", 
      description: "La experiencia más exclusiva y sofisticada",
      features: [
        "Decoración de lujo personalizada",
        "Ceremonia con protocolo completo",
        "Fotografía y video premium (día completo)",
        "Catering gourmet de 5 tiempos",
        "Orquesta o banda en vivo",
        "Coordinador experto dedicado",
        "Transporte de lujo",
        "Hospedaje nupcial incluido",
        "Spa y preparación pre-evento"
      ],
      color: "from-rose-500 to-red-500",
      popular: false
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        {/* Header */}
        <section className="relative py-20 bg-gradient-to-br from-rose-100 via-pink-100 to-purple-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-8">
              <Heart className="w-16 h-16 mx-auto mb-4 text-rose-600" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Planes para
              <span className="block bg-gradient-to-r from-rose-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
                Eventos Formales
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Elegancia y distinción en cada detalle para momentos que perdurarán para siempre
            </p>
          </div>
        </section>

        {/* Planes */}
        <section className="py-20 bg-gradient-to-b from-white to-rose-50/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {formalPlans.map((plan, index) => (
                <Card 
                  key={index} 
                  className={`relative group hover:shadow-2xl transition-all duration-500 border-0 bg-white ${plan.popular ? 'ring-2 ring-rose-500 scale-105' : ''}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                        Más Elegido
                      </span>
                    </div>
                  )}
                  
                  <CardContent className="p-8">
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                      <div className="mb-2">
                        <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                        <span className="text-gray-600 ml-2 block text-sm">{plan.guests}</span>
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

        <ServiceProviders eventType="formales" />
        <QuoteForm />
      </main>
      <Footer />
    </div>
  );
};

export default EventosFormales;