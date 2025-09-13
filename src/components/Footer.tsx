import { Sparkles, Phone, Mail, MapPin, Facebook, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-deep-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-rose to-gold rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-rose-light to-gold-light bg-clip-text text-transparent">
                EventosPerfectos
              </span>
            </div>
            <p className="text-white/80 text-lg mb-6 max-w-md leading-relaxed">
              Creamos experiencias inolvidables para tus momentos más especiales. 
              Más de 5 años transformando sueños en realidad.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-rose hover:to-gold transition-all duration-300 cursor-pointer">
                <Facebook className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-rose hover:to-gold transition-all duration-300 cursor-pointer">
                <Instagram className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-rose hover:to-gold transition-all duration-300 cursor-pointer">
                <Twitter className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gold-light">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-white/80 hover:text-gold-light transition-colors duration-300">Inicio</Link></li>
              <li><Link to="/eventos" className="text-white/80 hover:text-gold-light transition-colors duration-300">Tipos de Eventos</Link></li>
              <li><Link to="/servicios" className="text-white/80 hover:text-gold-light transition-colors duration-300">Servicios</Link></li>
              <li><Link to="/galeria" className="text-white/80 hover:text-gold-light transition-colors duration-300">Galería</Link></li>
              <li><Link to="/nosotros" className="text-white/80 hover:text-gold-light transition-colors duration-300">Nosotros</Link></li>
              <li><Link to="/contacto" className="text-white/80 hover:text-gold-light transition-colors duration-300">Contacto</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gold-light">Contacto</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gold" />
                <span className="text-white/80">+52 55 1234-5678</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gold" />
                <span className="text-white/80">eventos@perfectos.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gold mt-1" />
                <span className="text-white/80">
                  Av. Reforma 123<br />
                  Ciudad de México, CDMX
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm">
            © 2024 EventosPerfectos. Todos los derechos reservados.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacidad" className="text-white/60 hover:text-gold-light text-sm transition-colors duration-300">
              Política de Privacidad
            </Link>
            <Link to="/terminos" className="text-white/60 hover:text-gold-light text-sm transition-colors duration-300">
              Términos y Condiciones
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;