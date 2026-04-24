'use client';

import { TRACKS, CREATORS } from '@/lib/mock-data';
import TrackList from '@/components/TrackList/TrackList';

export default function Home() {
  return (
    <main style={{ maxWidth: '75rem', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <h1 style={{ marginBottom: '1.5rem', fontSize: '1.75rem', fontWeight: 800 }}>
        Trending ahora
      </h1>
      <TrackList
        tracks={TRACKS}
        onArtistClick={(creator) => console.log(creator)}
      />
    </main>
  );
}