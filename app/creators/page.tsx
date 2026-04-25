import { CREATORS } from '@/lib/mock-data';
import CreatorCard from '@/components/CreatorCard/CreatorCard';
import styles from './page.module.css';

export default function CreatorsPage() {
  return (
    <main className={styles.main}>
      <section className={styles.header}>
        <h1 className={styles.title}>Creadores</h1>
        <p className={styles.subtitle}>
          Descubrí los productores y DJs que dan vida a RemixHub
        </p>
      </section>
      <div className={styles.grid}>
        {CREATORS.map((creator) => (
          <CreatorCard
            key={creator.name}
            creator={creator}
          />
        ))}
      </div>
    </main>
  );
}