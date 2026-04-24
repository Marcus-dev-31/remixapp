'use client';

import type { Track } from '@/types';
import Waveform from '@/components/Waveform/Waveform';
import StarRating from '@/components/StarRating/StarRating';
import styles from './NowPlayingBar.module.css';

interface NowPlayingBarProps {
  track: Track;
  rating: number;
  onStop: () => void;
  onRating: (id: string, score: number) => void;
}

export default function NowPlayingBar({
  track,
  rating,
  onStop,
  onRating,
}: NowPlayingBarProps) {
  return (
    <div className={styles.bar}>
      <div
        className={styles.cover}
        style={{ background: `${track.waveColor}18` }}
      >
        <span className={styles.spinning}>{track.cover}</span>
      </div>

      <div className={styles.info}>
        <div className={styles.title}>{track.title}</div>
        <div className={styles.artist}>{track.artist}</div>
      </div>

      <div className={styles.waveform}>
        <Waveform color={track.waveColor} playing small />
      </div>

      <div className={styles.controls}>
        <button className={styles.btn} aria-label="Track anterior">⏮</button>
        <button
          className={`${styles.btn} ${styles.btnMain}`}
          onClick={onStop}
          aria-label="Pausar"
        >
          ⏸
        </button>
        <button className={styles.btn} aria-label="Track siguiente">⏭</button>
      </div>

      <div className={styles.rating}>
        <StarRating
          rating={rating}
          interactive
          onRate={(score) => onRating(track.id, score)}
          size={18}
        />
      </div>
    </div>
  );
}