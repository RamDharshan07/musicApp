import React from 'react';
import type { Song } from '../types';
import { Play, Pause, Clock } from 'lucide-react';

interface SongListProps {
  songs: Song[];
  onPlay: (song: Song) => void;
  currentSong: Song | null;
  isPlaying: boolean;
}

export const SongList: React.FC<SongListProps> = ({ songs, onPlay, currentSong, isPlaying }) => {
  return (
    <div className="space-y-2">
      {songs.map((song) => {
        const isCurrentSong = currentSong?.id === song.id;
        return (
          <div
            key={song.id}
            className={`flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg cursor-pointer ${
              isCurrentSong ? 'bg-purple-50' : ''
            }`}
            onClick={() => onPlay(song)}
          >
            <img
              src={song.coverUrl}
              alt={song.title}
              className="w-12 h-12 rounded-md object-cover"
            />
            <div className="flex-1">
              <h4 className={`font-medium ${isCurrentSong ? 'text-purple-600' : 'text-gray-800'}`}>
                {song.title}
              </h4>
              <p className="text-sm text-gray-600">{song.artist}</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500 flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {song.duration}
              </span>
              {isCurrentSong ? (
                isPlaying ? (
                  <Pause className="w-5 h-5 text-purple-600" />
                ) : (
                  <Play className="w-5 h-5 text-purple-600" />
                )
              ) : (
                <Play className="w-5 h-5 text-gray-400" />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};