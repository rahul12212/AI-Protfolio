
'use client';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'; import { useEffect } from 'react';
export default function GradientBlobs(){ const x=useMotionValue(0), y=useMotionValue(0); const sx=useSpring(x,{stiffness:50,damping:20}), sy=useSpring(y,{stiffness:50,damping:20});
  const tx=useTransform(sx,v=>v*-0.03), ty=useTransform(sy,v=>v*-0.03);
  useEffect(()=>{ const onMove=(e:MouseEvent)=>{ const cx=window.innerWidth/2, cy=window.innerHeight/2; x.set((e.clientX-cx)/cx); y.set((e.clientY-cy)/cy) }; window.addEventListener('mousemove',onMove); return ()=>window.removeEventListener('mousemove',onMove)},[x,y]);
  return (<motion.div style={{translateX:tx,translateY:ty}} className="pointer-events-none fixed inset-0 -z-30">
    <div className="absolute -top-20 -left-32 h-[45vmax] w-[45vmax] rounded-full" style={{background:'radial-gradient(circle at 30% 30%, hsl(var(--accent)/.35), transparent 55%)'}}/>
    <div className="absolute bottom-0 right-0 h-[38vmax] w-[38vmax] rounded-full" style={{background:'radial-gradient(circle at 70% 70%, hsl(var(--accent)/.25), transparent 50%)'}}/>
  </motion.div>)
}
