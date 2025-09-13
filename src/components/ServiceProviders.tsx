import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Star, MapPin, Clock } from "lucide-react";
import ReservationModal from "./ReservationModal";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);

  const handleReservation = (service: any) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const services = {
    infantiles: [
      {
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

  const serviceCount = allServices.length;

  return (
    <section className="py-20 bg-gradient-to-b from-champagne/10 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Encuentra el 
            <span className="bg-gradient-to-r from-rose to-gold bg-clip-text text-transparent ml-2">
              proveedor perfecto
            </span>
          </h2>
          <p className="text-xl text-elegant-gray max-w-3xl mx-auto">
            Filtra y encuentra exactamente lo que necesitas para tu evento
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-card mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-elegant-gray w-5 h-5" />
              <Input
                placeholder="Buscar servicios, proveedores, ubicaciones..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-border/50 focus:border-rose rounded-full h-12"
              />
            </div>
            <Select>
              <SelectTrigger className="w-full md:w-48 rounded-full h-12 border-border/50">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Todas las categorías" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las categorías</SelectItem>
                <SelectItem value="catering">Catering</SelectItem>
                <SelectItem value="fotografia">Fotografía</SelectItem>
                <SelectItem value="musica">Música</SelectItem>
                <SelectItem value="decoracion">Decoración</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="rounded-full h-12 px-6 border-border/50 hover:border-rose/50">
              Destacados
            </Button>
          </div>
          
          <div className="mt-4 text-center">
            <span className="text-elegant-gray font-medium">{serviceCount} servicios encontrados</span>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allServices.map((service, index) => (
            <Card key={index} className="group overflow-hidden border-0 shadow-card hover:shadow-luxury transition-all duration-300 hover:scale-105 bg-white/90 backdrop-blur-sm">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                {service.featured && (
                  <Badge className="absolute top-3 left-3 bg-gradient-to-r from-rose to-gold text-white border-0">
                    Destacado
                  </Badge>
                )}
                <div className="absolute bottom-3 left-3 right-3">
                  <Badge variant="secondary" className="bg-white/90 text-foreground text-xs">
                    {service.category}
                  </Badge>
                </div>
              </div>
              
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold text-foreground group-hover:text-rose transition-colors duration-300 line-clamp-2">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-elegant-gray text-sm line-clamp-2">
                  {service.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <div className="flex items-center gap-4 text-xs text-elegant-gray">
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
                    <span className="text-sm font-medium">{service.rating}</span>
                    <span className="text-xs text-elegant-gray">reseñas</span>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-foreground">{service.price}</div>
                    <div className="text-xs text-elegant-gray">64 reseñas</div>
                  </div>
                </div>
                
                <Button 
                  onClick={() => handleReservation(service)}
                  className="w-full bg-gradient-to-r from-rose to-gold hover:from-rose/90 hover:to-gold/90 text-white font-medium rounded-full transition-all duration-300"
                >
                  Reservar Ahora
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
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