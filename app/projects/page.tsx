'use client';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Award, TrendingUp, Sparkles } from 'lucide-react';
import { portfolioData } from '@/lib/portfolio-data';

export default function Projects() {
  const featuredProjects = portfolioData.projects.filter(p => p.featured);
  const otherProjects = portfolioData.projects.filter(p => !p.featured);

  return (
    <div className="container py-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <div className="tag mb-4 w-max scan-lines">[02] // work</div>
        <h1 className="mb-4 text-5xl font-extrabold tracking-tight md:text-6xl">
          <span className="bg-gradient-to-r from-[hsl(var(--fg))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
            Featured Projects
          </span>
        </h1>
        <p className="max-w-2xl text-lg text-neutral-400">
          From patented innovations to cutting-edge AI research. Each project demonstrates
          <span className="mx-2 text-[hsl(var(--accent))]">real-world impact</span>
          and technical excellence.
        </p>
      </motion.div>

      {/* Featured Projects */}
      <div className="mb-16 space-y-8">
        <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold">
          <Sparkles className="h-6 w-6 text-[hsl(var(--accent))]" />
          Spotlight Projects
        </h2>

        {featuredProjects.map((project, i) => (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group card relative overflow-hidden p-6 transition-all hover:scale-[1.01] md:p-8"
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--accent))]/5 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

            <div className="relative">
              {/* Category & Featured Badge */}
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-[hsl(var(--accent))]/50 bg-[hsl(var(--accent))]/10 px-3 py-1 text-xs font-medium text-[hsl(var(--accent))]">
                  {project.category}
                </span>
                {project.tags.includes('Patent') && (
                  <span className="flex items-center gap-1 rounded-full border border-amber-500/50 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-400">
                    <Award className="h-3 w-3" />
                    Patented
                  </span>
                )}
              </div>

              {/* Title & Description */}
              <h3 className="mb-3 text-2xl font-bold md:text-3xl">
                {project.name}
              </h3>
              <p className="mb-4 text-base text-neutral-300">
                {project.description}
              </p>
              <p className="mb-6 text-sm text-neutral-400">
                {project.longDescription}
              </p>

              {/* Tech Stack */}
              <div className="mb-6 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="tag transition-all hover:scale-105 hover:border-[hsl(var(--accent))]/70 hover:bg-[hsl(var(--accent))]/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Impact */}
              {project.impact && (
                <div className="mb-6 flex items-start gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-3">
                  <TrendingUp className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400" />
                  <div className="text-sm text-emerald-300">{project.impact}</div>
                </div>
              )}

              {/* Links */}
              <div className="flex flex-wrap gap-3">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium transition-all hover:border-[hsl(var(--accent))]/50 hover:bg-[hsl(var(--accent))]/10 hover:shadow-glow"
                >
                  <Github className="h-4 w-4" />
                  Source Code
                  <ExternalLink className="h-3 w-3 opacity-0 transition-opacity group-hover/link:opacity-100" />
                </a>
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link flex items-center gap-2 rounded-lg border border-[hsl(var(--accent))]/50 bg-[hsl(var(--accent))]/10 px-4 py-2 text-sm font-medium transition-all hover:bg-[hsl(var(--accent))]/20 hover:shadow-glow"
                  >
                    <Sparkles className="h-4 w-4" />
                    Live Demo
                    <ExternalLink className="h-3 w-3 opacity-0 transition-opacity group-hover/link:opacity-100" />
                  </a>
                )}
              </div>
            </div>

            {/* Corner decoration */}
            <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[hsl(var(--accent))]/10 blur-3xl transition-all group-hover:bg-[hsl(var(--accent))]/20" />
          </motion.div>
        ))}
      </div>

      {/* Other Projects Grid */}
      <div>
        <h2 className="mb-6 text-2xl font-bold">Additional Projects</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {otherProjects.map((project, i) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.05 }}
              className="group card relative overflow-hidden p-6 transition-all hover:scale-105 hover:shadow-glow"
            >
              {/* Category */}
              <div className="mb-3 text-xs font-medium text-[hsl(var(--accent))]">
                {project.category}
              </div>

              {/* Title */}
              <h3 className="mb-2 text-lg font-bold line-clamp-2">
                {project.name}
              </h3>

              {/* Description */}
              <p className="mb-4 text-sm text-neutral-400 line-clamp-3">
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="mb-4 flex flex-wrap gap-1.5">
                {project.tech.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-border/50 bg-card/50 px-2 py-0.5 text-xs"
                  >
                    {tech}
                  </span>
                ))}
                {project.tech.length > 3 && (
                  <span className="rounded-full border border-border/50 bg-card/50 px-2 py-0.5 text-xs text-neutral-500">
                    +{project.tech.length - 3}
                  </span>
                )}
              </div>

              {/* Impact */}
              {project.impact && (
                <div className="mb-4 text-xs text-emerald-400">
                  <TrendingUp className="mr-1 inline h-3 w-3" />
                  {project.impact}
                </div>
              )}

              {/* Links */}
              <div className="flex gap-2 text-xs">
                <a
                  href={project.github}
                  className="link-underline flex items-center gap-1 text-neutral-400 hover:text-[hsl(var(--fg))]"
                >
                  <Github className="h-3 w-3" />
                  Code
                </a>
                {project.demo && (
                  <>
                    <span className="text-neutral-600">·</span>
                    <a
                      href={project.demo}
                      className="link-underline flex items-center gap-1 text-neutral-400 hover:text-[hsl(var(--fg))]"
                    >
                      <ExternalLink className="h-3 w-3" />
                      Demo
                    </a>
                  </>
                )}
              </div>

              {/* Hover glow */}
              <div className="absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-[hsl(var(--accent))]/0 blur-2xl transition-all group-hover:bg-[hsl(var(--accent))]/20" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Publications */}
      {portfolioData.publications && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16"
        >
          <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold">
            <Award className="h-6 w-6 text-[hsl(var(--accent))]" />
            Publications & Patents
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {portfolioData.publications.map((pub, i) => (
              <div
                key={i}
                className="card p-6 transition-all hover:scale-105 hover:shadow-glow"
              >
                <div className="mb-2 text-xs font-medium text-[hsl(var(--accent))]">
                  {pub.type} · {pub.year}
                </div>
                <div className="font-medium">{pub.title}</div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
