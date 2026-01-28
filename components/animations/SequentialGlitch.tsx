'use client';
import { useEffect, useState } from 'react';

interface SequentialGlitchProps {
  words: string[];
  className?: string;
}

const glitchChars = '█▓▒░01@#$%&*■□▪▫ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export default function SequentialGlitch({ words, className = '' }: SequentialGlitchProps) {
  const [displayWords, setDisplayWords] = useState<string[]>(words.map(() => ''));
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isGlitching, setIsGlitching] = useState(true);
  const [allRevealed, setAllRevealed] = useState(false);
  const [globalGlitch, setGlobalGlitch] = useState(false);

  // Sequential word reveal with glitch effect
  useEffect(() => {
    if (currentWordIndex >= words.length) {
      setAllRevealed(true);
      return;
    }

    const word = words[currentWordIndex];
    let iteration = 0;
    const maxIterations = 20;

    const interval = setInterval(() => {
      setDisplayWords((prev) => {
        const newWords = [...prev];

        if (iteration < maxIterations) {
          // Glitch effect - random characters
          newWords[currentWordIndex] = word
            .split('')
            .map((char, index) => {
              if (index < iteration / 2) {
                return char; // Reveal character
              }
              return glitchChars[Math.floor(Math.random() * glitchChars.length)];
            })
            .join('');
        } else {
          // Final reveal
          newWords[currentWordIndex] = word;
          setIsGlitching(false);

          // Move to next word after a pause
          setTimeout(() => {
            setCurrentWordIndex((prev) => prev + 1);
            setIsGlitching(true);
          }, 800);

          clearInterval(interval);
        }

        return newWords;
      });

      iteration++;
    }, 80);

    return () => clearInterval(interval);
  }, [currentWordIndex, words]);

  // Global glitch effect after all words revealed
  useEffect(() => {
    if (!allRevealed) return;

    const globalGlitchInterval = setInterval(() => {
      setGlobalGlitch(true);

      let iteration = 0;
      const glitchDuration = setInterval(() => {
        setDisplayWords((prev) =>
          prev.map((word) =>
            word
              .split('')
              .map((char) =>
                Math.random() > 0.7
                  ? glitchChars[Math.floor(Math.random() * glitchChars.length)]
                  : char
              )
              .join('')
          )
        );

        iteration++;
        if (iteration > 8) {
          clearInterval(glitchDuration);
          setDisplayWords(words);
          setGlobalGlitch(false);
        }
      }, 60);

    }, 5000); // Global glitch every 5 seconds

    return () => clearInterval(globalGlitchInterval);
  }, [allRevealed, words]);

  return (
    <div className={className}>
      {displayWords.map((word, index) => (
        <span
          key={index}
          className={`block ${
            globalGlitch || (isGlitching && index === currentWordIndex)
              ? 'animate-glitch-rgb'
              : ''
          }`}
          style={{
            opacity: word ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
        >
          {word || '\u00A0'}
          {/* RGB Split Layers */}
          {(globalGlitch || (isGlitching && index === currentWordIndex)) && (
            <>
              <span
                className="absolute inset-0 text-cyan-400 mix-blend-screen"
                style={{
                  transform: 'translate(-2px, -1px)',
                  opacity: 0.8,
                }}
              >
                {word}
              </span>
              <span
                className="absolute inset-0 text-rose-500 mix-blend-screen"
                style={{
                  transform: 'translate(2px, 1px)',
                  opacity: 0.8,
                }}
              >
                {word}
              </span>
              <span
                className="absolute inset-0 text-yellow-300 mix-blend-screen"
                style={{
                  transform: 'translate(0px, 2px)',
                  opacity: 0.6,
                }}
              >
                {word}
              </span>
            </>
          )}
        </span>
      ))}
    </div>
  );
}
