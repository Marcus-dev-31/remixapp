import { TRACKS } from '@/lib/mock-data';
import HomeClient from '@/components/HomeClient/HomeClient';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>
          Descubrí el{' '}
          <span className={styles.heroGradient}>Remix</span>
        </h1>
        <p className={styles.heroSubtitle}>
          La plataforma donde los productores comparten sus remixes y la comunidad los vive
        </p>
      </section>
      <HomeClient tracks={TRACKS} />
    </main>
  );
}