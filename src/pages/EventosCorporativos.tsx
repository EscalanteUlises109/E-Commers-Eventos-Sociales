import Navigation from "@/components/Navigation";
import ServiceProviders from "@/components/ServiceProviders";
import Footer from "@/components/Footer";
import { Briefcase } from "lucide-react";
import businessBg from "@/assets/business-conference-background.gif";

const EventosCorporativos = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        {/* Header */}
        <section className="relative py-20 bg-gradient-to-br from-blue-100 via-cyan-100 to-teal-100 overflow-hidden">
          {/* GIF Background */}
          <div 
            className="absolute inset-0 z-0 opacity-20"
            style={{
              backgroundImage: `url(${businessBg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          ></div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-8">
              <Briefcase className="w-16 h-16 mx-auto mb-4 text-blue-600" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Proveedores para
              <span className="block bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent">
                Eventos Corporativos
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Encuentra los mejores proveedores especializados en eventos corporativos
            </p>
          </div>
        </section>

        <ServiceProviders eventType="corporativos" />
      </main>
      <Footer />
    </div>
  );
};

export default EventosCorporativos;