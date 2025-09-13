import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MessageCircle, Star, Clock, LogOut, User, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const DashboardCliente = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const stats = [
    { label: "Eventos Planificados", value: "3", icon: Calendar, color: "from-rose to-gold" },
    { label: "Mensajes", value: "12", icon: MessageCircle, color: "from-blue-400 to-blue-600" },
    { label: "Favoritos", value: "8", icon: Heart, color: "from-pink-400 to-rose-500" },
    { label: "Citas Pendientes", value: "2", icon: Clock, color: "from-orange-400 to-red-500" },
  ];

  const recentEvents = [
    { name: "Boda de Ensueño", date: "15 Jul 2024", status: "Planificando", progress: 75 },
    { name: "Cumpleaños Isabella", date: "22 Jul 2024", status: "Confirmado", progress: 100 },
    { name: "Aniversario Bodas de Oro", date: "30 Jul 2024", status: "Inicial", progress: 25 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-gold-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-lg border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-rose to-gold rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">¡Hola, {user?.name}!</h1>
                <p className="text-sm text-elegant-gray">Panel de Cliente</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="outline" size="sm">
                  Volver al Inicio
                </Button>
              </Link>
              <Button 
                onClick={handleLogout}
                variant="outline" 
                size="sm"
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-card hover:shadow-luxury transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-elegant-gray text-sm font-medium">{stat.label}</p>
                    <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-full flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Events */}
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-rose" />
                Mis Eventos
              </CardTitle>
              <CardDescription>
                Eventos en proceso de planificación
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentEvents.map((event, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-rose-50 to-gold-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-foreground">{event.name}</h4>
                    <p className="text-sm text-elegant-gray">{event.date}</p>
                    <div className="flex items-center mt-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-gradient-to-r from-rose to-gold h-2 rounded-full" 
                          style={{ width: `${event.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-elegant-gray">{event.progress}%</span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    event.status === 'Confirmado' ? 'bg-green-100 text-green-800' :
                    event.status === 'Planificando' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {event.status}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Star className="w-5 h-5 mr-2 text-gold" />
                Acciones Rápidas
              </CardTitle>
              <CardDescription>
                Gestiona tus eventos y servicios
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link to="/eventos-infantiles">
                <Button className="w-full bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 text-white justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  Planear Evento Infantil
                </Button>
              </Link>
              <Link to="/eventos-formales">
                <Button className="w-full bg-gradient-to-r from-rose to-gold hover:from-rose/90 hover:to-gold/90 text-white justify-start">
                  <Heart className="w-4 h-4 mr-2" />
                  Planear Evento Formal
                </Button>
              </Link>
              <Link to="/eventos-corporativos">
                <Button className="w-full bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 text-white justify-start">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Planear Evento Corporativo
                </Button>
              </Link>
              <Button variant="outline" className="w-full justify-start">
                <Star className="w-4 h-4 mr-2" />
                Ver Mis Favoritos
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default DashboardCliente;