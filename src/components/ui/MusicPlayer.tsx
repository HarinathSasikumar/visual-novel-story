import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPlay, FiPause, FiVolume2, FiVolumeX } from 'react-icons/fi';
import { useNovelStore } from '../../store/useNovelStore';

interface MusicPlayerProps {
  src?: string;
  chapterTitle: string;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ src, chapterTitle }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { isMuted, volume, isPlaying, toggleMute, setVolume, setIsPlaying } = useNovelStore();

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = isMuted ? 0 : volume;
  }, [isMuted, volume]);

  const handleTogglePlay = () => {
    const audio = audioRef.current;
    if (!audio || !src) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 rounded-full backdrop-blur-md bg-white/10 dark:bg-black/30 border border-white/20 dark:border-white/10 shadow-warm"
      style={{ maxWidth: 'calc(100vw - 2rem)' }}
    >
      {src && <audio ref={audioRef} src={src} loop />}

      {/* Play/Pause */}
      <button
        onClick={handleTogglePlay}
        disabled={!src}
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
        className="text-gold-400 hover:text-gold-300 transition-colors disabled:opacity-40 w-8 h-8 flex items-center justify-center rounded-full active:scale-90"
        style={{ minHeight: 'unset', minWidth: 'unset' }}
      >
        {isPlaying ? <FiPause size={16} /> : <FiPlay size={16} />}
      </button>

      {/* Volume controls — hidden on small mobile, shown on sm+ */}
      <div className="hidden sm:flex items-center gap-2">
        <button
          onClick={toggleMute}
          aria-label={isMuted ? 'Unmute' : 'Mute'}
          className="text-sepia-400 hover:text-gold-400 transition-colors w-7 h-7 flex items-center justify-center active:scale-90"
          style={{ minHeight: 'unset', minWidth: 'unset' }}
        >
          {isMuted ? <FiVolumeX size={14} /> : <FiVolume2 size={14} />}
        </button>
        <input
          type="range"
          min={0}
          max={1}
          step={0.05}
          value={isMuted ? 0 : volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-14 sm:w-20"
          aria-label="Volume"
          style={{ minHeight: 'unset', minWidth: 'unset' }}
        />
      </div>

      {/* Mute-only button on mobile */}
      <button
        onClick={toggleMute}
        aria-label={isMuted ? 'Unmute' : 'Mute'}
        className="sm:hidden text-sepia-400 hover:text-gold-400 transition-colors w-7 h-7 flex items-center justify-center active:scale-90"
        style={{ minHeight: 'unset', minWidth: 'unset' }}
      >
        {isMuted ? <FiVolumeX size={14} /> : <FiVolume2 size={14} />}
      </button>

      {/* Track name — hidden on mobile, shown on md+ */}
      <span className="hidden md:block text-xs text-sepia-400 dark:text-sepia-500 max-w-[120px] truncate font-inter">
        {src ? chapterTitle : 'No track'}
      </span>
    </motion.div>
  );
};

export default MusicPlayer;
