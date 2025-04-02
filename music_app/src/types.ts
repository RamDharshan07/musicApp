export interface Song {
  id: string;
  title: string;
  artist: string;
  duration: string;
  coverUrl: string;
  audioUrl: string;
}

export interface User {
  username: string;
  password: string;
}

export interface Playlist {
  id: string;
  name: string;
  songs: Song[];
}