import Navigation from "@/components/Navigation";
import ServiceProviders from "@/components/ServiceProviders";
import Footer from "@/components/Footer";
import { Baby } from "lucide-react";

const EventosInfantiles = () => {
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
              Proveedores para
              <span className="block bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Eventos Infantiles
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Encuentra los mejores proveedores especializados en eventos infantiles
            </p>
          </div>
        </section>

        <ServiceProviders eventType="infantiles" />
      </main>
      <Footer />
    </div>
  );
};

export default EventosInfantiles;