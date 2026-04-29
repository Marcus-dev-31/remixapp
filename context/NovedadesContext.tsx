'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import { TRACKS } from '@/lib/mock-data';

const STORAGE_KEY = 'remixhub_novedades_last_visit';
const DAYS_RANGE = 7;

interface NovedadesContextValue {
  hasNewTracks: boolean;
  markAsSeen: () => void;
}

interface NovedadesProviderProps {
  children: ReactNode;
}

const NovedadesContext = createContext<NovedadesContextValue | null>(null);

export function NovedadesProvider({ children }: NovedadesProviderProps) {
  const [hasNewTracks, setHasNewTracks] = useState(false);

  useEffect(() => {
    const lastVisit = localStorage.getItem(STORAGE_KEY);
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - DAYS_RANGE);

    const hasNew = TRACKS.some((track) => {
      const uploadedAt = new Date(track.uploadedAt);
      if (uploadedAt < cutoff) return false;
      if (!lastVisit) return true;
      return uploadedAt > new Date(lastVisit);
    });

    setHasNewTracks(hasNew);
  }, []);

  const markAsSeen = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, new Date().toISOString());
    setHasNewTracks(false);
  }, []);

  return (
    <NovedadesContext.Provider value={{ hasNewTracks, markAsSeen }}>
      {children}
    </NovedadesContext.Provider>
  );
}

export function useNovedades(): NovedadesContextValue {
  const ctx = useContext(NovedadesContext);
  if (!ctx) throw new Error('useNovedades must be used inside <NovedadesProvider>');
  return ctx;
}