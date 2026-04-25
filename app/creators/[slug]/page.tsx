import { notFound } from 'next/navigation';
import { CREATORS, TRACKS } from '@/lib/mock-data';
import TrackList from '@/components/TrackList/TrackList';
import styles from './page.module.css';

interface CreatorPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CREATORS.map((creator) => ({ slug: creator.slug }));
}

export default async function CreatorPage({ params }: CreatorPageProps) {
  const { slug } = await params;

  const creator = CREATORS.find((c) => c.slug === slug);
  if (!creator) notFound();

  const creatorTracks = TRACKS.filter((t) => t.artistSlug === slug);

  return (
    <main className={styles.main}>
      <div className={styles.accent} style={{ background: creator.accent }} />
      <section className={styles.header}>
        <div
          className={styles.avatar}
          style={{ background: `${creator.accent}18` }}
        >
          {creator.avatar}
        </div>
        <div className={styles.info}>
          <h1 className={styles.name}>{creator.name}</h1>
          <p className={styles.role}>Productor musical · Remixer</p>
          <div className={styles.stats}>
            <span className={styles.stat}>
              <strong>{creator.tracks}</strong> tracks
            </span>
            <span className={styles.stat}>
              <strong>{creator.followers.toLocaleString()}</strong> seguidores
            </span>
          </div>
        </div>
      </section>
      <section>
        <h2 className={styles.sectionTitle}>Tracks</h2>
        <TrackList
          tracks={creatorTracks}
          emptyMessage="Este creador aún no tiene tracks"
        />
      </section>
    </main>
  );
}