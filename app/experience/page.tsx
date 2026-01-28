'use client';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Calendar, TrendingUp } from 'lucide-react';
import { portfolioData } from '@/lib/portfolio-data';

export default function Experience() {
  return (
    <div className="container py-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <div className="tag mb-4 w-max scan-lines">[03] // journey</div>
        <h1 className="mb-4 text-5xl font-extrabold tracking-tight md:text-6xl">
          <span className="bg-gradient-to-r from-[hsl(var(--fg))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
            Professional Journey
          </span>
        </h1>
        <p className="max-w-2xl text-lg text-neutral-400">
          <span className="text-[hsl(var(--accent))]">3+ years</span> of delivering
          AI/ML solutions across research, enterprise, and startup environments.
          From biomedical AI to production systems serving thousands of users.
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[hsl(var(--accent))]/50 via-[hsl(var(--accent))]/20 to-transparent md:left-1/2" />

        <div className="space-y-12">
          {portfolioData.experience.map((exp, i) => {
            const isEven = i % 2 === 0;
            return (
              <motion.div
                key={exp.company + exp.role}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.2, duration: 0.5 }}
                className={`relative grid grid-cols-1 gap-8 md:grid-cols-2 ${
                  isEven ? '' : 'md:text-right'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-8 top-6 z-10 md:left-1/2 md:-ml-3">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.2 + 0.3, type: 'spring' }}
                    className="relative"
                  >
                    <div className="h-6 w-6 rounded-full border-2 border-[hsl(var(--accent))] bg-background" />
                    <div className="absolute inset-0 h-6 w-6 animate-ping rounded-full bg-[hsl(var(--accent))] opacity-20" />
                  </motion.div>
                </div>

                {/* Content */}
                <div className={`${isEven ? 'md:col-start-2' : 'md:col-start-1'}`}>
                  <div className="group card ml-16 p-6 md:ml-0 md:p-8">
                    {/* Period badge */}
                    <div className="mb-4 flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-[hsl(var(--accent))]" />
                      <span className="font-mono text-[hsl(var(--accent))]">
                        {exp.period}
                      </span>
                    </div>

                    {/* Role & Company */}
                    <h3 className="mb-2 text-2xl font-bold">{exp.role}</h3>
                    <div className="mb-4 flex flex-wrap items-center gap-2">
                      <Briefcase className="h-4 w-4 text-neutral-400" />
                      <span className="text-lg font-medium text-neutral-300">
                        {exp.company}
                      </span>
                      {exp.location && (
                        <>
                          <span className="text-neutral-600">·</span>
                          <div className="flex items-center gap-1 text-sm text-neutral-400">
                            <MapPin className="h-3 w-3" />
                            {exp.location}
                          </div>
                        </>
                      )}
                    </div>

                    {/* Description */}
                    <ul className="mb-6 space-y-3">
                      {exp.description.map((desc, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.2 + 0.4 + idx * 0.05 }}
                          className="flex gap-3 text-sm text-neutral-300"
                        >
                          <TrendingUp className="mt-0.5 h-4 w-4 flex-shrink-0 text-[hsl(var(--accent))]" />
                          <span>{desc}</span>
                        </motion.li>
                      ))}
                    </ul>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map((tag) => (
                        <span
                          key={tag}
                          className="tag transition-all hover:scale-105 hover:border-[hsl(var(--accent))]/70 hover:bg-[hsl(var(--accent))]/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Glow effect */}
                    <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[hsl(var(--accent))]/0 blur-3xl transition-all group-hover:bg-[hsl(var(--accent))]/20" />
                  </div>
                </div>

                {/* Empty space for alternating layout */}
                <div className="hidden md:block" />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Education Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-20"
      >
        <h2 className="mb-8 text-3xl font-bold">Education</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {portfolioData.education.map((edu, i) => (
            <motion.div
              key={edu.institution}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + i * 0.1 }}
              className="group card relative overflow-hidden p-6 transition-all hover:scale-105 hover:shadow-glow"
            >
              {/* Period badge */}
              <div className="mb-3 font-mono text-xs text-[hsl(var(--accent))]">
                {edu.period}
              </div>

              {/* Institution */}
              <h3 className="mb-2 text-xl font-bold">{edu.institution}</h3>

              {/* Degree */}
              <p className="mb-2 text-neutral-300">{edu.degree}</p>

              {/* Location */}
              <div className="flex items-center gap-1 text-sm text-neutral-400">
                <MapPin className="h-3 w-3" />
                {edu.location}
              </div>

              {/* Glow effect */}
              <div className="absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-[hsl(var(--accent))]/0 blur-2xl transition-all group-hover:bg-[hsl(var(--accent))]/20" />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Leadership Section */}
      {portfolioData.leadership && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="mt-16"
        >
          <h2 className="mb-6 text-2xl font-bold">Leadership & Activities</h2>
          {portfolioData.leadership.map((lead, i) => (
            <div
              key={i}
              className="card p-6 transition-all hover:shadow-glow"
            >
              <div className="mb-2 font-mono text-xs text-[hsl(var(--accent))]">
                {lead.period}
              </div>
              <h3 className="mb-1 text-lg font-bold">
                {lead.role} · {lead.organization}
              </h3>
              <p className="text-sm text-neutral-400">{lead.description}</p>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
