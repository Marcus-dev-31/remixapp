"use client";

import { motion, AnimatePresence } from "framer-motion";
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

  const track = state.currentTrack;
  const rating = track ? (ratings[track.id] ?? track.rating) : 0;

  const handleRating = (score: number) => {
    if (!track) return;
    setRatings((prev) => ({ ...prev, [track.id]: score }));
    showToast(`Calificaste con ${score} ★`);
  };

  return (
    <AnimatePresence mode="wait">
      {track && (
        <motion.div
          className={styles.bar}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
        >
          <motion.div
            className={styles.cover}
            style={{ background: `${track.waveColor}18` }}
            animate={state.isPlaying ? { scale: [1, 1.18, 1] } : { scale: 1 }}
            transition={
              state.isPlaying
                ? { duration: 1.2, repeat: Infinity, ease: "easeInOut" }
                : {}
            }
          >
            <span className={styles.spinning}>{track.cover}</span>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={track.id}
              className={styles.info}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className={styles.title}>{track.title}</div>
              <div className={styles.artist}>{track.artist}</div>
            </motion.div>
          </AnimatePresence>

          <div className={styles.waveform}>
            <Waveform color={track.waveColor} playing={state.isPlaying} small />
          </div>

          <div className={styles.controls}>
            <motion.button
              className={styles.btn}
              aria-label="Track anterior"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.85 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              ⏮
            </motion.button>
            <motion.button
              className={`${styles.btn} ${styles.btnMain}`}
              onClick={togglePause}
              aria-label={state.isPlaying ? "Pausar" : "Reproducir"}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.88 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={state.isPlaying ? "pause" : "play"}
                  initial={{ opacity: 0, scale: 0.5, rotate: -30 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.5, rotate: 30 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                  {state.isPlaying ? "⏸" : "▶"}
                </motion.span>
              </AnimatePresence>
            </motion.button>
            <motion.button
              className={styles.btn}
              aria-label="Track siguiente"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.85 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              ⏭
            </motion.button>
          </div>

          <div className={styles.rating}>
            <StarRating
              rating={rating}
              interactive
              onRate={handleRating}
              size={18}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
