import React, { createContext, useContext, useState } from 'react';

export type SortOption = 'rating' | 'price-low' | 'price-high' | 'name' | 'featured';

interface SearchContextType {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
  locationFilter: string;
  setLocationFilter: (location: string) => void;
  sortBy: SortOption;
  setSortBy: (sort: SortOption) => void;
  showFeaturedOnly: boolean;
  setShowFeaturedOnly: (show: boolean) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  clearFilters: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);

  const clearFilters = () => {
    setSearchTerm('');
    setCategoryFilter('all');
    setLocationFilter('all');
    setSortBy('featured');
    setShowFeaturedOnly(false);
    setPriceRange([0, 100000]);
  };

  return (
    <SearchContext.Provider value={{
      searchTerm,
      setSearchTerm,
      categoryFilter,
      setCategoryFilter,
      locationFilter,
      setLocationFilter,
      sortBy,
      setSortBy,
      showFeaturedOnly,
      setShowFeaturedOnly,
      priceRange,
      setPriceRange,
      clearFilters
    }}>
      {children}
    </SearchContext.Provider>
  );
};