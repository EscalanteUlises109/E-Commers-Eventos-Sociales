import React, { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
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

export type EventCategory = 'infantiles' | 'formales' | 'corporativos';

export interface EventItem {
  id: string;
  title: string;
  category: string; // e.g., Catering, Fotografía
  description: string;
  location: string;
  duration: string;
  price: string; // Keep as formatted string for current UI consistency
  rating: number;
  featured: boolean;
  image: string; // URL or imported asset
  eventType: EventCategory; // High-level event classification
  capacity?: number;
  images?: string[]; // Additional image URLs
  createdAt: string;
}

interface EventsContextType {
  events: EventItem[];
  addEvent: (data: Omit<EventItem, 'id' | 'rating' | 'featured' | 'createdAt'> & { rating?: number; featured?: boolean }) => EventItem;
  getEventsByType: (type: EventCategory) => EventItem[];
}

const EventsContext = createContext<EventsContextType | undefined>(undefined);

const STORAGE_KEY = 'app-events-v1';

// Lista canonical de categorías soportadas (coincidir con filtros y formulario)
export const EVENT_CATEGORIES = [
  'Entretenimiento',
  'Decoración',
  'Catering',
  'Fotografía',
  'Música',
  'Coordinación',
  'Tecnología',
  'Producción',
  'Personal',
  'Animación',
  'Renta de espacio'
] as const;

const initialEvents: EventItem[] = [
  // Infantiles
  { id: 'inf-001', title: 'Animación Profesional Infantil', category: 'Entretenimiento', description: 'Shows interactivos con magos, payasos y personajes favoritos de los niños', location: 'Ciudad de México', duration: '3 horas', price: '$45,000', rating: 4.9, featured: true, image: animacionInfantilImg, eventType: 'infantiles', createdAt: new Date().toISOString(), capacity: 30 },
  { id: 'inf-002', title: 'Decoración Temática Premium', category: 'Decoración', description: 'Decoración personalizada con temas de superhéroes, princesas y caricaturas', location: 'Guadalajara', duration: 'Evento completo', price: '$35,000', rating: 4.8, featured: false, image: decoracionInfantilImg, eventType: 'infantiles', createdAt: new Date().toISOString(), capacity: 15 },
  { id: 'inf-003', title: 'Catering Infantil Gourmet', category: 'Catering', description: 'Menús diseñados especialmente para niños con opciones saludables y divertidas', location: 'Monterrey', duration: '4 horas', price: '$25,000', rating: 4.7, featured: true, image: cateringInfantilImg, eventType: 'infantiles', createdAt: new Date().toISOString(), capacity: 50 },
  { id: 'inf-004', title: 'Fotografía Infantil Artística', category: 'Fotografía', description: 'Sesiones fotográficas especializadas en capturar momentos mágicos infantiles', location: 'Ciudad de México', duration: '6 horas', price: '$55,000', rating: 4.9, featured: false, image: fotografiaInfantilImg, eventType: 'infantiles', createdAt: new Date().toISOString(), capacity: 10 },
  // Formales
  { id: 'for-001', title: 'Fotografía de Bodas Elegante', category: 'Fotografía', description: 'Fotografía profesional para bodas con estilo artístico y moderno', location: 'Ciudad de México', duration: '8 horas', price: '$85,000', rating: 5.0, featured: true, image: fotografiaBodasImg, eventType: 'formales', createdAt: new Date().toISOString(), capacity: 8 },
  { id: 'for-002', title: 'Catering Gourmet Premium', category: 'Catering', description: 'Servicio de catering con menús personalizados y presentación exquisita', location: 'Guadalajara', duration: 'Evento completo', price: '$45,000', rating: 4.8, featured: true, image: cateringGourmetImg, eventType: 'formales', createdAt: new Date().toISOString(), capacity: 40 },
  { id: 'for-003', title: 'Banda Musical en Vivo', category: 'Música', description: 'Banda versátil con repertorio amplio para todo tipo de celebraciones', location: 'Monterrey', duration: '4 horas', price: '$35,000', rating: 4.7, featured: false, image: bandaMusicalImg, eventType: 'formales', createdAt: new Date().toISOString(), capacity: 12 },
  { id: 'for-004', title: 'Coordinación de Eventos Premium', category: 'Coordinación', description: 'Servicio completo de coordinación y organización de eventos formales', location: 'Ciudad de México', duration: 'Servicio completo', price: '$65,000', rating: 4.9, featured: true, image: coordinacionEventosImg, eventType: 'formales', createdAt: new Date().toISOString(), capacity: 5 },
  // Corporativos
  { id: 'cor-001', title: 'Tecnología AV Profesional', category: 'Tecnología', description: 'Equipos de audio, video y proyección de última generación para conferencias', location: 'Ciudad de México', duration: 'Evento completo', price: '$75,000', rating: 4.8, featured: true, image: tecnologiaAvImg, eventType: 'corporativos', createdAt: new Date().toISOString(), capacity: 25 },
  { id: 'cor-002', title: 'Catering Ejecutivo Premium', category: 'Catering', description: 'Servicio de catering especializado en eventos corporativos y networking', location: 'Guadalajara', duration: '6 horas', price: '$55,000', rating: 4.7, featured: false, image: cateringEjecutivoImg, eventType: 'corporativos', createdAt: new Date().toISOString(), capacity: 60 },
  { id: 'cor-003', title: 'Producción de Eventos Corporativos', category: 'Producción', description: 'Producción integral para lanzamientos, conferencias y eventos empresariales', location: 'Monterrey', duration: 'Servicio completo', price: '$95,000', rating: 4.9, featured: true, image: produccionCorporativaImg, eventType: 'corporativos', createdAt: new Date().toISOString(), capacity: 18 },
  { id: 'cor-004', title: 'Hostess y Personal de Apoyo', category: 'Personal', description: 'Personal profesional capacitado para recepción y atención en eventos corporativos', location: 'Ciudad de México', duration: '8 horas', price: '$25,000', rating: 4.6, featured: false, image: personalApoyoImg, eventType: 'corporativos', createdAt: new Date().toISOString(), capacity: 35 },
];

// --- Seeding helpers --- //
interface SeedConfig {
  minPerCategory: number;
}

const SEED_CONFIG: SeedConfig = { minPerCategory: 5 };

const TITLE_TEMPLATES: Record<EventCategory, Record<string, string[]>> = {
  infantiles: {
    Entretenimiento: ['Show Interactivo Infantil', 'Espectáculo Temático Kids', 'Show de Magia Infantil', 'Mini Teatro Infantil', 'Show Personajes Especiales'],
    Decoración: ['Decoración Candy Bar', 'Decoración Temática Fantasía', 'Backdrops Infantiles Premium', 'Montaje Globos Creativo', 'Ambientación de Personajes'],
    Catering: ['Snacks Saludables Kids', 'Mesa de Dulces Premium', 'Catering Temático Infantil', 'Mini Gourmet Kids', 'Lunch Box Personalizado'],
    Fotografía: ['Sesión Fotográfica Infantil', 'Cobertura Fiesta Infantil', 'Fotocabina Temática', 'Álbum Recuerdo Infantil', 'Reportaje Digital Kids'],
    Música: ['DJ Infantil Dinámico', 'Música en Vivo Kids Band', 'Ambientación Musical Infantil', 'Show Musical Temático', 'Kids Karaoke Experience'],
    Coordinación: ['Coordinación Fiesta Infantil', 'Planeación Integral Kids', 'Asistente de Fiesta', 'Gestión de Proveedores Kids', 'Supervisión Día del Evento'],
    Tecnología: ['Pantalla Animaciones Kids', 'Proyección Temática', 'Luces RGB Infantiles', 'Cabina Selfies Interactiva', 'Set Streaming Fiesta'],
    Producción: ['Producción Mini Escenario', 'Producción Show Temático', 'Montaje Integral Infantil', 'Producción Multimedia Kids', 'Soporte Técnico Fiesta'],
    Personal: ['Animadores Profesionales', 'Staff de Apoyo Infantil', 'Recepcionistas Temáticos', 'Asistentes de Juego', 'Staff Supervisión Seguridad'],
    Animación: ['Animación Payasos Premium', 'Animación Personajes Disney', 'Animación Superhéroes', 'Animación Princesas', 'Animación Interactiva Digital'],
    'Renta de espacio': ['Renta Jardín Infantil', 'Renta Salón Temático', 'Renta Terraza Kids', 'Renta Ludoteca Premium', 'Renta Área Juegos']
  },
  formales: {
    Entretenimiento: ['Cuarteto de Cuerdas', 'Espectáculo de Danza Elegante', 'Performance Lumínico', 'Show Tenores', 'Show Sorpresa Formal'],
    Decoración: ['Decoración Floral Premium', 'Ambientación Elegante', 'Centro de Mesa de Lujo', 'Iluminación Arquitectónica', 'Scenografía Formal'],
    Catering: ['Banquete Gourmet', 'Catering Fusión Moderna', 'Mesa de Postres de Autor', 'Coctelería de Firma', 'Estación de Quesos y Vinos'],
    Fotografía: ['Cobertura Boda Completa', 'Sesión Save The Date', 'Álbum Fine Art', 'Video Cinematográfico', 'Cobertura Getting Ready'],
    Música: ['DJ Premium Eventos', 'Orquesta Versátil', 'Trío de Jazz Lounge', 'Sax en Vivo Recepción', 'Ensamble Musical Ceremonia'],
    Coordinación: ['Coordinación Día del Evento', 'Wedding Planner Integral', 'Coordinación Proveedores', 'Gestión Cronograma Formal', 'Asistencia Backstage'],
    Tecnología: ['Iluminación Inteligente', 'Sonorización Premium', 'Pantallas LED Ceremonia', 'Proyección Mapping', 'Cabina Fotomoments'],
    Producción: ['Producción Técnica Integral', 'Producción Escénica', 'Montaje y Rigging', 'Stage Management', 'Operación Técnica Evento'],
    Personal: ['Hostess Recepción', 'Staff Etiqueta', 'Seguridad Privada', 'Capataces de Montaje', 'Asistentes VIP'],
    Animación: ['Performance Coreográfico', 'Performance Aerial', 'Performance Laser', 'Flashmob Coordinado', 'Performance Clásico'],
    'Renta de espacio': ['Renta Hacienda Boutique', 'Renta Salón Panorámico', 'Renta Terraza Elegante', 'Renta Jardín Formal', 'Renta Salón Histórico']
  },
  corporativos: {
    Entretenimiento: ['Show Interactivo Corporativo', 'Presentación Motivacional', 'Acto Innovación', 'Performance Branding', 'Show Bienvenida'],
    Decoración: ['Ambientación Corporativa', 'Branding Escenario', 'Backwall Personalizado', 'Stands Modulares', 'Señalética Premium'],
    Catering: ['Coffee Break Ejecutivo', 'Catering Networking', 'Estación Healthy Corporate', 'Box Lunch Premium', 'Coctel de Bienvenida'],
    Fotografía: ['Cobertura Conferencia', 'Headshots Profesionales', 'Cobertura Networking', 'Fotografía Producto Demo', 'Cobertura Panel Directivo'],
    Música: ['DJ Corporativo', 'Música Ambiental Lounge', 'Audio Branding', 'Cuarteto Moderno', 'Playlist Curada Evento'],
    Coordinación: ['Gestión Logística Full', 'Coordinación Agenda', 'Relación Proveedores', 'On-site Management', 'Control de Registro'],
    Tecnología: ['Pantallas LED Gigantes', 'Streaming Multiplataforma', 'Sistema Interactivo Q&A', 'Traducción Simultánea', 'Control Room Técnico'],
    Producción: ['Producción General Evento', 'Stage Design Corporativo', 'Producción Audiovisual', 'Producción Lanzamiento', 'Producción Roadshow'],
    Personal: ['Staff Registro', 'Modelos de Marca', 'Equipo Técnico Support', 'Seguridad Corporativa', 'Anfitriones Ejecutivos'],
    Animación: ['Presentador Profesional', 'Dinámica Team Building', 'Icebreaker Interactivo', 'Gamificación en Vivo', 'Quiz Corporativo'],
    'Renta de espacio': ['Renta Centro Convenciones', 'Renta Auditorio Premium', 'Renta Sala Plenaria', 'Renta Sala Breakout', 'Renta Terraza Corporativa']
  }
};

function formatPrice(n: number) { return `$${n.toLocaleString('es-MX')}`; }

function randomInRange(min: number, max: number) { return Math.round(Math.random() * (max - min) + min); }

const PRICE_RANGES: Record<EventCategory, [number, number]> = {
  infantiles: [15000, 60000],
  formales: [30000, 150000],
  corporativos: [25000, 180000]
};

function seedEventsIfNeeded(base: EventItem[]): EventItem[] {
  const byTypeCategory: Record<string, EventItem[]> = {};
  base.forEach(e => {
    const key = `${e.eventType}|${e.category}`;
    (byTypeCategory[key] ||= []).push(e);
  });
  const additions: EventItem[] = [];
  (['infantiles','formales','corporativos'] as EventCategory[]).forEach(type => {
    EVENT_CATEGORIES.forEach(category => {
      const templates = TITLE_TEMPLATES[type][category] || [];
      const key = `${type}|${category}`;
      const existing = byTypeCategory[key]?.length || 0;
      for (let i = existing; i < SEED_CONFIG.minPerCategory; i++) {
        const titleBase = templates[i % templates.length] || `${category} Servicio`;
        const price = randomInRange(...PRICE_RANGES[type]);
        additions.push({
          id: `${type}-${category.replace(/\s+/g,'-').toLowerCase()}-${i+1}-${Date.now()}-${Math.random().toString(16).slice(2,6)}`,
            title: templates.length ? titleBase : `${titleBase} ${i+1}`,
            category,
            description: `${titleBase} para eventos ${type}. Servicio profesional adaptado a tus necesidades.`,
            location: ['Ciudad de México','Guadalajara','Monterrey'][i % 3],
            duration: type === 'formales' ? 'Evento completo' : (type === 'corporativos' ? 'Jornada completa' : '4 horas'),
            price: formatPrice(price),
            rating: 4.5 + Math.random() * 0.5,
            featured: false,
            image: `https://picsum.photos/seed/${type}-${category}-${i}/800/600`,
            eventType: type,
            createdAt: new Date().toISOString(),
            capacity: Math.max(5, Math.round(Math.random()*60))
        });
      }
    });
  });
  if (!additions.length) return base;
  return [...base, ...additions];
}

export const EventsProvider = ({ children }: { children: ReactNode }) => {
  const [events, setEvents] = useState<EventItem[]>([]);

  // Load from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: EventItem[] = JSON.parse(raw);
        setEvents(seedEventsIfNeeded(parsed));
      } else {
        setEvents(seedEventsIfNeeded(initialEvents));
      }
    } catch (e) {
      console.error('Error loading events store', e);
      setEvents(seedEventsIfNeeded(initialEvents));
    }
  }, []);

  // Persist
  useEffect(() => {
    if (events.length) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
    }
  }, [events]);

  const addEvent: EventsContextType['addEvent'] = useCallback((data) => {
    const newEvent: EventItem = {
      id: `${data.eventType}-${Date.now()}`,
      rating: data.rating ?? 0,
      featured: data.featured ?? false,
      createdAt: new Date().toISOString(),
      ...data
    };
    setEvents(prev => [newEvent, ...prev]);
    return newEvent;
  }, []);

  const getEventsByType = useCallback((type: EventCategory) => events.filter(e => e.eventType === type), [events]);

  return (
    <EventsContext.Provider value={{ events, addEvent, getEventsByType }}>
      {children}
    </EventsContext.Provider>
  );
};

export const useEvents = () => {
  const ctx = useContext(EventsContext);
  if (!ctx) throw new Error('useEvents must be used within EventsProvider');
  return ctx;
};
