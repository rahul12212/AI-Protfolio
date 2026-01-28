'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface BatSignal {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
}

export default function BatmanBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [batSignals, setBatSignals] = useState<BatSignal[]>([]);
  const [showBatman, setShowBatman] = useState(false);

  // Check if Batman mode is active
  useEffect(() => {
    const checkBatmanMode = () => {
      const isBatman = document.documentElement.classList.contains('batman');
      console.log('🦇 BatmanBackground: Batman mode active?', isBatman);
      console.log('🦇 HTML classes:', document.documentElement.className);
      setShowBatman(isBatman);

      if (isBatman) {
        // Generate floating Batman logos
        const signals: BatSignal[] = Array.from({ length: 15 }, (_, i) => ({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: 40 + Math.random() * 60,
          opacity: 0.05 + Math.random() * 0.15,
          speed: 20 + Math.random() * 40,
        }));
        setBatSignals(signals);
      }
    };

    checkBatmanMode();

    const observer = new MutationObserver(checkBatmanMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  // Canvas bat signal beam effect
  useEffect(() => {
    if (!showBatman) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    let animationId: number;
    let angle = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Bat signal searchlight effect
      const centerX = canvas.width * 0.8;
      const centerY = canvas.height * 0.2;
      const beamLength = Math.max(canvas.width, canvas.height) * 0.6;

      angle += 0.002;

      // Draw rotating beam
      const gradient = ctx.createLinearGradient(
        centerX,
        centerY,
        centerX + Math.cos(angle) * beamLength,
        centerY + Math.sin(angle) * beamLength
      );

      gradient.addColorStop(0, 'rgba(255, 215, 0, 0.3)');
      gradient.addColorStop(0.5, 'rgba(255, 215, 0, 0.1)');
      gradient.addColorStop(1, 'rgba(255, 215, 0, 0)');

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(beamLength, -50);
      ctx.lineTo(beamLength, 50);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();
      ctx.restore();

      // Draw some random lightning effects
      if (Math.random() > 0.97) {
        const startX = Math.random() * canvas.width;
        const startY = Math.random() * canvas.height * 0.3;
        ctx.strokeStyle = 'rgba(255, 215, 0, 0.4)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        for (let i = 0; i < 5; i++) {
          ctx.lineTo(
            startX + (Math.random() - 0.5) * 100,
            startY + i * 50
          );
        }
        ctx.stroke();
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [showBatman]);

  if (!showBatman) return null;

  return (
    <>
      {/* Canvas for beam effects */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-0"
        style={{ opacity: 0.6 }}
      />

      {/* Floating Batman Logos */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <AnimatePresence>
          {batSignals.map((signal) => (
            <motion.div
              key={signal.id}
              initial={{ y: '100vh', opacity: 0 }}
              animate={{
                y: '-20vh',
                opacity: [0, signal.opacity, signal.opacity, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: signal.speed,
                repeat: Infinity,
                ease: 'linear',
                delay: signal.id * 0.5,
              }}
              className="absolute"
              style={{
                left: `${signal.x}%`,
                width: `${signal.size}px`,
                height: `${signal.size}px`,
              }}
            >
              <Image
                src="/logo-batman.gif"
                alt="Batman Logo"
                width={signal.size}
                height={signal.size}
                className="opacity-30"
                unoptimized
              />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Large background Batman logos */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`large-${i}`}
            className="absolute"
            style={{
              top: `${20 + i * 30}%`,
              left: `${10 + i * 35}%`,
              width: '300px',
              height: '300px',
            }}
            animate={{
              opacity: [0.03, 0.08, 0.03],
              scale: [1, 1.1, 1],
              rotate: [0, 5, 0, -5, 0],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Image
              src="/logo-batman.gif"
              alt="Batman Logo"
              width={300}
              height={300}
              className="w-full h-full object-contain"
              unoptimized
            />
          </motion.div>
        ))}

        {/* Corner Batman symbols */}
        <motion.div
          className="absolute left-10 top-10"
          animate={{
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Image
            src="/logo-batman.gif"
            alt="Batman Logo"
            width={80}
            height={80}
            unoptimized
          />
        </motion.div>

        <motion.div
          className="absolute right-10 bottom-10"
          animate={{
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
        >
          <Image
            src="/logo-batman.gif"
            alt="Batman Logo"
            width={80}
            height={80}
            unoptimized
          />
        </motion.div>
      </div>

      {/* Gotham city silhouette overlay */}
      <div className="pointer-events-none fixed bottom-0 left-0 right-0 z-0 h-32 bg-gradient-to-t from-black/60 to-transparent" />

      {/* Stars/lightning effects */}
      <div className="pointer-events-none fixed inset-0 z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute h-1 w-1 rounded-full bg-yellow-400"
            style={{
              top: `${Math.random() * 50}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
    </>
  );
}
