import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Sparkles, User, LogOut, Home, Calendar, Settings, Heart, Briefcase, BarChart3, Users, CalendarDays, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import CartSidebar from "@/components/CartSidebar";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const navigate = useNavigate();

  // Dynamic navigation items based on authentication status and user role
  const getNavItems = () => {
    if (!user) {
      // User not logged in - show basic navigation
      return [
        { name: "Inicio", href: "/inicio", icon: Home },
        { name: "Eventos", href: "/eventos", icon: Calendar },
        { name: "Servicios", href: "/servicios", icon: Briefcase },
      ];
    }

    if (user.role === 'cliente') {
      // Client navigation - prioritizing personal dashboard after home
      return [
        { name: "Inicio", href: "/inicio", icon: Home },
        { name: "Mis Eventos", href: "/dashboard-cliente", icon: BarChart3 },
        { name: "Eventos", href: "/eventos", icon: Calendar },
        { name: "Servicios", href: "/servicios", icon: Briefcase },
        { name: "Favoritos", href: "/favoritos", icon: Heart },
      ];
    } else {
      // Provider navigation - logical business flow
      return [
        { name: "Inicio", href: "/inicio", icon: Home },
        { name: "Mi Negocio", href: "/dashboard-proveedor", icon: BarChart3 },
        { name: "Clientes", href: "/proveedor-clientes", icon: Users },
        { name: "Reservas", href: "/proveedor-reservas", icon: CalendarDays },
      ];
    }
  };

  const navItems = getNavItems();

  return (
    <nav className="fixed w-full z-50 bg-background/90 backdrop-blur-lg border-b border-champagne">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/inicio" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-rose to-gold rounded-full flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-rose to-gold bg-clip-text text-transparent">
              EventFastWeb
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="text-foreground hover:text-rose px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-2"
                  >
                    <IconComponent className="w-4 h-4" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Auth Buttons or User Menu */}
          <div className="hidden md:block">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm text-elegant-gray">
                  <div className={`w-2 h-2 rounded-full ${user.role === 'cliente' ? 'bg-blue-500' : 'bg-green-500'}`}></div>
                  <span className="capitalize">{user.role}</span>
                </div>
                {/* Cart Icon */}
                <button onClick={() => setCartOpen(true)} className="relative group inline-flex items-center justify-center w-10 h-10 rounded-full border border-champagne/60 hover:border-rose/60 bg-white shadow-sm transition-all">
                  <ShoppingCart className="w-5 h-5 text-elegant-gray group-hover:text-rose transition" />
                  {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 text-[10px] font-bold bg-gradient-to-r from-rose to-gold text-white rounded-full px-1.5 py-0.5 shadow">
                      {itemCount > 99 ? '99+' : itemCount}
                    </span>
                  )}
                </button>
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
                <Link to="/perfil">
                  <Button variant="outline" size="sm">
                    Iniciar Sesión
                  </Button>
                </Link>
                <Link to="/perfil">
                  <Button size="sm" className="bg-gradient-to-r from-rose to-gold hover:from-rose/90 hover:to-gold/90 text-white">
                    Registrarse
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-3">
            {user && (
              <button onClick={() => setCartOpen(true)} className="relative inline-flex items-center justify-center w-10 h-10 rounded-full border border-champagne/60 bg-white shadow-sm">
                <ShoppingCart className="w-5 h-5 text-elegant-gray" />
                {itemCount > 0 && <span className="absolute -top-1 -right-1 text-[10px] font-bold bg-gradient-to-r from-rose to-gold text-white rounded-full px-1.5 py-0.5">{itemCount > 99 ? '99+' : itemCount}</span>}
              </button>
            )}
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
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-foreground hover:text-rose block px-3 py-2 text-base font-medium flex items-center gap-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <IconComponent className="w-4 h-4" />
                  {item.name}
                </Link>
              );
            })}
            <div className="pt-2 space-y-2">
              {user ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-center space-x-2 text-sm text-elegant-gray bg-gray-50 rounded-lg py-2">
                    <div className={`w-2 h-2 rounded-full ${user.role === 'cliente' ? 'bg-blue-500' : 'bg-green-500'}`}></div>
                    <span className="capitalize font-medium">{user.role}: {user.name}</span>
                  </div>
                  <Link to={user.role === 'cliente' ? '/dashboard-cliente' : '/dashboard-proveedor'}>
                    <Button variant="outline" className="w-full" onClick={() => setIsMenuOpen(false)}>
                      <User className="w-4 h-4 mr-2" />
                      Mi Dashboard
                    </Button>
                  </Link>
                  <Button 
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    variant="ghost" 
                    className="w-full text-red-600 hover:text-red-700"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Cerrar Sesión
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link to="/perfil">
                    <Button variant="outline" className="w-full" onClick={() => setIsMenuOpen(false)}>
                      Iniciar Sesión
                    </Button>
                  </Link>
                  <Link to="/perfil">
                    <Button className="w-full bg-gradient-to-r from-rose to-gold hover:from-rose/90 hover:to-gold/90 text-white" onClick={() => setIsMenuOpen(false)}>
                      Registrarse
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
  <CartSidebar open={cartOpen} onClose={() => setCartOpen(false)} onGoCheckout={() => { setCartOpen(false); navigate('/checkout'); }} />
    </nav>
  );
};

export default Navigation;