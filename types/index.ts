export interface Track {
  id: string;
  title: string;
  artist: string;
  genre: string;
  bpm: number;
  duration: string;
  plays: number;
  rating: number;
  ratingCount: number;
  coverEmoji: string;
  waveColor: string;
}

export interface Creator {
  name: string;
  slug: string;
  tracks: number;
  followers: number;
  avatarEmoji: string;
  accent: string;
}