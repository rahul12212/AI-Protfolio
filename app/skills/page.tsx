'use client';
import { motion } from 'framer-motion';
import { Code2, Brain, Database, Cloud, Globe, Award } from 'lucide-react';
import { portfolioData } from '@/lib/portfolio-data';

const skillCategories = [
  {
    icon: Code2,
    title: 'Programming Languages',
    items: portfolioData.skills.languages,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Brain,
    title: 'AI/ML Frameworks',
    items: portfolioData.skills.aiMl,
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: Database,
    title: 'Data Tools & Analysis',
    items: portfolioData.skills.dataTools,
    color: 'from-emerald-500 to-green-500'
  },
  {
    icon: Globe,
    title: 'Web & Full Stack',
    items: portfolioData.skills.webFullStack,
    color: 'from-orange-500 to-red-500'
  },
  {
    icon: Database,
    title: 'Databases',
    items: portfolioData.skills.databases,
    color: 'from-yellow-500 to-amber-500'
  },
  {
    icon: Cloud,
    title: 'Cloud & DevOps',
    items: portfolioData.skills.cloudDevOps,
    color: 'from-indigo-500 to-blue-500'
  }
];

export default function Skills() {
  return (
    <div className="container py-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <div className="tag mb-4 w-max scan-lines">[01] // expertise</div>
        <h1 className="mb-4 text-5xl font-extrabold tracking-tight md:text-6xl">
          <span className="bg-gradient-to-r from-[hsl(var(--fg))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
            Technical Arsenal
          </span>
        </h1>
        <p className="max-w-2xl text-lg text-neutral-400">
          Comprehensive expertise across the full AI/ML stack — from research to production deployment.
          <span className="ml-2 text-[hsl(var(--accent))]">3+ years</span> of hands-on industry experience.
        </p>
      </motion.div>

      {/* Certifications Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card mb-8 overflow-hidden p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <Award className="h-6 w-6 text-[hsl(var(--accent))]" />
          <h2 className="text-xl font-bold">Certifications & Credentials</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {portfolioData.certifications.map((cert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.05 }}
              className="flex items-center gap-3 rounded-lg border border-border/50 bg-card/50 p-3 backdrop-blur-sm transition-all hover:border-[hsl(var(--accent))]/50 hover:bg-[hsl(var(--accent))]/5"
            >
              <div className="h-2 w-2 rounded-full bg-[hsl(var(--accent))]" />
              <div className="flex-1">
                <div className="text-sm font-medium">{cert.name}</div>
                <div className="text-xs text-neutral-500">{cert.issuer}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {skillCategories.map((category, catIndex) => {
          const Icon = category.icon;
          return (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + catIndex * 0.1 }}
              className="group card relative overflow-hidden p-6 transition-all hover:scale-[1.02]"
            >
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

              {/* Content */}
              <div className="relative">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-lg border border-[hsl(var(--accent))]/30 bg-[hsl(var(--accent))]/10 p-2">
                    <Icon className="h-5 w-5 text-[hsl(var(--accent))]" />
                  </div>
                  <h3 className="text-lg font-bold">{category.title}</h3>
                  <div className="ml-auto rounded-full border border-[hsl(var(--accent))]/30 bg-[hsl(var(--accent))]/10 px-2 py-0.5 text-xs font-mono text-[hsl(var(--accent))]">
                    {category.items.length}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.items.map((item, i) => (
                    <motion.span
                      key={item}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + catIndex * 0.1 + i * 0.02 }}
                      className="tag group/tag cursor-default transition-all hover:scale-110 hover:border-[hsl(var(--accent))]/70 hover:bg-[hsl(var(--accent))]/20 hover:shadow-glow"
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Corner accent */}
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[hsl(var(--accent))]/5 blur-2xl transition-all group-hover:bg-[hsl(var(--accent))]/10" />
            </motion.div>
          );
        })}
      </div>

      {/* Stats Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4"
      >
        {[
          { label: 'Languages', value: '7+' },
          { label: 'Frameworks', value: '20+' },
          { label: 'Cloud Services', value: '10+' },
          { label: 'Years Experience', value: '3+' }
        ].map((stat, i) => (
          <div
            key={i}
            className="card p-4 text-center transition-all hover:scale-105 hover:shadow-glow"
          >
            <div className="text-3xl font-bold text-[hsl(var(--accent))]">
              {stat.value}
            </div>
            <div className="text-sm text-neutral-400">{stat.label}</div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
