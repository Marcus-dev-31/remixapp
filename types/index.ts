export interface Track {
  id: string;
  title: string;
  artist: string;
  artistId: string;
  artistSlug: string;
  genre: string;
  bpm: number;
  duration: string;
  plays: number;
  rating: number;
  ratingCount: number;
  cover: string;
  waveColor: string;
  fileUrl?: string
}

export interface Creator {
  id: string;
  name: string;
  slug: string;
  tracks: number;
  followers: number;
  avatar: string;
  accent: string;
}