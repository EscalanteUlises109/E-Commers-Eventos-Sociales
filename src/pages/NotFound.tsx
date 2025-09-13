import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, Search, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-champagne/20 to-background">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-8">
          <div className="text-8xl font-bold bg-gradient-to-r from-rose to-gold bg-clip-text text-transparent mb-4">
            404
          </div>
          <Search className="w-16 h-16 text-elegant-gray mx-auto mb-4" />
        </div>
        
        <h1 className="text-3xl font-bold text-foreground mb-4">
          Página No Encontrada
        </h1>
        
        <p className="text-xl text-elegant-gray mb-8 leading-relaxed">
          Lo sentimos, la página que buscas no existe o ha sido movida. 
          ¡Pero no te preocupes! Podemos ayudarte a encontrar lo que necesitas.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            asChild
            className="bg-gradient-to-r from-rose to-gold hover:from-rose/90 hover:to-gold/90 text-white font-semibold px-6 py-3 rounded-full shadow-elegant transition-all duration-300"
          >
            <Link to="/">
              <Home className="w-5 h-5 mr-2" />
              Volver al Inicio
            </Link>
          </Button>
          
          <Button 
            asChild
            variant="outline"
            className="border-2 border-rose text-rose hover:bg-rose hover:text-white font-semibold px-6 py-3 rounded-full transition-all duration-300"
          >
            <Link to="/contacto">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Contactanos
            </Link>
          </Button>
        </div>

        <div className="mt-12 p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-champagne">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            ¿Necesitas Ayuda?
          </h3>
          <p className="text-elegant-gray text-sm">
            Si llegaste aquí desde un enlace en nuestro sitio, por favor contáctanos 
            para que podamos solucionarlo.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
