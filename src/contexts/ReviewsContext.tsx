import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
// Simple ID generator (avoid external dependency for now)
const uuid = () => 'rev_' + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);

export interface Review {
  id: string;
  serviceId: string; // referencia al evento/servicio
  userId: string; // autor
  userName: string;
  rating: number; // 1-5
  comment: string;
  createdAt: string; // ISO
  updatedAt?: string; // ISO
  response?: {
    text: string;
    respondedAt: string;
    responderId: string;
  };
  status: 'pending' | 'responded';
}

interface ReviewStats {
  average: number;
  count: number;
  distribution: Record<number, number>; // rating -> count
}

interface ReviewsContextValue {
  reviews: Review[];
  addReview: (data: Omit<Review, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'response'>) => Review;
  updateReview: (id: string, changes: Partial<Pick<Review, 'rating' | 'comment'>>) => Review | undefined;
  respondReview: (id: string, responderId: string, text: string) => Review | undefined;
  deleteReview: (id: string) => void;
  getReviewsByService: (serviceId: string) => Review[];
  getUserReviewForService: (serviceId: string, userId: string) => Review | undefined;
  getServiceStats: (serviceId: string) => ReviewStats;
  filterReviews: (opts: { serviceId?: string; from?: Date; to?: Date; status?: 'pending' | 'responded'; minRating?: number; maxRating?: number }) => Review[];
}

const ReviewsContext = createContext<ReviewsContextValue | undefined>(undefined);

const STORAGE_KEY = 'app_reviews_v1';

const loadInitial = (): Review[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Review[];
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.warn('Failed to parse reviews', e);
    return [];
  }
};

export const ReviewsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [reviews, setReviews] = useState<Review[]>(() => loadInitial());

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
    } catch (e) {
      console.warn('Failed to persist reviews', e);
    }
  }, [reviews]);

  const addReview: ReviewsContextValue['addReview'] = (data) => {
    const now = new Date().toISOString();
    const newReview: Review = {
      id: uuid(),
      createdAt: now,
      status: 'pending',
      ...data,
    };
    setReviews(prev => [newReview, ...prev]);
    return newReview;
  };

  const updateReview: ReviewsContextValue['updateReview'] = (id, changes) => {
    let updated: Review | undefined;
    setReviews(prev => prev.map(r => {
      if (r.id === id) {
        updated = { ...r, ...changes, updatedAt: new Date().toISOString() };
        return updated!;
      }
      return r;
    }));
    return updated;
  };

  const respondReview: ReviewsContextValue['respondReview'] = (id, responderId, text) => {
    let updated: Review | undefined;
    setReviews(prev => prev.map(r => {
      if (r.id === id) {
        updated = { ...r, response: { text, respondedAt: new Date().toISOString(), responderId }, status: 'responded' };
        return updated!;
      }
      return r;
    }));
    return updated;
  };

  const deleteReview: ReviewsContextValue['deleteReview'] = (id) => {
    setReviews(prev => prev.filter(r => r.id !== id));
  };

  const getReviewsByService = (serviceId: string) => reviews.filter(r => r.serviceId === serviceId);

  const getUserReviewForService = (serviceId: string, userId: string) => reviews.find(r => r.serviceId === serviceId && r.userId === userId);

  const getServiceStats = (serviceId: string): ReviewStats => {
    const list = getReviewsByService(serviceId);
    if (list.length === 0) return { average: 0, count: 0, distribution: { 1:0, 2:0, 3:0, 4:0, 5:0 } };
    const distribution: Record<number, number> = { 1:0, 2:0, 3:0, 4:0, 5:0 };
    let sum = 0;
    for (const r of list) {
      distribution[r.rating] = (distribution[r.rating] || 0) + 1;
      sum += r.rating;
    }
    return { average: +(sum / list.length).toFixed(2), count: list.length, distribution };
  };

  const filterReviews: ReviewsContextValue['filterReviews'] = (opts) => {
    return reviews.filter(r => {
      if (opts.serviceId && r.serviceId !== opts.serviceId) return false;
      if (opts.status && r.status !== opts.status) return false;
      if (opts.minRating && r.rating < opts.minRating) return false;
      if (opts.maxRating && r.rating > opts.maxRating) return false;
      if (opts.from && new Date(r.createdAt) < opts.from) return false;
      if (opts.to && new Date(r.createdAt) > opts.to) return false;
      return true;
    });
  };

  const value: ReviewsContextValue = useMemo(() => ({
    reviews,
    addReview,
    updateReview,
    respondReview,
    deleteReview,
    getReviewsByService,
    getUserReviewForService,
    getServiceStats,
    filterReviews,
  }), [reviews]);

  return <ReviewsContext.Provider value={value}>{children}</ReviewsContext.Provider>;
};

export const useReviews = () => {
  const ctx = useContext(ReviewsContext);
  if (!ctx) throw new Error('useReviews must be used within ReviewsProvider');
  return ctx;
};
