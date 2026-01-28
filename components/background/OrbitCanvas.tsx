
'use client';
import { useEffect, useRef } from 'react';

/** Animated canvas: orbiting particles + accent-colored halo that tracks cursor. */
export default function OrbitCanvas(){
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(()=>{
    const canvas = ref.current!;
    const ctx = canvas.getContext('2d')!;
    const DPR = Math.min(2, window.devicePixelRatio || 1);

    function size() {
      const w = window.innerWidth, h = window.innerHeight;
      canvas.width = Math.floor(w * DPR);
      canvas.height = Math.floor(h * DPR);
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.resetTransform?.();
      ctx.scale(DPR, DPR);
    }
    size();

    function getAccent(): string {
      const v = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '263 83% 58%';
      return `hsla(${v} / `; // use like `${accent}0.28)`
    }

    let accent = getAccent();
    const particles = Array.from({length: 140}).map((_, i) => ({
      base: Math.random() * (Math.min(window.innerWidth, window.innerHeight) * 0.45) + 60,
      phase: Math.random() * Math.PI * 2,
      speed: 0.0006 + Math.random() * 0.0018,
      size: 1.2 + Math.random() * 2.2,
      hue: 210 + Math.random() * 100,
      radialJitter: Math.random() * 18,
    }));

    let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
    const onMove = (e: MouseEvent) => { mouseX = e.clientX; mouseY = e.clientY; };
    window.addEventListener('mousemove', onMove);
    const onResize = () => size();
    window.addEventListener('resize', onResize);

    // Watch accent changes
    const mo = new MutationObserver(()=>{ accent = getAccent(); });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-accent', 'class'] });

    let raf = 0; let t0 = performance.now();
    function tick(now:number){
      const dt = now - t0; t0 = now;
      const w = window.innerWidth, h = window.innerHeight;
      ctx.clearRect(0,0,w,h);

      const inner = `${accent}0.30)`; // inner halo
      const outer = `${accent}0.0)`;  // transparent outer
      const g = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, Math.max(w,h) * 0.9);
      g.addColorStop(0, inner);
      g.addColorStop(1, outer);
      ctx.fillStyle = g;
      ctx.fillRect(0,0,w,h);

      // Slight drift center to keep motion even without cursor
      mouseX += Math.sin(now/2400) * 0.08;
      mouseY += Math.cos(now/2200) * 0.06;

      // Orbits
      particles.forEach((p, i) => {
        p.phase += p.speed * dt;
        const r = p.base + Math.sin(now/1800 + i) * p.radialJitter;
        const x = mouseX + Math.cos(p.phase) * r;
        const y = mouseY + Math.sin(p.phase) * r;
        ctx.beginPath();
        ctx.fillStyle = `hsla(${p.hue}, 70%, 62%, 0.75)`;
        ctx.arc(x, y, p.size, 0, Math.PI*2);
        ctx.fill();
      });

      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    return ()=>{
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', onResize);
      mo.disconnect();
    };
  },[]);

  return <canvas ref={ref} className="fixed inset-0 -z-20"></canvas>;
}
