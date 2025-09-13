import Navigation from "@/components/Navigation";
import ServiceProviders from "@/components/ServiceProviders";
import Footer from "@/components/Footer";
import { Heart } from "lucide-react";
import weddingBg from "@/assets/wedding-celebration.gif";

const EventosFormales = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        {/* Header */}
        <section className="relative py-20 bg-gradient-to-br from-rose-100 via-pink-100 to-purple-100 overflow-hidden">
          {/* GIF Background */}
          <div 
            className="absolute inset-0 z-0 opacity-20"
            style={{
              backgroundImage: `url(${weddingBg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          ></div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-8">
              <Heart className="w-16 h-16 mx-auto mb-4 text-rose-600" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-rose-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
                Eventos Formales
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Encuentra los mejores proveedores especializados en eventos formales
            </p>
          </div>
        </section>

        <ServiceProviders eventType="formales" />
      </main>
      <Footer />
    </div>
  );
};

export default EventosFormales;