import Navigation from "@/components/Navigation";


import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, ArrowRight, Monitor, Users, Presentation, Network } from "lucide-react";

const EventosCorporativos = () => {
  const corporatePlans = [
    {
      name: "Plan Ejecutivo",
      price: "$899",
      capacity: "Hasta 30 personas",
      description: "Ideal para reuniones ejecutivas y presentaciones",
      features: [
        "Sala de conferencias premium",
        "Equipos AV básicos",
        "Coffee break incluido",
        "Material de apoyo",
        "Coordinador técnico",
        "Wi-Fi dedicado"
      ],
      color: "from-blue-500 to-cyan-500",
      popular: false
    },
    {
      name: "Plan Empresarial",
      price: "$1,899", 
      capacity: "Hasta 100 personas",
      description: "Perfecto para conferencias y eventos de networking",
      features: [
        "Auditorio profesional",
        "Tecnología AV completa", 
        "Catering ejecutivo",
        "Streaming en vivo",
        "Fotografía del evento",
        "Coordinador especializado",
        "Kit de bienvenida",
        "Networking cocktail"
      ],
      color: "from-cyan-500 to-teal-500",
      popular: true
    },
    {
      name: "Plan Premium",
      price: "$4,299",
      capacity: "Hasta 300 personas", 
      description: "La solución completa para grandes convenciones",
      features: [
        "Centro de convenciones",
        "Tecnología de última generación",
        "Catering gourmet completo",
        "Transmisión profesional",
        "Fotografía y video premium",
        "Equipo de coordinadores",
        "Branding personalizado",
        "Actividades de team building",
        "Transporte ejecutivo"
      ],
      color: "from-teal-500 to-green-500",
      popular: false
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        {/* Header */}
        <section className="relative py-20 bg-gradient-to-br from-blue-100 via-cyan-100 to-teal-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-8">
              <Briefcase className="w-16 h-16 mx-auto mb-4 text-blue-600" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Planes para
              <span className="block bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent">
                Eventos Corporativos
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Soluciones profesionales que proyecten excelencia y generen resultados empresariales
            </p>
          </div>
        </section>

        {/* Planes */}
        <section className="py-20 bg-gradient-to-b from-white to-blue-50/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {corporatePlans.map((plan, index) => (
                <Card 
                  key={index} 
                  className={`relative group hover:shadow-2xl transition-all duration-500 border-0 bg-white ${plan.popular ? 'ring-2 ring-cyan-500 scale-105' : ''}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                        Más Profesional
                      </span>
                    </div>
                  )}
                  
                  <CardContent className="p-8">
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                      <div className="mb-2">
                        <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                        <span className="text-gray-600 ml-2 block text-sm">{plan.capacity}</span>
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

      </main>
      <Footer />
    </div>
  );
};

export default EventosCorporativos;