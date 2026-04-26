"use client";

import {
  createContext,
  useContext,
  useReducer,
  useRef,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import type { Track } from "@/types";

// State

interface PlayerState {
  currentTrack: Track | null;
  isPlaying: boolean;
  volume: number;
}

const initialState: PlayerState = {
  currentTrack: null,
  isPlaying: false,
  volume: 1,
};

// Actions
type PlayerAction =
  | { type: "PLAY_TRACK"; payload: Track }
  | { type: "TOGGLE_PAUSE" }
  | { type: "STOP" }
  | { type: "SET_VOLUME"; payload: number };

function playerReducer(state: PlayerState, action: PlayerAction): PlayerState {
  switch (action.type) {
    case "PLAY_TRACK":
      return {
        ...state,
        currentTrack: action.payload,
        isPlaying: true,
      };
    case "TOGGLE_PAUSE":
      return { ...state, isPlaying: !state.isPlaying };
    case "STOP":
      return { ...state, currentTrack: null, isPlaying: false };
    case "SET_VOLUME":
      return { ...state, volume: action.payload };
    default:
      return state;
  }
}

// Context

interface PlayerContextValue {
  state: PlayerState;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  playTrack: (track: Track) => void;
  togglePause: () => void;
  stop: () => void;
  setVolume: (volume: number) => void;
}

const PlayerContext = createContext<PlayerContextValue | null>(null);

// Provider

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(playerReducer, initialState);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.volume = initialState.volume;

    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (state.isPlaying) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [state.isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !state.currentTrack) return;

    const src = state.currentTrack.fileUrl ?? "";
    if (audio.src !== src) {
      audio.src = src;
      audio.load();
    }

    audio.play().catch(() => {});
  }, [state.currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = state.volume;
    }
  }, [state.volume]);

  const playTrack = useCallback((track: Track) => {
    dispatch({ type: "PLAY_TRACK", payload: track });
  }, []);

  const togglePause = useCallback(() => {
    dispatch({ type: "TOGGLE_PAUSE" });
  }, []);

  const stop = useCallback(() => {
    audioRef.current?.pause();
    dispatch({ type: "STOP" });
  }, []);

  const setVolume = useCallback((volume: number) => {
    dispatch({ type: "SET_VOLUME", payload: volume });
  }, []);

  return (
    <PlayerContext.Provider
      value={{ state, audioRef, playTrack, togglePause, stop, setVolume }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

// Hook

export function usePlayer(): PlayerContextValue {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used inside <PlayerProvider>");
  return ctx;
}
