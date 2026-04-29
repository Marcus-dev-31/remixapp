import { TRACKS } from '@/lib/mock-data';
import NovedadesClient from '@/components/NovedadesClient/NovedadesClient';
import styles from './page.module.css';

const DAYS_RANGE = 7;

export default function NovedadesPage() {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - DAYS_RANGE);

  const newTracks = TRACKS
    .filter((track) => new Date(track.uploadedAt) >= cutoff)
    .sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());

  return (
    <main className={styles.main}>
      <section className={styles.header}>
        <h1 className={styles.title}>Novedades</h1>
        <p className={styles.subtitle}>
          Tracks subidos en los últimos 7 días
        </p>
      </section>
      <NovedadesClient tracks={newTracks} />
    </main>
  );
}