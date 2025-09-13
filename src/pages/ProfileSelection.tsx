import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Briefcase, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const ProfileSelection = () => {
  const profileTypes = [
    {
      title: "Cliente",
      description: "Busco planificar un evento especial",
      details: "Accede a nuestros servicios, cotiza eventos y gestiona tus celebraciones",
      icon: User,
      color: "from-rose-500 to-pink-500",
      bgColor: "from-rose-50 to-pink-50",
      route: "/login-cliente",
      features: ["Cotizar eventos", "Ver proveedores", "Gestionar eventos", "Comunicación directa"]
    },
    {
      title: "Proveedor",
      description: "Ofrezco servicios para eventos",
      details: "Únete a nuestra red de proveedores y conecta con clientes potenciales",
      icon: Briefcase,
      color: "from-blue-500 to-purple-600",
      bgColor: "from-blue-50 to-purple-50",
      route: "/login-proveedor",
      features: ["Recibir solicitudes", "Gestionar servicios", "Dashboard completo", "Analíticas de negocio"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto w-full">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200/50 mb-6">
            <User className="w-4 h-4 text-rose-500" />
            <span className="text-sm font-medium text-gray-700">Selecciona tu Perfil</span>
          </div>
          
          <h1 className="text-3xl lg:text-4xl font-black text-gray-900 mb-4 leading-tight">
            ¿Cómo quieres <span className="bg-gradient-to-r from-rose-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">acceder?</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Elige el tipo de perfil que mejor se adapte a tus necesidades
          </p>
        </div>

        {/* Profile Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {profileTypes.map((profile, index) => (
            <Card 
              key={index}
              className="group relative overflow-hidden border-0 bg-white/90 backdrop-blur-md shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${profile.bgColor} opacity-50`}></div>
              
              <div className="relative z-10 p-8">
                {/* Icon */}
                <div className="mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${profile.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-110`}>
                    <profile.icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Content */}
                <CardHeader className="p-0 mb-6">
                  <CardTitle className="text-2xl font-black text-gray-900 mb-2">
                    {profile.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 text-base font-medium">
                    {profile.description}
                  </CardDescription>
                  <p className="text-sm text-gray-500 mt-2">
                    {profile.details}
                  </p>
                </CardHeader>

                {/* Features */}
                <CardContent className="p-0 mb-8">
                  <div className="space-y-3">
                    {profile.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-3">
                        <div className={`w-1.5 h-1.5 bg-gradient-to-r ${profile.color} rounded-full`}></div>
                        <span className="text-sm font-medium text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>

                {/* CTA Button */}
                <Link to={profile.route}>
                  <Button 
                    className={`w-full bg-gradient-to-r ${profile.color} hover:shadow-lg text-white font-semibold py-4 rounded-xl transition-all duration-300 group-hover:scale-105`}
                  >
                    <span className="flex items-center justify-center gap-2">
                      Acceder como {profile.title}
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>

        {/* Back to Home */}
        <div className="text-center">
          <Link to="/" className="text-gray-500 hover:text-gray-700 transition-colors text-sm font-medium">
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileSelection;