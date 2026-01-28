'use client';
import { useEffect, useRef } from 'react';

export default function HexGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
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

    const getAccentColor = () => {
      const hsl = getComputedStyle(document.documentElement)
        .getPropertyValue('--accent')
        .trim();
      return `hsl(${hsl})`;
    };

    const hexSize = 30;
    const hexHeight = hexSize * 2;
    const hexWidth = Math.sqrt(3) * hexSize;
    const hexVertDist = hexHeight * (3 / 4);
    const hexHorizDist = hexWidth;

    const cols = Math.ceil(canvas.width / hexHorizDist) + 2;
    const rows = Math.ceil(canvas.height / hexVertDist) + 2;

    const drawHexagon = (x: number, y: number, opacity: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        const hx = x + hexSize * Math.cos(angle);
        const hy = y + hexSize * Math.sin(angle);
        if (i === 0) {
          ctx.moveTo(hx, hy);
        } else {
          ctx.lineTo(hx, hy);
        }
      }
      ctx.closePath();

      const accentColor = getAccentColor();
      ctx.strokeStyle = accentColor;
      ctx.globalAlpha = opacity;
      ctx.lineWidth = 0.5;
      ctx.stroke();
    };

    let animationFrame = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      animationFrame++;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * hexHorizDist + ((row % 2) * hexHorizDist) / 2;
          const y = row * hexVertDist;

          // Create wave effect
          const distance = Math.sqrt(
            Math.pow(x - canvas.width / 2, 2) +
            Math.pow(y - canvas.height / 2, 2)
          );
          const wave = Math.sin(distance / 50 - animationFrame / 30) * 0.5 + 0.5;
          const opacity = wave * 0.15 + 0.05;

          drawHexagon(x, y, opacity);
        }
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-25"
      style={{ opacity: 'var(--animation-opacity, 0.4)' }}
    />
  );
}
