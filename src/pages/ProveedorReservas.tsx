import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, MapPin, User, DollarSign, Filter, Search, CheckCircle, AlertCircle, Clock3 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";

const ProveedorReservas = () => {
  const { user } = useAuth();

  const reservations = [
    {
      id: 1,
      client: "Ana García",
      event: "Boda",
      date: "2024-07-20",
      time: "16:00",
      location: "Hotel Majestic, Madrid",
      status: "Confirmado",
      amount: "$2,500",
      services: ["Fotografía", "Decoración", "Catering"],
      notes: "Ceremonia al aire libre, necesita equipo adicional para clima",
      avatar: "AG"
    },
    {
      id: 2,
      client: "Carlos Mendez",
      event: "Cumpleaños",
      date: "2024-07-25",
      time: "18:30",
      location: "Salón de Eventos Paradise",
      status: "Pendiente",
      amount: "$800",
      services: ["Animación", "Decoración"],
      notes: "Fiesta infantil, tema superhéroes",
      avatar: "CM"
    },
    {
      id: 3,
      client: "Empresa XYZ",
      event: "Conferencia Corporativa",
      date: "2024-07-30",
      time: "09:00",
      location: "Centro de Convenciones IFEMA",
      status: "Cotizando",
      amount: "$1,200",
      services: ["Tecnología AV", "Catering"],
      notes: "200 asistentes, necesita sistema de sonido profesional",
      avatar: "EX"
    },
    {
      id: 4,
      client: "María López",
      event: "Aniversario",
      date: "2024-08-05",
      time: "20:00",
      location: "Restaurante La Terraza",
      status: "Confirmado",
      amount: "$650",
      services: ["Fotografía", "Música"],
      notes: "Celebración íntima, 25 personas",
      avatar: "ML"
    },
    {
      id: 5,
      client: "Pedro Ruiz",
      event: "Graduación",
      date: "2024-08-12",
      time: "12:00",
      location: "Jardín Botánico",
      status: "Completado",
      amount: "$950",
      services: ["Fotografía", "Catering", "Decoración"],
      notes: "Evento completado satisfactoriamente",
      avatar: "PR"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Confirmado':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'Pendiente':
        return <Clock3 className="w-4 h-4 text-yellow-600" />;
      case 'Cotizando':
        return <AlertCircle className="w-4 h-4 text-blue-600" />;
      case 'Completado':
        return <CheckCircle className="w-4 h-4 text-gray-600" />;
      default:
        return <Clock3 className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmado':
        return 'bg-green-100 text-green-800';
      case 'Pendiente':
        return 'bg-yellow-100 text-yellow-800';
      case 'Cotizando':
        return 'bg-blue-100 text-blue-800';
      case 'Completado':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filterReservationsByStatus = (status: string) => {
    if (status === 'all') return reservations;
    return reservations.filter(reservation => reservation.status.toLowerCase() === status.toLowerCase());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Navigation />
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-lg border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Mis Reservas</h1>
                <p className="text-sm text-elegant-gray">Gestiona tus eventos y reservas</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-elegant-gray w-4 h-4" />
              <Input 
                placeholder="Buscar reservas..." 
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filtros
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="border-0 shadow-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-elegant-gray text-sm">Total Reservas</p>
                    <p className="text-2xl font-bold text-foreground">{reservations.length}</p>
                  </div>
                  <Calendar className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-elegant-gray text-sm">Confirmadas</p>
                    <p className="text-2xl font-bold text-foreground">{filterReservationsByStatus('confirmado').length}</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-elegant-gray text-sm">Pendientes</p>
                    <p className="text-2xl font-bold text-foreground">{filterReservationsByStatus('pendiente').length}</p>
                  </div>
                  <Clock3 className="w-8 h-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-elegant-gray text-sm">Ingresos del Mes</p>
                    <p className="text-2xl font-bold text-foreground">$5,100</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Reservations Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="all">Todas</TabsTrigger>
            <TabsTrigger value="confirmado">Confirmadas</TabsTrigger>
            <TabsTrigger value="pendiente">Pendientes</TabsTrigger>
            <TabsTrigger value="cotizando">Cotizando</TabsTrigger>
            <TabsTrigger value="completado">Completadas</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="space-y-4">
              {reservations.map((reservation) => (
                <Card key={reservation.id} className="border-0 shadow-card hover:shadow-luxury transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                      {/* Client and Event Info */}
                      <div className="lg:col-span-2">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold text-sm">{reservation.avatar}</span>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-foreground">{reservation.event}</h3>
                            <p className="text-elegant-gray flex items-center">
                              <User className="w-4 h-4 mr-1" />
                              {reservation.client}
                            </p>
                          </div>
                        </div>
                        <div className="space-y-2 text-sm text-elegant-gray">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            {new Date(reservation.date).toLocaleDateString('es-ES', { 
                              weekday: 'long', 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2" />
                            {reservation.time}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2" />
                            {reservation.location}
                          </div>
                        </div>
                      </div>

                      {/* Services and Status */}
                      <div>
                        <div className="mb-4">
                          <h4 className="font-medium text-foreground mb-2">Servicios</h4>
                          <div className="flex flex-wrap gap-1">
                            {reservation.services.map((service, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {service}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            {getStatusIcon(reservation.status)}
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(reservation.status)}`}>
                              {reservation.status}
                            </span>
                          </div>
                          <p className="text-2xl font-bold text-green-600">{reservation.amount}</p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col space-y-2">
                        <Button size="sm" className="w-full">
                          Ver Detalles
                        </Button>
                        {reservation.status === 'Pendiente' && (
                          <Button size="sm" variant="outline" className="w-full">
                            Confirmar
                          </Button>
                        )}
                        {reservation.status === 'Cotizando' && (
                          <Button size="sm" variant="outline" className="w-full">
                            Enviar Cotización
                          </Button>
                        )}
                        <Button size="sm" variant="ghost" className="w-full">
                          Contactar Cliente
                        </Button>
                      </div>
                    </div>

                    {/* Notes */}
                    {reservation.notes && (
                      <div className="mt-4 pt-4 border-t">
                        <p className="text-sm text-elegant-gray">
                          <strong>Notas:</strong> {reservation.notes}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {['confirmado', 'pendiente', 'cotizando', 'completado'].map(status => (
            <TabsContent key={status} value={status}>
              <div className="space-y-4">
                {filterReservationsByStatus(status).map((reservation) => (
                  <Card key={reservation.id} className="border-0 shadow-card hover:shadow-luxury transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* Same structure as above */}
                        <div className="lg:col-span-2">
                          <div className="flex items-center space-x-3 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                              <span className="text-white font-semibold text-sm">{reservation.avatar}</span>
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-foreground">{reservation.event}</h3>
                              <p className="text-elegant-gray flex items-center">
                                <User className="w-4 h-4 mr-1" />
                                {reservation.client}
                              </p>
                            </div>
                          </div>
                          <div className="space-y-2 text-sm text-elegant-gray">
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-2" />
                              {new Date(reservation.date).toLocaleDateString('es-ES', { 
                                weekday: 'long', 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-2" />
                              {reservation.time}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-2" />
                              {reservation.location}
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className="mb-4">
                            <h4 className="font-medium text-foreground mb-2">Servicios</h4>
                            <div className="flex flex-wrap gap-1">
                              {reservation.services.map((service, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {service}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center space-x-2 mb-2">
                              {getStatusIcon(reservation.status)}
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(reservation.status)}`}>
                                {reservation.status}
                              </span>
                            </div>
                            <p className="text-2xl font-bold text-green-600">{reservation.amount}</p>
                          </div>
                        </div>

                        <div className="flex flex-col space-y-2">
                          <Button size="sm" className="w-full">
                            Ver Detalles
                          </Button>
                          {reservation.status === 'Pendiente' && (
                            <Button size="sm" variant="outline" className="w-full">
                              Confirmar
                            </Button>
                          )}
                          {reservation.status === 'Cotizando' && (
                            <Button size="sm" variant="outline" className="w-full">
                              Enviar Cotización
                            </Button>
                          )}
                          <Button size="sm" variant="ghost" className="w-full">
                            Contactar Cliente
                          </Button>
                        </div>
                      </div>

                      {reservation.notes && (
                        <div className="mt-4 pt-4 border-t">
                          <p className="text-sm text-elegant-gray">
                            <strong>Notas:</strong> {reservation.notes}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  );
};

export default ProveedorReservas;