'use client';

import { useEffect } from 'react';
import type { Track } from '@/types';
import { useNovedades } from '@/context/NovedadesContext';
import TrackList from '@/components/TrackList/TrackList';
import styles from './NovedadesClient.module.css';

interface NovedadesClientProps {
  tracks: Track[];
}

export default function NovedadesClient({ tracks }: NovedadesClientProps) {
  const { markAsSeen } = useNovedades();

  useEffect(() => {
    markAsSeen();
  }, [markAsSeen]);

  if (tracks.length === 0) {
    return (
      <div className={styles.empty}>
        <span className={styles.emptyIcon}>🎵</span>
        <p>No hay tracks nuevos esta semana.</p>
        <p>Volvé pronto para descubrir novedades.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <TrackList
        tracks={tracks}
        emptyMessage="No hay tracks nuevos esta semana"
      />
    </div>
  );
}