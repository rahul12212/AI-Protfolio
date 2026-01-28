'use client';
import { useEffect, useRef } from 'react';

export default function CircuitBoard() {
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

    interface CircuitNode {
      x: number;
      y: number;
      connections: CircuitNode[];
      active: boolean;
      pulseProgress: number;
    }

    // Create circuit nodes
    const nodes: CircuitNode[] = [];
    const nodeSpacing = 100;
    const cols = Math.ceil(canvas.width / nodeSpacing);
    const rows = Math.ceil(canvas.height / nodeSpacing);

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        nodes.push({
          x: col * nodeSpacing + (row % 2) * (nodeSpacing / 2),
          y: row * nodeSpacing,
          connections: [],
          active: Math.random() > 0.7,
          pulseProgress: Math.random(),
        });
      }
    }

    // Connect nearby nodes
    nodes.forEach((node, i) => {
      nodes.forEach((otherNode, j) => {
        if (i !== j) {
          const dx = node.x - otherNode.x;
          const dy = node.y - otherNode.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < nodeSpacing * 1.5 && Math.random() > 0.5) {
            node.connections.push(otherNode);
          }
        }
      });
    });

    let animationFrame = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      animationFrame++;

      const accentColor = getAccentColor();

      // Draw connections
      nodes.forEach((node) => {
        node.connections.forEach((connected) => {
          // Draw circuit line
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(connected.x, connected.y);
          ctx.strokeStyle = accentColor;
          ctx.globalAlpha = 0.1;
          ctx.lineWidth = 1;
          ctx.stroke();

          // Animate pulse
          if (node.active) {
            node.pulseProgress += 0.005;
            if (node.pulseProgress > 1) {
              node.pulseProgress = 0;
              node.active = Math.random() > 0.8;
            }

            const pulseX = node.x + (connected.x - node.x) * node.pulseProgress;
            const pulseY = node.y + (connected.y - node.y) * node.pulseProgress;

            ctx.beginPath();
            ctx.arc(pulseX, pulseY, 3, 0, Math.PI * 2);
            ctx.fillStyle = accentColor;
            ctx.globalAlpha = 1 - node.pulseProgress;
            ctx.fill();
          }
        });
      });

      // Draw nodes
      nodes.forEach((node) => {
        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.active ? 3 : 2, 0, Math.PI * 2);
        ctx.fillStyle = accentColor;
        ctx.globalAlpha = node.active ? 0.8 : 0.3;
        ctx.fill();

        // Random activation
        if (animationFrame % 120 === 0 && Math.random() > 0.95) {
          node.active = !node.active;
          node.pulseProgress = 0;
        }
      });

      ctx.globalAlpha = 1;
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
      className="pointer-events-none fixed inset-0 -z-20"
      style={{ opacity: 'var(--animation-opacity, 0.5)' }}
    />
  );
}
