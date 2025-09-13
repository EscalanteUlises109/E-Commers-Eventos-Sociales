import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Service {
  title: string;
  category: string;
  description: string;
  location: string;
  duration: string;
  price: string;
  rating: number;
  featured: boolean;
  image: string;
  id: string; // Add unique ID for each service
}

interface FavoritesContextType {
  favorites: Service[];
  addToFavorites: (service: Service) => void;
  removeFromFavorites: (serviceId: string) => void;
  isFavorite: (serviceId: string) => boolean;
  toggleFavorite: (service: Service) => void;
  clearFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Service[]>([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('event-favorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error('Error loading favorites:', error);
        localStorage.removeItem('event-favorites');
      }
    }
  }, []);

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem('event-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (service: Service) => {
    setFavorites(prev => {
      if (prev.some(fav => fav.id === service.id)) {
        return prev; // Already in favorites
      }
      return [...prev, service];
    });
  };

  const removeFromFavorites = (serviceId: string) => {
    setFavorites(prev => prev.filter(fav => fav.id !== serviceId));
  };

  const isFavorite = (serviceId: string) => {
    return favorites.some(fav => fav.id === serviceId);
  };

  const toggleFavorite = (service: Service) => {
    if (isFavorite(service.id)) {
      removeFromFavorites(service.id);
    } else {
      addToFavorites(service);
    }
  };

  const clearFavorites = () => {
    setFavorites([]);
    localStorage.removeItem('event-favorites');
  };

  return (
    <FavoritesContext.Provider value={{
      favorites,
      addToFavorites,
      removeFromFavorites,
      isFavorite,
      toggleFavorite,
      clearFavorites
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};