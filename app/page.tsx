'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import ChatBox from '@/components/chat/ChatBox';
import GlitchText from '@/components/animations/GlitchText';
import SequentialGlitch from '@/components/animations/SequentialGlitch';
import TerminalText from '@/components/animations/TerminalText';
import { Brain, Sparkles, Code2, Award, TrendingUp, Zap } from 'lucide-react';
import { portfolioData } from '@/lib/portfolio-data';

export default function Home() {
  return (
    <div className="container py-16">
      {/* Hero Section */}
      <div className="grid min-h-[80vh] grid-cols-1 items-center gap-12 md:grid-cols-2">
        {/* Left: Text Content */}
        <div className="space-y-8">
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="tag w-max scan-lines">[00] // home</div>

            {/* Name with Sequential Glitch */}
            <h1 className="relative text-5xl font-extrabold leading-tight sm:text-6xl md:text-7xl">
              <SequentialGlitch
                words={['RAHUL', 'DILEEP', 'KUMAR']}
                className="hero-name"
              />
            </h1>

            {/* Roles with Terminal Effect */}
            <div className="flex items-center gap-3 text-2xl font-bold text-[hsl(var(--accent))] md:text-3xl">
              <Code2 className="h-8 w-8 flex-shrink-0" />
              <TerminalText
                texts={[
                  'AI Engineer',
                  'ML Researcher',
                  'Data Scientist',
                  'Full-Stack Developer',
                  'Patent Holder'
                ]}
                className="font-mono"
              />
            </div>

            {/* Tagline */}
            <p className="text-xl text-neutral-300 md:text-2xl">
              {portfolioData.personal.tagline}
            </p>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-4"
          >
            {[
              { icon: TrendingUp, label: '3+ Years', desc: 'Industry Exp.' },
              { icon: Award, label: 'Patented', desc: 'AI Innovation' },
              { icon: Brain, label: '8+', desc: 'Major Projects' }
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-3 rounded-lg border border-[hsl(var(--accent))]/30 bg-[hsl(var(--accent))]/10 px-4 py-3 backdrop-blur-sm"
                >
                  <Icon className="h-5 w-5 text-[hsl(var(--accent))]" />
                  <div>
                    <div className="text-lg font-bold leading-none">{stat.label}</div>
                    <div className="text-xs text-neutral-400">{stat.desc}</div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-3"
          >
            <a
              className="group flex items-center gap-2 rounded-lg border border-[hsl(var(--accent))]/50 bg-[hsl(var(--accent))]/10 px-6 py-3 font-medium transition-all hover:scale-105 hover:shadow-glow"
              href="/Rahul_Resume.pdf"
              target="_blank"
            >
              <span>Download Resume</span>
              <Zap className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              className="group flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3 font-medium transition-all hover:scale-105 hover:border-[hsl(var(--accent))]/50 hover:bg-[hsl(var(--accent))]/10"
              href="https://www.linkedin.com/in/rahuldks/"
              target="_blank"
            >
              LinkedIn
            </a>
            <a
              className="group flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3 font-medium transition-all hover:scale-105 hover:border-[hsl(var(--accent))]/50 hover:bg-[hsl(var(--accent))]/10"
              href="mailto:rahuldk302002@gmail.com"
            >
              Email
            </a>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="space-y-4"
          >
            <p className="max-w-xl text-lg leading-relaxed text-neutral-300">
              {portfolioData.personal.summary}
            </p>

            {/* Highlights */}
            <div className="flex flex-wrap gap-2">
              {[
                { icon: Sparkles, text: 'Research @ UB' },
                { icon: Code2, text: 'Production ML' },
                { icon: Brain, text: 'Causal AI' }
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.text}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + i * 0.05 }}
                    className="flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1.5 text-sm backdrop-blur-sm"
                  >
                    <Icon className="h-3.5 w-3.5 text-[hsl(var(--accent))]" />
                    <span>{item.text}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Right: Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative mx-auto w-full max-w-md"
        >
          {/* Animated rings */}
          <div className="absolute inset-0 -z-10">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute inset-0 rounded-full border-2 border-[hsl(var(--accent))]/20"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.1, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 1,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>

          {/* Glow effect */}
          <div className="absolute -inset-8 rounded-full bg-gradient-to-r from-[hsl(var(--accent))]/20 via-transparent to-[hsl(var(--accent))]/20 blur-3xl" />

          {/* Image container */}
          <div className="relative aspect-square overflow-hidden rounded-3xl border-4 border-[hsl(var(--accent))]/30 shadow-glow">
            <Image
              src="/avatar.jpg"
              alt="Rahul D. Kumar"
              fill
              className="object-cover"
              priority
            />

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-lg border border-[hsl(var(--accent))]/30 bg-black/80 p-3 backdrop-blur-md available-badge"
            >
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                <span className="text-sm font-medium text-white">Available for hire</span>
              </div>
              <Brain className="h-4 w-4 text-[hsl(var(--accent))]" />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* AI Chat Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="mt-20"
      >
        <div className="mb-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mx-auto mb-4 flex items-center justify-center gap-2"
          >
            <Sparkles className="h-6 w-6 text-[hsl(var(--accent))]" />
            <h2 className="text-3xl font-bold">Ask My AI Assistant</h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-neutral-400"
          >
            Powered by Groq's ultra-fast LLM inference. Ask anything about my skills, projects, or experience!
          </motion.p>
        </div>
        <ChatBox />
      </motion.div>
    </div>
  );
}
