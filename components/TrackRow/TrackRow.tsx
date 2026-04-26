'use client';

import { motion } from 'framer-motion';
import type { Track, Creator } from '@/types';
import Waveform from '@/components/Waveform/Waveform';
import StarRating from '@/components/StarRating/StarRating';
import styles from './TrackRow.module.css';

interface TrackRowProps {
  track: Track;
  playing: boolean;
  index: number;
  onPlay: (id: string) => void;
  onDownload: (track: Track) => void;
  onRating: (id: string, score: number) => void;
  downloaded: boolean;
  rating: number;
  onArtistClick?: (creator: Creator) => void;
}

export default function TrackRow({
  track,
  playing,
  index,
  onPlay,
  onDownload,
  onRating,
  downloaded,
  rating,
  onArtistClick,
}: TrackRowProps) {
  return (
    <motion.div
      className={[styles.row, playing ? styles.playing : ''].filter(Boolean).join(' ')}
      onClick={() => onPlay(track.id)}
      initial={{ opacity: 0, x: -32 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.45,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ x: 6, transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] } }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        className={styles.cover}
        animate={playing ? { scale: [1, 1.08, 1] } : { scale: 1 }}
        transition={playing ? { duration: 1.8, repeat: Infinity, ease: 'easeInOut' } : {}}
      >
        <div className={styles.coverBg} style={{ background: track.waveColor }} />
        <span className={styles.coverEmoji}>{track.cover}</span>
        <div className={styles.playOverlay}>{playing ? '⏸' : '▶'}</div>
      </motion.div>

      <div className={styles.info}>
        <div className={styles.title}>{track.title}</div>
        <div className={styles.meta}>
          <button
            className={styles.artistLink}
            onClick={(e) => {
              e.stopPropagation();
              onArtistClick?.({
                id: track.artistId,
                name: track.artist,
                slug: track.artistSlug,
                tracks: 0,
                followers: 0,
                avatar: '',
                accent: track.waveColor,
              });
            }}
          >
            {track.artist}
          </button>
          {' · '}{track.bpm} BPM
        </div>
      </div>

      <div className={styles.waveform}>
        <Waveform color={track.waveColor} playing={playing} />
      </div>

      <div className={styles.duration}>{track.duration}</div>

      <div className={styles.genre}>{track.genre}</div>

      <div className={styles.rating}>
        <StarRating rating={rating} size={13} />
      </div>

      <motion.button
        className={[styles.downloadBtn, downloaded ? styles.downloaded : ''].filter(Boolean).join(' ')}
        onClick={(e) => {
          e.stopPropagation();
          onDownload(track);
        }}
        aria-label={`Descargar ${track.title}`}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      >
        {downloaded ? '✓' : '↓'}
      </motion.button>
    </motion.div>
  );
}