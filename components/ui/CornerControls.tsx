'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette } from 'lucide-react';

const accentColors = [
  { name: 'Sky', value: 'sky', color: 'hsl(180 100% 50%)' },
  { name: 'Emerald', value: 'emerald', color: 'hsl(160 95% 45%)' },
  { name: 'Violet', value: 'violet', color: 'hsl(270 95% 65%)' },
  { name: 'Rose', value: 'rose', color: 'hsl(350 90% 60%)' },
  { name: 'Amber', value: 'amber', color: 'hsl(35 100% 50%)' },
];

export default function CornerControls() {
  const [theme, setTheme] = useState<'light' | 'dark' | 'batman'>('dark');
  const [accent, setAccent] = useState('sky');
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);

  // Load theme and accent from localStorage
  useEffect(() => {
    const savedTheme = (localStorage.getItem('theme') || 'dark') as 'light' | 'dark' | 'batman';
    const savedAccent = localStorage.getItem('accent') || 'sky';

    console.log('🎨 CornerControls: Loading theme:', savedTheme);
    setTheme(savedTheme);
    setAccent(savedAccent);

    document.documentElement.classList.remove('light', 'batman');
    if (savedTheme === 'light') {
      document.documentElement.classList.add('light');
    } else if (savedTheme === 'batman') {
      document.documentElement.classList.add('batman');
    }
    document.documentElement.setAttribute('data-accent', savedAccent);

    // Watch for external Batman mode activation (from chat)
    const observer = new MutationObserver(() => {
      const isBatman = document.documentElement.classList.contains('batman');
      const isLight = document.documentElement.classList.contains('light');
      const newTheme = isBatman ? 'batman' : isLight ? 'light' : 'dark';
      console.log('🎨 CornerControls: Theme changed to:', newTheme);
      setTheme(newTheme);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    let newTheme: 'light' | 'dark' | 'batman';

    // If in batman mode, go back to dark
    if (theme === 'batman') {
      newTheme = 'dark';
    } else {
      newTheme = theme === 'dark' ? 'light' : 'dark';
    }

    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);

    document.documentElement.classList.remove('light', 'batman');
    if (newTheme === 'light') {
      document.documentElement.classList.add('light');
    }
  };

  const changeAccent = (newAccent: string) => {
    setAccent(newAccent);
    localStorage.setItem('accent', newAccent);
    document.documentElement.setAttribute('data-accent', newAccent);
    setIsColorPickerOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* Color Picker Dropdown */}
      <div className="relative">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card shadow-glow backdrop-blur-sm transition-all hover:border-[hsl(var(--accent))]/50"
          title="Change accent color"
        >
          <Palette className="h-5 w-5 text-[hsl(var(--accent))]" />
        </motion.button>

        <AnimatePresence>
          {isColorPickerOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-full right-0 mb-2 w-48 rounded-xl border border-border bg-card p-3 shadow-glow backdrop-blur-md"
            >
              <div className="mb-2 text-xs font-medium text-neutral-400">ACCENT COLOR</div>
              <div className="space-y-2">
                {accentColors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => changeAccent(color.value)}
                    className={`flex w-full items-center gap-3 rounded-lg border p-2 transition-all ${
                      accent === color.value
                        ? 'border-[hsl(var(--accent))] bg-[hsl(var(--accent))]/10'
                        : 'border-transparent hover:border-border hover:bg-card/50'
                    }`}
                  >
                    <div
                      className="h-5 w-5 rounded-full border-2 border-white/20 shadow-lg"
                      style={{ backgroundColor: color.color }}
                    />
                    <span className="text-sm font-medium">{color.name}</span>
                    {accent === color.value && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="ml-auto h-2 w-2 rounded-full bg-[hsl(var(--accent))]"
                      />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Animated Theme Toggle */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleTheme}
        className="relative h-12 w-12 overflow-hidden rounded-full border border-border bg-card shadow-glow backdrop-blur-sm transition-all hover:border-[hsl(var(--accent))]/50"
        title={theme === 'batman' ? 'Exit Batman mode' : `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      >
        {/* Batman Symbol 🦇 */}
        <motion.div
          initial={false}
          animate={{
            y: theme === 'batman' ? '0%' : '-100%',
            scale: theme === 'batman' ? 1 : 0.5,
            opacity: theme === 'batman' ? 1 : 0,
          }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <svg
            className="h-7 w-7 text-[hsl(var(--accent))]"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2c-1.5 0-2.5.5-3.5 1.5-1 1-1.5 2-2 3-.5.5-1 1-1.5 1s-.5 0-1-.5c-.5-.5-1-1-1.5-1s-1.5.5-1.5 1.5v3c0 1.5.5 2.5 1.5 3.5s2 1.5 3 1.5c.5 0 1-.5 1.5-1 .5-.5 1-1 1.5-1.5 0-.5.5-1 1-1.5.5-.5 1-.5 1.5-.5s1 0 1.5.5c.5.5 1 1 1 1.5.5.5 1 1 1.5 1.5s1 1 1.5 1c1 0 2-.5 3-1.5s1.5-2 1.5-3.5v-3c0-1-.5-1.5-1.5-1.5s-1 .5-1.5 1c-.5.5-.5.5-1 .5s-1-.5-1.5-1c-.5-1-1-2-2-3-1-1-2-1.5-3.5-1.5zm-8 13c-1 0-2 1-2 2s1 2 2 2h16c1 0 2-1 2-2s-1-2-2-2z"/>
          </svg>
        </motion.div>

        {/* Sun */}
        <motion.div
          initial={false}
          animate={{
            y: theme === 'light' ? '0%' : theme === 'batman' ? '100%' : '-100%',
            rotate: theme === 'light' ? 0 : -90,
            opacity: theme === 'light' ? 1 : 0,
          }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <svg
            className="h-6 w-6 text-amber-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
          </svg>
        </motion.div>

        {/* Moon */}
        <motion.div
          initial={false}
          animate={{
            y: theme === 'dark' ? '0%' : theme === 'batman' ? '100%' : '100%',
            rotate: theme === 'dark' ? 0 : 90,
            opacity: theme === 'dark' ? 1 : 0,
          }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <svg
            className="h-6 w-6 text-[hsl(var(--accent))]"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </motion.div>

        {/* Stars (appear with moon) */}
        <AnimatePresence>
          {theme === 'dark' && (
            <>
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.3 }}
                  className="absolute h-1 w-1 rounded-full bg-[hsl(var(--accent))]"
                  style={{
                    top: `${20 + i * 15}%`,
                    left: `${20 + i * 20}%`,
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>

        {/* Sun rays (appear with sun) */}
        <AnimatePresence>
          {theme === 'light' && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="absolute inset-0"
            >
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 + i * 0.05 }}
                  className="absolute h-0.5 w-1 bg-amber-400/50"
                  style={{
                    top: '50%',
                    left: '50%',
                    transformOrigin: '0% 50%',
                    transform: `rotate(${i * 45}deg) translateX(12px)`,
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
