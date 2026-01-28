
'use client';
import { useEffect, useState } from 'react'; const opts=['violet','emerald','sky','rose','amber'] as const; type O=typeof opts[number];
export default function AccentPicker(){ const [accent,setAccent]=useState<O>('violet');
  useEffect(()=>{const s=localStorage.getItem('accent') as O|null; if(s) setAccent(s)},[]);
  useEffect(()=>{document.documentElement.setAttribute('data-accent',accent); localStorage.setItem('accent',accent)},[accent]);
  return <div className="flex items-center gap-2">{opts.map(o=>(<button key={o} aria-label={o} onClick={()=>setAccent(o)}
    className={`h-6 w-6 rounded-full ring-2 ring-border ${accent===o?'outline outline-2 outline-[hsl(var(--accent))]':''}`} data-accent={o} style={{backgroundColor:'hsl(var(--accent))'}}/>))}</div>
}
