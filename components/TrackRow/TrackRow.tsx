'use client';

import type { Track, Creator } from '@/types';
import Waveform from '@/components/Waveform/Waveform';
import StarRating from '@/components/StarRating/StarRating';
import styles from './TrackRow.module.css';

interface TrackRowProps {
  track: Track;
  playing: boolean;
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
  onPlay,
  onDownload,
  onRating,
  downloaded,
  rating,
  onArtistClick,
}: TrackRowProps) {
  return (
    <div
      className={[styles.row, playing ? styles.playing : ''].filter(Boolean).join(' ')}
      onClick={() => onPlay(track.id)}
    >
      <div className={styles.cover}>
        <div className={styles.coverBg} style={{ background: track.waveColor }} />
        <span className={styles.coverEmoji}>{track.cover}</span>
        <div className={styles.playOverlay}>{playing ? '⏸' : '▶'}</div>
      </div>

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

      <button
        className={[styles.downloadBtn, downloaded ? styles.downloaded : ''].filter(Boolean).join(' ')}
        onClick={(e) => {
          e.stopPropagation();
          onDownload(track);
        }}
        aria-label={`Descargar ${track.title}`}
      >
        {downloaded ? '✓' : '↓'}
      </button>
    </div>
  );
}