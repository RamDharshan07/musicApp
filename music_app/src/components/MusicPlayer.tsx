import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import type { Song } from '../types';

interface MusicPlayerProps {
  song: Song;
  isPlaying: boolean;
  onTogglePlay: () => void;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ song, isPlaying, onTogglePlay }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, song.audioUrl]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(progress);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current) {
      const progressBar = e.currentTarget;
      const clickPosition = e.clientX - progressBar.getBoundingClientRect().left;
      const progressBarWidth = progressBar.offsetWidth;
      const percentage = (clickPosition / progressBarWidth) * 100;
      const newTime = (percentage / 100) * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
      setProgress(percentage);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center space-x-4">
          <img
            src={song.coverUrl}
            alt={song.title}
            className="w-16 h-16 rounded-md object-cover"
          />
          <div className="flex-1">
            <h4 className="font-medium text-gray-800">{song.title}</h4>
            <p className="text-sm text-gray-600">{song.artist}</p>
          </div>
          <div className="flex items-center space-x-6">
            <button
              onClick={onTogglePlay}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              {isPlaying ? (
                <Pause className="w-8 h-8 text-purple-600" />
              ) : (
                <Play className="w-8 h-8 text-purple-600" />
              )}
            </button>
            <button
              onClick={toggleMute}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              {isMuted ? (
                <VolumeX className="w-6 h-6 text-gray-600" />
              ) : (
                <Volume2 className="w-6 h-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>
        <div
          className="mt-2 h-1 bg-gray-200 rounded-full cursor-pointer"
          onClick={handleProgressClick}
        >
          <div
            className="h-full bg-purple-600 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      <audio
        ref={audioRef}
        src={song.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => onTogglePlay()}
      />
    </div>
  );
};