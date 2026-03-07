import { useState, useEffect, useCallback } from 'react';
import { RadioStation } from '@/types/radio';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

const FAVORITES_KEY_PREFIX = 'fm-favorites-';
const FAVORITES_KEY_GUEST = 'fm-favorites-guest';
const FREE_FAVORITES_LIMIT = 5;

function getFavoritesKey(userId: string | null): string {
  return userId ? `${FAVORITES_KEY_PREFIX}${userId}` : FAVORITES_KEY_GUEST;
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<RadioStation[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [isPremium, setIsPremium] = useState(false);

  // Function to check premium status
  const checkPremiumStatus = useCallback((uid: string | null, session: any) => {
    if (!uid) return false;
    
    // Check localStorage first (most reliable)
    const localPremium = localStorage.getItem(`premium_${uid}`) === 'true';
    if (localPremium) return true;
    
    // Then check user_metadata
    return session?.user?.user_metadata?.is_premium === true;
  }, []);

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
      const premium = checkPremiumStatus(uid, data.session);
      setUserId(uid);
      setIsPremium(premium);
      loadFavorites(uid);
      console.log('Premium status on load:', premium, 'User ID:', uid);
    });

    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      const uid = session?.user?.id ?? null;
      const premium = checkPremiumStatus(uid, session);
      setUserId(uid);
      setIsPremium(premium);
      loadFavorites(uid);
      console.log('Premium status changed:', premium, 'User ID:', uid);
    });

    return () => listener.subscription.unsubscribe();
  }, [checkPremiumStatus]);

  const persistFavorites = useCallback((updated: RadioStation[]) => {
    const key = getFavoritesKey(userId);
    localStorage.setItem(key, JSON.stringify(updated));
  }, [userId]);

  const addFavorite = useCallback((station: RadioStation) => {
    setFavorites(prev => {
      if (prev.some(s => s.id === station.id)) return prev;
      
      // Check favorites limit for free users
      if (!isPremium && prev.length >= FREE_FAVORITES_LIMIT) {
        toast.error(`Free users can save up to ${FREE_FAVORITES_LIMIT} favorites`, {
          description: 'Upgrade to Pro for unlimited favorites!',
          action: {
            label: 'Upgrade',
            onClick: () => window.location.href = '/premium'
          }
        });
        return prev;
      }
      
      const updated = [...prev, station];
      persistFavorites(updated);
      toast.success(`Added ${station.name} to favorites`);
      return updated;
    });
  }, [persistFavorites, isPremium]);

  const removeFavorite = useCallback((stationId: string) => {
    setFavorites(prev => {
      const station = prev.find(s => s.id === stationId);
      const updated = prev.filter(s => s.id !== stationId);
      persistFavorites(updated);
      if (station) {
        toast.success(`Removed ${station.name} from favorites`);
      }
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
    isPremium,
    favoritesLimit: isPremium ? Infinity : FREE_FAVORITES_LIMIT,
    favoritesRemaining: isPremium ? Infinity : Math.max(0, FREE_FAVORITES_LIMIT - favorites.length),
  };
}
