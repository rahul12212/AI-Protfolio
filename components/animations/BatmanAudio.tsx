'use client';
import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BatmanAudio() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [showBatman, setShowBatman] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Check if Batman mode is active
  useEffect(() => {
    const checkBatmanMode = () => {
      const isBatman = document.documentElement.classList.contains('batman');
      console.log('🦇 Batman mode active:', isBatman);
      setShowBatman(isBatman);

      if (!isBatman && audioRef.current) {
        // Stop when exiting Batman mode
        console.log('🦇 Stopping Batman theme');
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsPlaying(false);
      }
    };

    checkBatmanMode();

    const observer = new MutationObserver(checkBatmanMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => {
      observer.disconnect();
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const togglePlayback = async () => {
    console.log('🔊 Audio button clicked');
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        console.log('⏸️ Pausing audio');
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        console.log('▶️ Playing audio');
        audioRef.current.volume = 0.3; // 30% volume
        await audioRef.current.play();
        console.log('✅ Audio is playing!');
        setIsPlaying(true);
      }
    } catch (err) {
      console.error('❌ Failed to play/pause audio:', err);
      alert('Audio failed to play. Please check:\n1. batman-theme.mp3 exists in /public folder\n2. File is a valid MP3\n3. Browser allows audio playback');
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
    console.log('🔇 Mute toggled:', !isMuted);
  };

  if (!showBatman) return null;

  return (
    <>
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src="/batman-theme.mp3"
        loop
        preload="auto"
      />

      {/* Play/Pause button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ delay: 1, type: 'spring' }}
        onClick={togglePlayback}
        className="fixed bottom-6 left-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border-2 border-[hsl(var(--accent))] bg-black/90 shadow-2xl backdrop-blur-md transition-all hover:scale-110 hover:bg-[hsl(var(--accent))]/20"
        title={isPlaying ? 'Pause Batman Theme' : 'Play Batman Theme'}
      >
        {isPlaying ? (
          <Pause className="h-6 w-6 text-[hsl(var(--accent))]" fill="currentColor" />
        ) : (
          <Play className="h-6 w-6 text-[hsl(var(--accent))] animate-pulse" fill="currentColor" />
        )}
      </motion.button>

      {/* Mute/Unmute button */}
      {isPlaying && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ delay: 1.2, type: 'spring' }}
          onClick={toggleMute}
          className="fixed bottom-6 left-24 z-50 flex h-12 w-12 items-center justify-center rounded-full border-2 border-[hsl(var(--accent))] bg-black/90 shadow-2xl backdrop-blur-md transition-all hover:scale-110 hover:bg-[hsl(var(--accent))]/20"
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? (
            <VolumeX className="h-5 w-5 text-[hsl(var(--accent))]" />
          ) : (
            <Volume2 className="h-5 w-5 text-[hsl(var(--accent))]" />
          )}
        </motion.button>
      )}


      {/* Sound waves animation */}
      {!isMuted && isPlaying && (
        <motion.div
          className="fixed bottom-6 left-36 z-50 flex items-center gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 1.4 }}
        >
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 rounded-full bg-[hsl(var(--accent))]"
              animate={{
                height: ['8px', '24px', '8px'],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </motion.div>
      )}
    </>
  );
}
