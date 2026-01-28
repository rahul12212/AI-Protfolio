'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import Logo from './Logo';
import { Terminal } from 'lucide-react';

const tabs = [
  { href: '/', label: 'home', code: '00' },
  { href: '/skills', label: 'expertise', code: '01' },
  { href: '/projects', label: 'work', code: '02' },
  { href: '/experience', label: 'journey', code: '03' },
  { href: '/contact', label: 'connect', code: '04' }
];

export default function Nav() {
  const path = usePathname();

  return (
    <header className="sticky top-0 z-30 border-b border-[hsl(var(--accent))]/20 backdrop-blur-md supports-[backdrop-filter]:bg-background/80">
      <nav className="container flex h-20 items-center justify-between">
        {/* Logo and name */}
        <Link href="/" className="group flex items-center gap-3">
          <Logo className="h-12 w-12" />
          <div className="flex flex-col">
            <span className="font-bold tracking-tighter text-base leading-none text-[hsl(var(--fg))]">
              RAHUL DILEEP KUMAR
            </span>
            <span className="font-mono text-[10px] text-[hsl(var(--accent))] tracking-wider">
              <Terminal className="inline h-2.5 w-2.5 mr-1" />
              &gt; AI_ENGINEER.exe
            </span>
          </div>
        </Link>

        {/* Navigation tabs */}
        <div className="hidden md:flex items-center gap-1">
          {tabs.map((t, i) => {
            const isActive = path === t.href;
            return (
              <Link
                key={t.href}
                href={t.href}
                className="relative group px-4 py-2"
              >
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="active-nav"
                    className="absolute inset-0 rounded-lg border border-[hsl(var(--accent))]/50 bg-[hsl(var(--accent))]/10"
                    transition={{ type: 'spring', duration: 0.5 }}
                  />
                )}

                <div className="relative flex items-center gap-2">
                  <span className="font-mono text-xs text-[hsl(var(--accent))]/70 group-hover:text-[hsl(var(--accent))] transition-colors">
                    [{t.code}]
                  </span>
                  <span className={`text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-[hsl(var(--fg))]'
                      : 'text-neutral-400 group-hover:text-[hsl(var(--fg))]'
                  }`}>
                    {t.label}
                  </span>
                </div>

                {/* Hover underline */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-px bg-[hsl(var(--accent))]"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.2 }}
                />
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Mobile nav */}
      <div className="md:hidden border-t border-border/50">
        <div className="container flex items-center gap-1 overflow-x-auto py-2 scrollbar-hide">
          {tabs.map((t) => {
            const isActive = path === t.href;
            return (
              <Link
                key={t.href}
                href={t.href}
                className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-[hsl(var(--accent))]/20 text-[hsl(var(--accent))] border border-[hsl(var(--accent))]/50'
                    : 'text-neutral-400 border border-transparent'
                }`}
              >
                [{t.code}] {t.label}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
