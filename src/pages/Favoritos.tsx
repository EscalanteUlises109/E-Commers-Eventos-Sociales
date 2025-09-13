import { useFavorites } from "@/contexts/FavoritesContext";
import { useSearch } from "@/contexts/SearchContext";
import { useServiceFiltering } from "@/hooks/useServiceFiltering";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Heart, Search, Filter, Star, MapPin, Clock, Trash2, ShoppingCart } from "lucide-react";
import { useState } from "react";
import ReservationModal from "@/components/ReservationModal";

const Favoritos = () => {
  const { favorites, removeFromFavorites, clearFavorites } = useFavorites();
  const { searchTerm, setSearchTerm, categoryFilter, setCategoryFilter, sortBy, setSortBy, clearFilters } = useSearch();
  const { filteredServices, totalResults, hasActiveFilters } = useServiceFiltering(favorites);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);

  const handleReservation = (service: any) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const categories = ['all', 'Entretenimiento', 'Decoración', 'Catering', 'Fotografía', 'Música', 'Coordinación', 'Tecnología', 'Producción', 'Personal'];
  const locations = ['all', 'Ciudad de México', 'Guadalajara', 'Monterrey'];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-rose-500 to-gold py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Heart className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Mis Favoritos
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Todos los servicios que te han gustado, organizados en un solo lugar
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center gap-2 text-white/90">
                <Heart className="w-5 h-5 fill-white text-white" />
                <span className="font-medium">{favorites.length} servicios guardados</span>
              </div>
              {favorites.length > 0 && (
                <Button 
                  onClick={clearFavorites}
                  variant="outline" 
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Limpiar Todo
                </Button>
              )}
            </div>
          </div>
        </section>

        {favorites.length === 0 ? (
          // Empty State
          <section className="py-20">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-12 h-12 text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                No tienes favoritos aún
              </h2>
              <p className="text-elegant-gray mb-8">
                Explora nuestros servicios y marca los que más te gusten con el corazón ❤️
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="bg-gradient-to-r from-rose to-gold hover:from-rose/90 hover:to-gold/90">
                  <a href="/eventos-infantiles">Ver Eventos Infantiles</a>
                </Button>
                <Button asChild variant="outline">
                  <a href="/eventos-formales">Ver Eventos Formales</a>
                </Button>
              </div>
            </div>
          </section>
        ) : (
          <section className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Search and Filters */}
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-champagne/30 mb-8">
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-elegant-gray w-5 h-5" />
                    <Input
                      placeholder="Buscar en tus favoritos..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 border-champagne/60 focus:border-rose focus:ring-2 focus:ring-rose/20 rounded-full h-12 bg-white shadow-sm font-medium"
                    />
                  </div>
                  
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-full md:w-48 rounded-full h-12 border-champagne/60 bg-white shadow-sm font-medium hover:border-rose/50 transition-colors">
                      <Filter className="w-4 h-4 mr-2 text-elegant-gray" />
                      <SelectValue placeholder="Categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category === 'all' ? 'Todas las categorías' : category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={sortBy} onValueChange={(value) => setSortBy(value as any)}>
                    <SelectTrigger className="w-full md:w-48 rounded-full h-12 border-champagne/60 bg-white shadow-sm font-medium hover:border-rose/50 transition-colors">
                      <SelectValue placeholder="Ordenar por" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Destacados</SelectItem>
                      <SelectItem value="rating">Mejor Rating</SelectItem>
                      <SelectItem value="price-low">Precio: Menor a Mayor</SelectItem>
                      <SelectItem value="price-high">Precio: Mayor a Menor</SelectItem>
                      <SelectItem value="name">Nombre A-Z</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-elegant-gray font-semibold bg-champagne/20 px-4 py-2 rounded-full">
                    {totalResults} de {favorites.length} servicios
                  </span>
                  
                  {hasActiveFilters && (
                    <Button 
                      onClick={clearFilters}
                      variant="outline" 
                      size="sm"
                      className="text-rose border-rose/50 hover:bg-rose/5"
                    >
                      Limpiar Filtros
                    </Button>
                  )}
                </div>
              </div>

              {/* Services Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredServices.map((service, index) => (
                  <Card key={service.id || index} className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white backdrop-blur-sm">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={service.image} 
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      
                      <div className="absolute top-3 left-3 right-3 flex justify-between">
                        <Badge variant="secondary" className="bg-white/95 text-foreground text-xs font-semibold shadow-sm">
                          {service.category}
                        </Badge>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => removeFromFavorites(service.id)}
                          className="bg-red-500/90 border-red-500 text-white hover:bg-red-600 p-2 h-8 w-8"
                        >
                          <Heart className="w-4 h-4 fill-current" />
                        </Button>
                      </div>

                      {service.featured && (
                        <Badge className="absolute bottom-3 left-3 bg-gradient-to-r from-rose to-gold text-white border-0 shadow-md">
                          Destacado
                        </Badge>
                      )}
                    </div>
                    
                    <CardHeader className="pb-2 bg-white/95">
                      <CardTitle className="text-lg font-bold text-foreground group-hover:text-rose transition-colors duration-300 line-clamp-2">
                        {service.title}
                      </CardTitle>
                      <CardDescription className="text-foreground/70 text-sm line-clamp-2 font-medium">
                        {service.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-3 bg-white/95">
                      <div className="flex items-center gap-4 text-xs text-foreground/70 font-medium">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {service.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {service.duration}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-bold text-foreground">{service.rating}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-foreground">{service.price}</div>
                        </div>
                      </div>
                      
                      <Button 
                        onClick={() => handleReservation(service)}
                        className="w-full bg-gradient-to-r from-rose to-gold hover:from-rose/90 hover:to-gold/90 text-white font-semibold rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Reservar Ahora
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredServices.length === 0 && favorites.length > 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    No se encontraron resultados
                  </h3>
                  <p className="text-elegant-gray mb-4">
                    Intenta ajustar tus filtros de búsqueda
                  </p>
                  <Button onClick={clearFilters} variant="outline">
                    Limpiar Filtros
                  </Button>
                </div>
              )}
            </div>
          </section>
        )}
      </main>

      <Footer />

      <ReservationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        service={selectedService}
      />
    </div>
  );
};

export default Favoritos;