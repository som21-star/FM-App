import { useState, useRef, useCallback, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { RadioStation } from '@/types/radio';

interface AudioPlayerState {
  currentStation: RadioStation | null;
  isPlaying: boolean;
  volume: number;
  isLoading: boolean;
  error: string | null;
}

export function useAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [state, setState] = useState<AudioPlayerState>({
    currentStation: null,
    isPlaying: false,
    volume: 0.7,
    isLoading: false,
    error: null,
  });

  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.volume = state.volume;

    const audio = audioRef.current;

    audio.addEventListener('playing', () => {
      setState(prev => ({ ...prev, isPlaying: true, isLoading: false, error: null }));
    });

    audio.addEventListener('pause', () => {
      setState(prev => ({ ...prev, isPlaying: false }));
    });

    audio.addEventListener('waiting', () => {
      setState(prev => ({ ...prev, isLoading: true }));
    });

    audio.addEventListener('error', () => {
      setState(prev => ({ 
        ...prev, 
        isPlaying: false, 
        isLoading: false, 
        error: 'Failed to play station' 
      }));
    });

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  const play = useCallback((station: RadioStation) => {
    if (!audioRef.current) return;

    setState(prev => ({ 
      ...prev, 
      currentStation: station, 
      isLoading: true, 
      error: null 
    }));

    // Use url_resolved for the actual stream, fallback to url
    const streamUrl = station.url_resolved || station.url;
    audioRef.current.src = streamUrl;
    audioRef.current.play().catch((e) => {
      console.error('Playback failed:', e);
      setState(prev => ({ 
        ...prev, 
        isPlaying: false, 
        isLoading: false, 
        error: 'Failed to play station' 
      }));
    });

    // Record listen counts in localStorage (per-user if available)
    try {
      supabase.auth.getUser().then(({ data }) => {
        const uid = data.user?.id || 'anon';
        try {
          const key = `fh_listens:${uid}`;
          const raw = localStorage.getItem(key) || localStorage.getItem('fh_listens:anon');
          const parsed = raw ? JSON.parse(raw) : {};
          const entry = parsed[station.id] || { id: station.id, name: station.name, count: 0, last: 0 };
          entry.count = (entry.count || 0) + 1;
          entry.last = Date.now();
          parsed[station.id] = entry;
          localStorage.setItem(key, JSON.stringify(parsed));
        } catch (err) {
          console.warn('Failed to record listen', err);
        }
      }).catch(() => {
        // ignore
      });
    } catch (err) {
      // ignore
    }
  }, []);

  const pause = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.pause();
  }, []);

  const togglePlayPause = useCallback(() => {
    if (!audioRef.current || !state.currentStation) return;

    if (state.isPlaying) {
      pause();
    } else {
      audioRef.current.play().catch(console.error);
    }
  }, [state.isPlaying, state.currentStation, pause]);

  const setVolume = useCallback((volume: number) => {
    if (!audioRef.current) return;
    const clampedVolume = Math.max(0, Math.min(1, volume));
    audioRef.current.volume = clampedVolume;
    setState(prev => ({ ...prev, volume: clampedVolume }));
  }, []);

  const stop = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.src = '';
    setState(prev => ({ 
      ...prev, 
      currentStation: null, 
      isPlaying: false, 
      isLoading: false 
    }));
  }, []);

  return {
    ...state,
    play,
    pause,
    togglePlayPause,
    setVolume,
    stop,
  };
}
