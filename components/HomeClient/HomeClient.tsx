'use client';

import { useState, useMemo } from 'react';
import type { Track, Creator } from '@/types';
import { GENRES } from '@/lib/mock-data';
import GenreFilter from '@/components/GenreFilter/GenreFilter';
import TrackList from '@/components/TrackList/TrackList';
import styles from './HomeClient.module.css';

interface HomeClientProps {
  tracks: Track[];
}

export default function HomeClient({ tracks }: HomeClientProps) {
  const [activeGenre, setActiveGenre] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTracks = useMemo(() => {
    return tracks.filter((track) => {
      const matchGenre = activeGenre === 'All' || track.genre === activeGenre;
      const q = searchQuery.toLowerCase();
      const matchSearch =
        !q ||
        track.title.toLowerCase().includes(q) ||
        track.artist.toLowerCase().includes(q);
      return matchGenre && matchSearch;
    });
  }, [tracks, activeGenre, searchQuery]);

  const handleArtistClick = (creator: Creator) => {
    console.log(creator);
  };

  return (
    <section className={styles.section}>
      <div className={styles.controls}>
        <input
          className={styles.search}
          type="text"
          placeholder="Buscar tracks, artistas..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <GenreFilter
          genres={GENRES}
          active={activeGenre}
          onChange={setActiveGenre}
        />
      </div>
      <h2 className={styles.sectionTitle}>Trending ahora</h2>
      <TrackList
        tracks={filteredTracks}
        onArtistClick={handleArtistClick}
        emptyMessage="No hay tracks que coincidan con tu búsqueda"
      />
    </section>
  );
}