'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import BatmanLogo from '../animations/BatmanLogo';

export default function BatmanBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if Batman mode is active
    const checkBatmanMode = () => {
      const isBatman = document.documentElement.classList.contains('batman');
      setShowBanner(isBatman);
    };

    checkBatmanMode();

    // Watch for class changes
    const observer = new MutationObserver(checkBatmanMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  const exitBatmanMode = () => {
    document.documentElement.classList.remove('batman');
    localStorage.setItem('theme', 'dark');
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          className="fixed top-20 left-1/2 z-50 -translate-x-1/2"
        >
          <div className="flex items-center gap-4 rounded-2xl border-2 border-[hsl(var(--accent))] bg-black/95 px-8 py-4 shadow-2xl backdrop-blur-md">
            {/* Batman icon - using animated GIF */}
            <BatmanLogo className="text-[hsl(var(--accent))]" size={50} animate useGif />

            {/* Text */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <div className="text-lg font-bold text-[hsl(var(--accent))] tracking-wide">
                  BATMAN MODE
                </div>
                <div className="h-2 w-2 rounded-full bg-[hsl(var(--accent))] animate-pulse" />
              </div>
              <div className="text-xs text-[hsl(var(--accent))]/70 font-mono">
                🦇 I am vengeance. I am the night. I am BATMAN.
              </div>
            </div>

            {/* Exit button */}
            <button
              onClick={exitBatmanMode}
              className="group ml-2 flex h-8 w-8 items-center justify-center rounded-full border border-[hsl(var(--accent))]/50 bg-[hsl(var(--accent))]/10 transition-all hover:bg-[hsl(var(--accent))]/20 hover:scale-110"
              title="Exit Batman Mode"
            >
              <X className="h-4 w-4 text-[hsl(var(--accent))] group-hover:rotate-90 transition-transform" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
