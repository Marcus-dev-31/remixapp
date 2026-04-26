'use client';

import { motion } from 'framer-motion';
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
      {genres.map((genre, index) => (
        <motion.button
          key={genre}
          className={`${styles.pill} ${active === genre ? styles.active : ''}`}
          onClick={() => onChange(genre)}
          aria-pressed={active === genre}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: index * 0.05,
            ease: [0.22, 1, 0.36, 1],
          }}
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.92 }}
        >
          {active === genre && (
            <motion.span
              className={styles.activeIndicator}
              layoutId="activeGenre"
              transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            />
          )}
          <span style={{ position: 'relative', zIndex: 1 }}>{genre}</span>
        </motion.button>
      ))}
    </div>
  );
}