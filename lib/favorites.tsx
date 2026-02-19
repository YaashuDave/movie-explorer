"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { safeJsonParse } from "./storage";

export type Favorite = {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string | null;
  overview: string | null;
  rating: 1 | 2 | 3 | 4 | 5 | null;
  note: string;
};

type FavoritesContextValue = {
  favorites: Favorite[];
  isFavorite: (id: number) => boolean;
  addFavorite: (fav: Omit<Favorite, "rating" | "note">) => void;
  removeFavorite: (id: number) => void;
  setRating: (id: number, rating: Favorite["rating"]) => void;
  setNote: (id: number, note: string) => void;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

const LS_KEY = "movieExplorer:favorites:v1";

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const raw = typeof window !== "undefined" ? window.localStorage.getItem(LS_KEY) : null;
    const initial = safeJsonParse<Favorite[]>(raw, []);
    setFavorites(initial);
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    window.localStorage.setItem(LS_KEY, JSON.stringify(favorites));
  }, [favorites, loaded]);

  const value = useMemo<FavoritesContextValue>(() => {
    const isFavorite = (id: number) => favorites.some(f => f.id === id);

    const addFavorite = (fav: Omit<Favorite, "rating" | "note">) => {
      setFavorites(prev => {
        if (prev.some(p => p.id === fav.id)) return prev;
        return [{ ...fav, rating: null, note: "" }, ...prev];
      });
    };

    const removeFavorite = (id: number) => {
      setFavorites(prev => prev.filter(f => f.id !== id));
    };

    const setRating = (id: number, rating: Favorite["rating"]) => {
      setFavorites(prev => prev.map(f => (f.id === id ? { ...f, rating } : f)));
    };

    const setNote = (id: number, note: string) => {
      setFavorites(prev => prev.map(f => (f.id === id ? { ...f, note } : f)));
    };

    return { favorites, isFavorite, addFavorite, removeFavorite, setRating, setNote };
  }, [favorites]);

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
}
