import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Star, MapPin, Clock, Heart, X } from "lucide-react";
import { useFavorites, Service } from "@/contexts/FavoritesContext";
import { useSearch } from "@/contexts/SearchContext";
import { useServiceFiltering } from "@/hooks/useServiceFiltering";
import ReservationModal from "./ReservationModal";
import { useToast } from "@/hooks/use-toast";

// Import service images
import animacionInfantilImg from "@/assets/animacion-infantil.jpg";
import decoracionInfantilImg from "@/assets/decoracion-infantil.jpg";
import cateringInfantilImg from "@/assets/catering-infantil.jpg";
import fotografiaInfantilImg from "@/assets/fotografia-infantil.jpg";
import fotografiaBodasImg from "@/assets/fotografia-bodas.jpg";
import cateringGourmetImg from "@/assets/catering-gourmet.jpg";
import bandaMusicalImg from "@/assets/banda-musical.jpg";
import coordinacionEventosImg from "@/assets/coordinacion-eventos.jpg";
import tecnologiaAvImg from "@/assets/tecnologia-av.jpg";
import cateringEjecutivoImg from "@/assets/catering-ejecutivo.jpg";
import produccionCorporativaImg from "@/assets/produccion-corporativa.jpg";
import personalApoyoImg from "@/assets/personal-apoyo.jpg";

const ServiceProviders = ({ eventType }: { eventType?: "infantiles" | "formales" | "corporativos" }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const { toggleFavorite, isFavorite } = useFavorites();
  const { toast } = useToast();
  
  const { 
    searchTerm, 
    setSearchTerm, 
    categoryFilter, 
    setCategoryFilter, 
    sortBy, 
    setSortBy, 
    showFeaturedOnly, 
    setShowFeaturedOnly,
    clearFilters 
  } = useSearch();

  const handleReservation = (service: Service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleToggleFavorite = (service: Service) => {
    toggleFavorite(service);
    const action = isFavorite(service.id) ? 'eliminado de' : 'agregado a';
    toast({
      title: `${action} favoritos`,
      description: `${service.title} ha sido ${action} tus favoritos.`,
    });
  };

  const services = {
    infantiles: [
      {
        id: "inf-001",
        title: "Animación Profesional Infantil",
        category: "Entretenimiento",
        description: "Shows interactivos con magos, payasos y personajes favoritos de los niños",
        location: "Ciudad de México",
        duration: "3 horas",
        price: "$45,000",
        rating: 4.9,
        featured: true,
        image: animacionInfantilImg
      },
      {
        id: "inf-002",
        title: "Decoración Temática Premium",
        category: "Decoración",
        description: "Decoración personalizada con temas de superhéroes, princesas y caricaturas",
        location: "Guadalajara",
        duration: "Evento completo",
        price: "$35,000",
        rating: 4.8,
        featured: false,
        image: decoracionInfantilImg
      },
      {
        id: "inf-003",
        title: "Catering Infantil Gourmet",
        category: "Catering",
        description: "Menús diseñados especialmente para niños con opciones saludables y divertidas",
        location: "Monterrey",
        duration: "4 horas",
        price: "$25,000",
        rating: 4.7,
        featured: true,
        image: cateringInfantilImg
      },
      {
        id: "inf-004",
        title: "Fotografía Infantil Artística",
        category: "Fotografía",
        description: "Sesiones fotográficas especializadas en capturar momentos mágicos infantiles",
        location: "Ciudad de México",
        duration: "6 horas",
        price: "$55,000",
        rating: 4.9,
        featured: false,
        image: fotografiaInfantilImg
      }
    ],
    formales: [
      {
        id: "for-001",
        title: "Fotografía de Bodas Elegante",
        category: "Fotografía",
        description: "Fotografía profesional para bodas con estilo artístico y moderno",
        location: "Ciudad de México",
        duration: "8 horas",
        price: "$85,000",
        rating: 5.0,
        featured: true,
        image: fotografiaBodasImg
      },
      {
        id: "for-002",
        title: "Catering Gourmet Premium",
        category: "Catering",
        description: "Servicio de catering con menús personalizados y presentación exquisita",
        location: "Guadalajara",
        duration: "Evento completo",
        price: "$45,000",
        rating: 4.8,
        featured: true,
        image: cateringGourmetImg
      },
      {
        id: "for-003",
        title: "Banda Musical en Vivo",
        category: "Música",
        description: "Banda versátil con repertorio amplio para todo tipo de celebraciones",
        location: "Monterrey",
        duration: "4 horas",
        price: "$35,000",
        rating: 4.7,
        featured: false,
        image: bandaMusicalImg
      },
      {
        id: "for-004",
        title: "Coordinación de Eventos Premium",
        category: "Coordinación",
        description: "Servicio completo de coordinación y organización de eventos formales",
        location: "Ciudad de México",
        duration: "Servicio completo",
        price: "$65,000",
        rating: 4.9,
        featured: true,
        image: coordinacionEventosImg
      }
    ],
    corporativos: [
      {
        id: "cor-001",
        title: "Tecnología AV Profesional",
        category: "Tecnología",
        description: "Equipos de audio, video y proyección de última generación para conferencias",
        location: "Ciudad de México",
        duration: "Evento completo",
        price: "$75,000",
        rating: 4.8,
        featured: true,
        image: tecnologiaAvImg
      },
      {
        id: "cor-002",
        title: "Catering Ejecutivo Premium",
        category: "Catering",
        description: "Servicio de catering especializado en eventos corporativos y networking",
        location: "Guadalajara",
        duration: "6 horas",
        price: "$55,000",
        rating: 4.7,
        featured: false,
        image: cateringEjecutivoImg
      },
      {
        id: "cor-003",
        title: "Producción de Eventos Corporativos",
        category: "Producción",
        description: "Producción integral para lanzamientos, conferencias y eventos empresariales",
        location: "Monterrey",
        duration: "Servicio completo",
        price: "$95,000",
        rating: 4.9,
        featured: true,
        image: produccionCorporativaImg
      },
      {
        id: "cor-004",
        title: "Hostess y Personal de Apoyo",
        category: "Personal",
        description: "Personal profesional capacitado para recepción y atención en eventos corporativos",
        location: "Ciudad de México",
        duration: "8 horas",
        price: "$25,000",
        rating: 4.6,
        featured: false,
        image: personalApoyoImg
      }
    ]
  };

  const allServices = eventType 
    ? services[eventType] 
    : [
        ...services.infantiles,
        ...services.formales,
        ...services.corporativos
      ];

  const { filteredServices, totalResults, hasActiveFilters } = useServiceFiltering(allServices);

  const categories = ['all', 'Entretenimiento', 'Decoración', 'Catering', 'Fotografía', 'Música', 'Coordinación', 'Tecnología', 'Producción', 'Personal'];
  const locations = ['all', 'Ciudad de México', 'Guadalajara', 'Monterrey'];

  return (
    <section className="py-20 bg-gradient-to-b from-champagne/10 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-champagne/30">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Encuentra el 
            <span className="bg-gradient-to-r from-rose to-gold bg-clip-text text-transparent ml-2">
              proveedor perfecto
            </span>
          </h2>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto font-medium">
            Filtra y encuentra exactamente lo que necesitas para tu evento
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-champagne/30 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-elegant-gray w-5 h-5" />
              <Input
                placeholder="Buscar servicios, proveedores, ubicaciones..."
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

            <Button 
              onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
              variant={showFeaturedOnly ? "default" : "outline"}
              className="rounded-full h-12 px-6 border-champagne/60 bg-white hover:border-rose/50 hover:bg-rose/5 shadow-sm font-medium transition-all duration-200"
            >
              <Star className="w-4 h-4 mr-2" />
              Destacados
            </Button>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-elegant-gray font-semibold bg-champagne/20 px-4 py-2 rounded-full">
              {totalResults} servicios encontrados
            </span>
            
            {hasActiveFilters && (
              <Button 
                onClick={clearFilters}
                variant="outline" 
                size="sm"
                className="text-rose border-rose/50 hover:bg-rose/5"
              >
                <X className="w-4 h-4 mr-2" />
                Limpiar Filtros
              </Button>
            )}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredServices.map((service, index) => (
            <Card key={service.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white backdrop-blur-sm">
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
                    onClick={() => handleToggleFavorite(service)}
                    className={`p-2 h-8 w-8 transition-all duration-200 ${
                      isFavorite(service.id) 
                        ? 'bg-red-500/90 border-red-500 text-white hover:bg-red-600' 
                        : 'bg-white/90 border-white/30 text-gray-600 hover:bg-white hover:text-red-500'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isFavorite(service.id) ? 'fill-current' : ''}`} />
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
                    <span className="text-xs text-foreground/60 font-medium">reseñas</span>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-foreground">{service.price}</div>
                    <div className="text-xs text-foreground/60 font-medium">64 reseñas</div>
                  </div>
                </div>
                
                <Button 
                  onClick={() => handleReservation(service)}
                  className="w-full bg-gradient-to-r from-rose to-gold hover:from-rose/90 hover:to-gold/90 text-white font-semibold rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Reservar Ahora
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              No se encontraron servicios
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

      <ReservationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        service={selectedService}
      />
    </section>
  );
};

export default ServiceProviders;