
'use client';
import { useTheme } from 'next-themes'; import { Moon, Sun } from 'lucide-react';
export default function ThemeToggle(){ const {theme,setTheme}=useTheme(); const dark=theme!=='light';
  return <button onClick={()=>setTheme(dark?'light':'dark')} className="tag flex items-center gap-2">{dark?<Sun size={16}/>:<Moon size={16}/>} {dark?'Light':'Dark'}</button>
}
