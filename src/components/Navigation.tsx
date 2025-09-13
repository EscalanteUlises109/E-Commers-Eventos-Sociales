import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Sparkles, User, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const navItems = [
    { name: "Inicio", href: "/" },
    { name: "Eventos", href: "/eventos" },
    { name: "Servicios", href: "/servicios" },
    { name: "Galería", href: "/galeria" },
    { name: "Nosotros", href: "/nosotros" },
    { name: "Contacto", href: "/contacto" },
  ];

  return (
    <nav className="fixed w-full z-50 bg-background/90 backdrop-blur-lg border-b border-champagne">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-rose to-gold rounded-full flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-rose to-gold bg-clip-text text-transparent">
              EventosPerfectos
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-foreground hover:text-rose px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Auth Buttons or User Menu */}
          <div className="hidden md:block">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to={user.role === 'cliente' ? '/dashboard-cliente' : '/dashboard-proveedor'}>
                  <Button variant="outline" size="sm" className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    {user.name}
                  </Button>
                </Link>
                <Button 
                  onClick={logout}
                  variant="ghost" 
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login-cliente">
                  <Button variant="outline" size="sm">
                    Cliente
                  </Button>
                </Link>
                <Link to="/login-proveedor">
                  <Button className="bg-gradient-to-r from-rose to-gold hover:from-rose/90 hover:to-gold/90 text-white font-medium px-4 py-2 rounded-full shadow-elegant transition-all duration-300 hover:shadow-luxury">
                    Proveedor
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground hover:text-rose"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-lg border-b border-champagne">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-foreground hover:text-rose block px-3 py-2 text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-2 space-y-2">
              {user ? (
                <div className="space-y-2">
                  <Link to={user.role === 'cliente' ? '/dashboard-cliente' : '/dashboard-proveedor'}>
                    <Button variant="outline" className="w-full">
                      <User className="w-4 h-4 mr-2" />
                      {user.name}
                    </Button>
                  </Link>
                  <Button 
                    onClick={logout}
                    variant="ghost" 
                    className="w-full text-red-600 hover:text-red-700"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Cerrar Sesión
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link to="/login-cliente">
                    <Button variant="outline" className="w-full">
                      Acceso Cliente
                    </Button>
                  </Link>
                  <Link to="/login-proveedor">
                    <Button className="w-full bg-gradient-to-r from-rose to-gold hover:from-rose/90 hover:to-gold/90 text-white font-medium py-2 rounded-full">
                      Acceso Proveedor
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;