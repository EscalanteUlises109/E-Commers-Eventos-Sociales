import { useMemo } from 'react';
import { Service } from '@/contexts/FavoritesContext';
import { useSearch, SortOption } from '@/contexts/SearchContext';

export const useServiceFiltering = (services: Service[]) => {
  const {
    searchTerm,
    categoryFilter,
    locationFilter,
    sortBy,
    showFeaturedOnly,
    priceRange
  } = useSearch();

  const filteredAndSortedServices = useMemo(() => {
    let filtered = [...services];

    // Filter by search term
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(service =>
        service.title.toLowerCase().includes(term) ||
        service.description.toLowerCase().includes(term) ||
        service.category.toLowerCase().includes(term) ||
        service.location.toLowerCase().includes(term)
      );
    }

    // Filter by category
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(service =>
        service.category.toLowerCase() === categoryFilter.toLowerCase()
      );
    }

    // Filter by location
    if (locationFilter !== 'all') {
      filtered = filtered.filter(service =>
        service.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    // Filter by featured only
    if (showFeaturedOnly) {
      filtered = filtered.filter(service => service.featured);
    }

    // Filter by price range
    filtered = filtered.filter(service => {
      const price = parseFloat(service.price.replace(/[$,]/g, ''));
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Sort services
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'price-low':
          const priceA = parseFloat(a.price.replace(/[$,]/g, ''));
          const priceB = parseFloat(b.price.replace(/[$,]/g, ''));
          return priceA - priceB;
        case 'price-high':
          const priceA2 = parseFloat(a.price.replace(/[$,]/g, ''));
          const priceB2 = parseFloat(b.price.replace(/[$,]/g, ''));
          return priceB2 - priceA2;
        case 'name':
          return a.title.localeCompare(b.title);
        case 'featured':
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return b.rating - a.rating; // Secondary sort by rating
        default:
          return 0;
      }
    });

    return filtered;
  }, [services, searchTerm, categoryFilter, locationFilter, sortBy, showFeaturedOnly, priceRange]);

  return {
    filteredServices: filteredAndSortedServices,
    totalResults: filteredAndSortedServices.length,
    hasActiveFilters: searchTerm.trim() !== '' || 
                     categoryFilter !== 'all' || 
                     locationFilter !== 'all' || 
                     showFeaturedOnly ||
                     priceRange[0] > 0 || 
                     priceRange[1] < 100000
  };
};