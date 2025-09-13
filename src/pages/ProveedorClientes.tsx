import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MessageCircle, Phone, Mail, Star, Calendar, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";

const ProveedorClientes = () => {
  const { user } = useAuth();

  const clients = [
    { 
      id: 1,
      name: "Ana García", 
      email: "ana.garcia@email.com",
      phone: "+34 666 777 888",
      totalEvents: 3,
      totalSpent: "$4,200",
      rating: 5,
      lastEvent: "Boda - 15 Jun 2024",
      status: "Activo",
      avatar: "AG"
    },
    { 
      id: 2,
      name: "Carlos Mendez", 
      email: "carlos.mendez@email.com",
      phone: "+34 699 888 777",
      totalEvents: 1,
      totalSpent: "$800",
      rating: 4,
      lastEvent: "Cumpleaños - 25 Jul 2024",
      status: "Pendiente",
      avatar: "CM"
    },
    { 
      id: 3,
      name: "Empresa XYZ", 
      email: "contacto@empresaxyz.com",
      phone: "+34 911 222 333",
      totalEvents: 5,
      totalSpent: "$8,500",
      rating: 5,
      lastEvent: "Conferencia - 30 Jul 2024",
      status: "Activo",
      avatar: "EX"
    },
    { 
      id: 4,
      name: "María López", 
      email: "maria.lopez@email.com",
      phone: "+34 655 444 333",
      totalEvents: 2,
      totalSpent: "$1,500",
      rating: 4,
      lastEvent: "Aniversario - 10 Jun 2024",
      status: "Activo",
      avatar: "ML"
    }
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
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Mis Clientes</h1>
                <p className="text-sm text-elegant-gray">Gestiona tu cartera de clientes</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Stats */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-elegant-gray w-4 h-4" />
              <Input 
                placeholder="Buscar clientes..." 
                className="pl-10"
              />
            </div>
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
              <Filter className="w-4 h-4 mr-2" />
              Filtrar Clientes
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="border-0 shadow-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-elegant-gray text-sm">Total Clientes</p>
                    <p className="text-2xl font-bold text-foreground">{clients.length}</p>
                  </div>
                  <Users className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-elegant-gray text-sm">Clientes Activos</p>
                    <p className="text-2xl font-bold text-foreground">{clients.filter(c => c.status === 'Activo').length}</p>
                  </div>
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-elegant-gray text-sm">Ingresos Totales</p>
                    <p className="text-2xl font-bold text-foreground">$14,000</p>
                  </div>
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">$</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-elegant-gray text-sm">Rating Promedio</p>
                    <p className="text-2xl font-bold text-foreground">4.5</p>
                  </div>
                  <Star className="w-8 h-8 text-yellow-500 fill-current" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Clients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map((client) => (
            <Card key={client.id} className="border-0 shadow-card hover:shadow-luxury transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">{client.avatar}</span>
                    </div>
                    <div>
                      <CardTitle className="text-lg">{client.name}</CardTitle>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-3 h-3 ${i < client.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                        <span className="text-xs text-elegant-gray ml-1">({client.rating})</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant={client.status === 'Activo' ? 'default' : 'secondary'}>
                    {client.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-elegant-gray">
                    <Mail className="w-4 h-4 mr-2" />
                    {client.email}
                  </div>
                  <div className="flex items-center text-sm text-elegant-gray">
                    <Phone className="w-4 h-4 mr-2" />
                    {client.phone}
                  </div>
                  <div className="flex items-center text-sm text-elegant-gray">
                    <Calendar className="w-4 h-4 mr-2" />
                    {client.lastEvent}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                  <div className="text-center">
                    <p className="text-lg font-bold text-foreground">{client.totalEvents}</p>
                    <p className="text-xs text-elegant-gray">Eventos</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-green-600">{client.totalSpent}</p>
                    <p className="text-xs text-elegant-gray">Total Gastado</p>
                  </div>
                </div>

                <div className="flex space-x-2 pt-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    Mensaje
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Phone className="w-4 h-4 mr-1" />
                    Llamar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProveedorClientes;