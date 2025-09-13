import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MessageCircle, Star, Clock, LogOut, User, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";

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
      <Navigation />
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
          <Card className="border-0 shadow-luxury bg-gradient-to-br from-white to-rose-50/30 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-rose to-gold rounded-xl flex items-center justify-center shadow-md">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-rose to-gold bg-clip-text text-transparent">
                      Mis Eventos
                    </h2>
                    <p className="text-sm text-elegant-gray mt-1">Tu próxima celebración</p>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="bg-white/80 text-rose border-rose/30 hover:bg-rose/5 hover:border-rose/50 shadow-sm backdrop-blur-sm"
                >
                  Ver Todos
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              {recentEvents.map((event, index) => (
                <div key={index} className="group relative">
                  {/* Event Card */}
                  <div className="relative overflow-hidden bg-white/80 backdrop-blur-md rounded-2xl border border-white/20 shadow-card hover:shadow-luxury transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1">
                    {/* Gradient Background Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-rose-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative p-6 space-y-4">
                      {/* Event Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-rose/10 to-gold/10 rounded-full flex items-center justify-center border border-rose/20">
                              <Calendar className="w-6 h-6 text-rose" />
                            </div>
                            <div>
                              <h4 className="text-xl font-bold text-foreground mb-1">{event.name}</h4>
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-elegant-gray" />
                                <span className="text-elegant-gray text-sm">{event.date}</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Status Badge */}
                          <div className="flex items-center gap-2">
                            <span className={`px-4 py-2 rounded-full text-sm font-semibold shadow-sm ${
                              event.status === 'Confirmado' ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white' :
                              event.status === 'Planificando' ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white' :
                              'bg-gradient-to-r from-blue-400 to-indigo-500 text-white'
                            }`}>
                              {event.status}
                            </span>
                          </div>
                        </div>
                        
                        {/* Action Button */}
                        <div className="ml-6">
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-rose to-gold hover:from-rose/90 hover:to-gold/90 text-white shadow-md opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300"
                          >
                            Gestionar
                          </Button>
                        </div>
                      </div>
                      
                      {/* Progress Section */}
                      <div className="bg-gradient-to-r from-gray-50/80 to-white/80 rounded-xl p-4 space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-semibold text-foreground">Progreso del evento</span>
                          <span className="text-lg font-bold bg-gradient-to-r from-rose to-gold bg-clip-text text-transparent">
                            {event.progress}%
                          </span>
                        </div>
                        <div className="relative w-full bg-gray-200/80 rounded-full h-4 overflow-hidden shadow-inner">
                          <div 
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-rose via-pink-400 to-gold rounded-full transition-all duration-700 ease-out shadow-sm" 
                            style={{ width: `${event.progress}%` }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse opacity-50" />
                        </div>
                        <div className="flex justify-between text-xs text-elegant-gray font-medium">
                          <span>🎯 Iniciado</span>
                          <span>🎉 Completo</span>
                        </div>
                      </div>
                      
                      {/* Event Stats */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100/50">
                        <div className="flex items-center gap-6">
                          <div className="flex items-center gap-2 text-sm text-elegant-gray">
                            <div className="w-3 h-3 bg-gradient-to-r from-rose to-pink-400 rounded-full shadow-sm"></div>
                            <span className="font-medium">5 proveedores</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-elegant-gray">
                            <div className="w-3 h-3 bg-gradient-to-r from-gold to-yellow-400 rounded-full shadow-sm"></div>
                            <span className="font-medium">3 pendientes</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="ghost" className="h-10 w-10 p-0 text-elegant-gray hover:text-rose hover:bg-rose/5 rounded-full transition-all duration-200">
                            <MessageCircle className="w-5 h-5" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-10 w-10 p-0 text-elegant-gray hover:text-gold hover:bg-gold/5 rounded-full transition-all duration-200">
                            <Star className="w-5 h-5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Add New Event Button */}
              <div className="pt-6">
                <Button className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 hover:from-blue-600 hover:via-purple-600 hover:to-indigo-700 text-white border-2 border-dashed border-white/30 hover:border-white/50 rounded-2xl py-8 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <span className="text-lg font-semibold">Planear Nuevo Evento</span>
                  </div>
                </Button>
              </div>
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