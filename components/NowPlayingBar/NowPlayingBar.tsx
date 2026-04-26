"use client";

import { usePlayer } from "@/context/PlayerContext";
import { useToast } from "@/context/ToastContext";
import { useState } from "react";
import Waveform from "@/components/Waveform/Waveform";
import StarRating from "@/components/StarRating/StarRating";
import styles from "./NowPlayingBar.module.css";

export default function NowPlayingBar() {
  const { state, togglePause, stop } = usePlayer();
  const { showToast } = useToast();
  const [ratings, setRatings] = useState<Record<string, number>>({});

  if (!state.currentTrack) return null;

  const track = state.currentTrack;
  const rating = ratings[track.id] ?? track.rating;

  const handleRating = (score: number) => {
    setRatings((prev) => ({ ...prev, [track.id]: score }));
    showToast(`Calificaste con ${score} ★`);
  };
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
        <button className={styles.btn} aria-label="Track anterior">
          ⏮
        </button>
        <button
          className={`${styles.btn} ${styles.btnMain}`}
          onClick={togglePause}
          aria-label={state.isPlaying ? 'Pausar' : 'Reproducir'}
        >
          {state.isPlaying ? '⏸' : '▶'}
        </button>
        <button className={styles.btn} aria-label="Track siguiente">
          ⏭
        </button>
      </div>

      <div className={styles.rating}>
        <StarRating
          rating={rating}
          interactive
          onRate={handleRating}
          size={18}
        />
      </div>
    </div>
  );
}
