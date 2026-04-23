'use client';

import styles from './GenreFilter.module.css';

interface GenreFilterProps {
  genres: string[];
  active: string;
  onChange: (genre: string) => void;
}

export default function GenreFilter({
  genres,
  active,
  onChange,
}: GenreFilterProps) {
  return (
    <div className={styles.bar} role="toolbar" aria-label="Filtrar por género">
      {genres.map((genre) => (
        <button
          key={genre}
          className={`${styles.pill} ${active === genre ? styles.active : ''}`}
          onClick={() => onChange(genre)}
          aria-pressed={active === genre}
        >
          {genre}
        </button>
      ))}
    </div>
  );
}