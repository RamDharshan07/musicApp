import React from 'react';
import type { Playlist } from '../types';
import { Play, Plus } from 'lucide-react';

interface PlaylistCardProps {
  playlist: Playlist;
  onSelect: (playlist: Playlist) => void;
}

export const PlaylistCard: React.FC<PlaylistCardProps> = ({ playlist, onSelect }) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-200 cursor-pointer"
      onClick={() => onSelect(playlist)}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{playlist.name}</h3>
        <Play className="w-5 h-5 text-purple-600" />
      </div>
      <p className="text-sm text-gray-600">{playlist.songs.length} songs</p>
    </div>
  );
};