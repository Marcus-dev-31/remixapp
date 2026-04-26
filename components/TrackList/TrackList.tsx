"use client";

import type { Track, Creator } from "@/types";
import { useState } from "react";
import { usePlayer } from "@/context/PlayerContext";
import { useToast } from "@/context/ToastContext";
import TrackRow from "@/components/TrackRow/TrackRow";
import styles from "./TrackList.module.css";

interface TrackListProps {
  tracks: Track[];
  onArtistClick?: (creator: Creator) => void;
  emptyMessage?: string;
}

export default function TrackList({
  tracks,
  onArtistClick,
  emptyMessage = "No hay tracks para mostrar",
}: TrackListProps) {
  const { state, playTrack, togglePause } = usePlayer();
  const { showToast } = useToast();

  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [downloaded, setDownloaded] = useState<Record<string, boolean>>({});

  const handlePlay = (id: string) => {
    const track = tracks.find((t) => t.id === id);
    if (!track) return;

    if (state.currentTrack?.id === id) {
      togglePause();
    } else {
      playTrack(track);
    }
  };

  const handleDownload = (track: Track) => {
    setDownloaded((prev) => ({ ...prev, [track.id]: true }));
    showToast(`Descargando "${track.title}"...`);
  };

  const handleRating = (id: string, score: number) => {
    setRatings((prev) => ({ ...prev, [id]: score }));
    showToast(`Calificaste con ${score} ★`);
  };

  if (tracks.length === 0) {
    return <div className={styles.empty}>{emptyMessage}</div>;
  }

  return (
    <div className={styles.list}>
      {tracks.map((track) => (
        <TrackRow
          key={track.id}
          track={track}
          playing={state.currentTrack?.id === track.id && state.isPlaying}
          onPlay={handlePlay}
          onDownload={handleDownload}
          onRating={handleRating}
          downloaded={downloaded[track.id] ?? false}
          rating={ratings[track.id] ?? track.rating}
          onArtistClick={onArtistClick}
        />
      ))}
    </div>
  );
}
