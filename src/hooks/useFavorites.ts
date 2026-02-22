import { useState, useEffect, useCallback } from 'react';
import { RadioStation } from '@/types/radio';
import { supabase } from '@/lib/supabase';

const FAVORITES_KEY_PREFIX = 'fm-favorites-';
const FAVORITES_KEY_GUEST = 'fm-favorites-guest';

function getFavoritesKey(userId: string | null): string {
  return userId ? `${FAVORITES_KEY_PREFIX}${userId}` : FAVORITES_KEY_GUEST;
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<RadioStation[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  // Listen for auth changes and reload favorites when user changes
  useEffect(() => {
    const loadFavorites = (uid: string | null) => {
      const key = getFavoritesKey(uid);
      const stored = localStorage.getItem(key);
      if (stored) {
        try {
          setFavorites(JSON.parse(stored));
        } catch (e) {
          console.error('Failed to parse favorites:', e);
          setFavorites([]);
        }
      } else {
        setFavorites([]);
      }
    };

    // Get initial session
    supabase.auth.getSession().then(({ data }) => {
      const uid = data.session?.user?.id ?? null;
      setUserId(uid);
      loadFavorites(uid);
    });

    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      const uid = session?.user?.id ?? null;
      setUserId(uid);
      loadFavorites(uid);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const persistFavorites = useCallback((updated: RadioStation[]) => {
    const key = getFavoritesKey(userId);
    localStorage.setItem(key, JSON.stringify(updated));
  }, [userId]);

  const addFavorite = useCallback((station: RadioStation) => {
    setFavorites(prev => {
      if (prev.some(s => s.id === station.id)) return prev;
      const updated = [...prev, station];
      persistFavorites(updated);
      return updated;
    });
  }, [persistFavorites]);

  const removeFavorite = useCallback((stationId: string) => {
    setFavorites(prev => {
      const updated = prev.filter(s => s.id !== stationId);
      persistFavorites(updated);
      return updated;
    });
  }, [persistFavorites]);

  const isFavorite = useCallback((stationId: string) => {
    return favorites.some(s => s.id === stationId);
  }, [favorites]);

  const toggleFavorite = useCallback((station: RadioStation) => {
    if (isFavorite(station.id)) {
      removeFavorite(station.id);
    } else {
      addFavorite(station);
    }
  }, [isFavorite, removeFavorite, addFavorite]);

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite,
  };
}
