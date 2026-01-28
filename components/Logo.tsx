'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Logo({ className = '' }: { className?: string }) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 2000);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative ${className}`}>
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10"
      >
        {/* Outer hexagon */}
        <motion.path
          d="M24 2L42 13V35L24 46L6 35V13L24 2Z"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          className="text-[hsl(var(--accent))]"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />

        {/* Inner circuit patterns */}
        <motion.path
          d="M24 12L32 17V29L24 34L16 29V17L24 12Z"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          className="text-[hsl(var(--accent))]"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isAnimating ? [0, 1, 1, 0] : 1 }}
          transition={{ duration: 2, times: [0, 0.3, 0.7, 1] }}
        />

        {/* Center dot */}
        <motion.circle
          cx="24"
          cy="24"
          r="3"
          className="fill-[hsl(var(--accent))]"
          animate={{
            scale: isAnimating ? [1, 1.5, 1] : 1,
            opacity: isAnimating ? [1, 0.5, 1] : 1,
          }}
          transition={{ duration: 2, repeat: isAnimating ? 0 : 0 }}
        />

        {/* Connection lines */}
        <motion.line
          x1="24" y1="12" x2="24" y2="17"
          stroke="currentColor"
          strokeWidth="1"
          className="text-[hsl(var(--accent))]"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        />
        <motion.line
          x1="24" y1="31" x2="24" y2="36"
          stroke="currentColor"
          strokeWidth="1"
          className="text-[hsl(var(--accent))]"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        />

        {/* Corner nodes */}
        {[
          { x: 24, y: 2 },
          { x: 42, y: 13 },
          { x: 42, y: 35 },
          { x: 24, y: 46 },
          { x: 6, y: 35 },
          { x: 6, y: 13 },
        ].map((pos, i) => (
          <motion.circle
            key={i}
            cx={pos.x}
            cy={pos.y}
            r="2"
            className="fill-[hsl(var(--accent))]"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 + i * 0.1, duration: 0.3 }}
          />
        ))}

        {/* Animated pulse ring */}
        <motion.circle
          cx="24"
          cy="24"
          r="20"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
          className="text-[hsl(var(--accent))]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </svg>

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-[hsl(var(--accent))] blur-xl"
        animate={{
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
