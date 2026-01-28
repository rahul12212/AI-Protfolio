'use client';
import { useEffect, useState } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

export default function GlitchText({ text, className = '', as: Component = 'span' }: GlitchTextProps) {
  const [glitchText, setGlitchText] = useState(text);
  const [isGlitching, setIsGlitching] = useState(false);
  const [layers, setLayers] = useState({ r: text, g: text, b: text });

  useEffect(() => {
    const glitchChars = '█▓▒░01@#$%&*■□▪▫ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    const glitch = () => {
      setIsGlitching(true);
      let iteration = 0;
      const maxIterations = 8;

      const interval = setInterval(() => {
        // Create heavily distorted text
        setGlitchText(
          text
            .split('')
            .map((char, index) => {
              if (Math.random() > 0.7) {
                return glitchChars[Math.floor(Math.random() * glitchChars.length)];
              }
              return char;
            })
            .join('')
        );

        // Create RGB split layers
        setLayers({
          r: text.split('').map((char, i) =>
            Math.random() > 0.8 ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : char
          ).join(''),
          g: text.split('').map((char, i) =>
            Math.random() > 0.8 ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : char
          ).join(''),
          b: text.split('').map((char, i) =>
            Math.random() > 0.8 ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : char
          ).join('')
        });

        iteration++;

        if (iteration > maxIterations) {
          clearInterval(interval);
          setGlitchText(text);
          setLayers({ r: text, g: text, b: text });
          setIsGlitching(false);
        }
      }, 40);

      return () => clearInterval(interval);
    };

    // More frequent glitch effect every 3-6 seconds
    const randomGlitch = () => {
      const delay = Math.random() * 3000 + 3000;
      const timeout = setTimeout(() => {
        glitch();
        randomGlitch();
      }, delay);
      return timeout;
    };

    const timeout = randomGlitch();

    return () => clearTimeout(timeout);
  }, [text]);

  return (
    <Component
      className={`relative inline-block ${className}`}
      style={{
        animation: isGlitching ? 'glitch-intense 0.2s infinite' : 'none',
      }}
    >
      {/* RGB Split layers */}
      {isGlitching && (
        <>
          <span
            className="absolute inset-0 mix-blend-screen opacity-80"
            style={{
              color: '#00ffff',
              transform: 'translate(-3px, -2px)',
              textShadow: '2px 0 #00ffff',
            }}
          >
            {layers.r}
          </span>
          <span
            className="absolute inset-0 mix-blend-screen opacity-80"
            style={{
              color: '#ff00ff',
              transform: 'translate(3px, 2px)',
              textShadow: '-2px 0 #ff00ff',
            }}
          >
            {layers.g}
          </span>
          <span
            className="absolute inset-0 mix-blend-screen opacity-60"
            style={{
              color: '#ffff00',
              transform: 'translate(0, 3px)',
            }}
          >
            {layers.b}
          </span>
        </>
      )}

      <span className="relative z-10">{glitchText}</span>

      <style jsx>{`
        @keyframes glitch-intense {
          0% {
            transform: translate(0) skew(0deg);
            filter: hue-rotate(0deg);
          }
          10% {
            transform: translate(-5px, 2px) skew(5deg);
            filter: hue-rotate(90deg);
          }
          20% {
            transform: translate(5px, -2px) skew(-5deg);
            filter: hue-rotate(180deg);
          }
          30% {
            transform: translate(-3px, -3px) skew(3deg);
            filter: hue-rotate(270deg);
          }
          40% {
            transform: translate(3px, 3px) skew(-3deg);
            filter: hue-rotate(360deg);
          }
          50% {
            transform: translate(-2px, 2px) skew(2deg);
            filter: hue-rotate(45deg);
          }
          60% {
            transform: translate(2px, -2px) skew(-2deg);
            filter: hue-rotate(135deg);
          }
          70% {
            transform: translate(-4px, 0) skew(4deg);
            filter: hue-rotate(225deg);
          }
          80% {
            transform: translate(4px, 0) skew(-4deg);
            filter: hue-rotate(315deg);
          }
          90% {
            transform: translate(0, -4px) skew(1deg);
            filter: hue-rotate(180deg);
          }
          100% {
            transform: translate(0) skew(0deg);
            filter: hue-rotate(0deg);
          }
        }
      `}</style>
    </Component>
  );
}
