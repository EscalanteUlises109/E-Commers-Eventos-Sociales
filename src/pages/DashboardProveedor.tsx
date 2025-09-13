import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Users, Calendar, TrendingUp, LogOut, Briefcase, Star, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";

const DashboardProveedor = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const stats = [
    { label: "Ingresos del Mes", value: "$15,240", icon: DollarSign, color: "from-green-400 to-green-600" },
    { label: "Clientes Activos", value: "28", icon: Users, color: "from-blue-400 to-blue-600" },
    { label: "Eventos Programados", value: "12", icon: Calendar, color: "from-purple-400 to-purple-600" },
    { label: "Rating Promedio", value: "4.8", icon: Star, color: "from-yellow-400 to-orange-500" },
  ];

  const recentBookings = [
    { client: "Ana García", event: "Boda", date: "20 Jul 2024", status: "Confirmado", amount: "$2,500" },
    { client: "Carlos Mendez", event: "Cumpleaños", date: "25 Jul 2024", status: "Pendiente", amount: "$800" },
    { client: "Empresa XYZ", event: "Conferencia", date: "30 Jul 2024", status: "Cotizando", amount: "$1,200" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Navigation />
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-lg border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">¡Hola, {user?.name}!</h1>
                <p className="text-sm text-elegant-gray">Panel de Proveedor</p>
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
          {/* Recent Bookings */}
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                Reservas Recientes
              </CardTitle>
              <CardDescription>
                Últimas solicitudes de servicios
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentBookings.map((booking, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-foreground">{booking.client}</h4>
                    <p className="text-sm text-elegant-gray">{booking.event} - {booking.date}</p>
                    <p className="text-sm font-medium text-green-600">{booking.amount}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    booking.status === 'Confirmado' ? 'bg-green-100 text-green-800' :
                    booking.status === 'Pendiente' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {booking.status}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Business Tools */}
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-purple-600" />
                Herramientas de Negocio
              </CardTitle>
              <CardDescription>
                Gestiona tu perfil y servicios
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white justify-start">
                <DollarSign className="w-4 h-4 mr-2" />
                Gestionar Precios
              </Button>
              <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white justify-start">
                <Calendar className="w-4 h-4 mr-2" />
                Calendario de Disponibilidad
              </Button>
              <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white justify-start">
                <Star className="w-4 h-4 mr-2" />
                Ver Reseñas
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <MessageCircle className="w-4 h-4 mr-2" />
                Mensajes de Clientes
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Performance Chart Placeholder */}
        <Card className="mt-8 border-0 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-purple-600" />
              Rendimiento del Negocio
            </CardTitle>
            <CardDescription>
              Estadísticas de los últimos 6 meses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
              <p className="text-elegant-gray text-lg">Gráfico de rendimiento (próximamente)</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default DashboardProveedor;