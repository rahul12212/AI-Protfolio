'use client';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, FileText, Phone, MapPin, Send, ExternalLink } from 'lucide-react';
import { portfolioData } from '@/lib/portfolio-data';
import { useEffect, useState } from 'react';
import BatmanLogo from '@/components/animations/BatmanLogo';

const contactMethods = [
  {
    icon: Mail,
    label: 'Email',
    value: portfolioData.personal.email,
    href: `mailto:${portfolioData.personal.email}`,
    color: 'from-blue-500 to-cyan-500',
    description: 'Best for professional inquiries'
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'rahuldks',
    href: portfolioData.personal.linkedin,
    color: 'from-blue-600 to-blue-400',
    description: 'Let\'s connect professionally'
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'rahuldks',
    href: portfolioData.personal.github,
    color: 'from-purple-600 to-pink-500',
    description: 'Check out my repositories'
  },
  {
    icon: Phone,
    label: 'Phone',
    value: portfolioData.personal.phone,
    href: `tel:${portfolioData.personal.phone}`,
    color: 'from-green-500 to-emerald-500',
    description: 'For urgent matters'
  }
];

export default function Contact() {
  const [isBatman, setIsBatman] = useState(false);

  useEffect(() => {
    const checkBatmanMode = () => {
      setIsBatman(document.documentElement.classList.contains('batman'));
    };

    checkBatmanMode();

    const observer = new MutationObserver(checkBatmanMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="container py-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        {isBatman && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 flex justify-center"
          >
            <BatmanLogo className="text-[hsl(var(--accent))]" size={120} useGif />
          </motion.div>
        )}
        <div className="tag mx-auto mb-4 w-max scan-lines">
          {isBatman ? '[🦇] // signal' : '[04] // connect'}
        </div>
        <h1 className="mb-4 text-5xl font-extrabold tracking-tight md:text-6xl">
          <span className="bg-gradient-to-r from-[hsl(var(--fg))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
            {isBatman ? 'Send the Bat-Signal' : "Let's Build Together"}
          </span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-neutral-400">
          {isBatman ? (
            <>
              Gotham needs heroes. Whether you need help fighting crime with AI or building the next generation of intelligent systems.
              <br />
              <span className="text-[hsl(var(--accent))]">The Dark Knight is ready</span> to answer your call.
            </>
          ) : (
            <>
              Open to opportunities in AI/ML engineering, research positions, and innovative projects.
              <br />
              <span className="text-[hsl(var(--accent))]">Available for full-time roles</span> starting immediately.
            </>
          )}
        </p>
      </motion.div>

      {/* Contact Cards */}
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {contactMethods.map((method, i) => {
            const Icon = method.icon;
            return (
              <motion.a
                key={method.label}
                href={method.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group card relative overflow-hidden p-6 transition-all hover:scale-105 hover:shadow-glow"
              >
                {/* Gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${method.color} opacity-0 transition-opacity duration-300 group-hover:opacity-10`} />

                <div className="relative">
                  {/* Icon */}
                  <div className="mb-4 flex items-center justify-between">
                    <div className="rounded-lg border border-[hsl(var(--accent))]/30 bg-[hsl(var(--accent))]/10 p-3">
                      <Icon className="h-6 w-6 text-[hsl(var(--accent))]" />
                    </div>
                    <ExternalLink className="h-4 w-4 text-neutral-400 opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>

                  {/* Label & Value */}
                  <div className="mb-2 text-sm font-medium text-neutral-400">
                    {method.label}
                  </div>
                  <div className="mb-2 text-lg font-bold break-all">
                    {method.value}
                  </div>
                  <div className="text-xs text-neutral-500">
                    {method.description}
                  </div>
                </div>

                {/* Corner glow */}
                <div className="absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-[hsl(var(--accent))]/0 blur-2xl transition-all group-hover:bg-[hsl(var(--accent))]/30" />
              </motion.a>
            );
          })}
        </div>

        {/* Resume Download */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <a
            href="/Rahul_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group card flex items-center justify-between p-6 transition-all hover:scale-[1.02] hover:shadow-glow"
          >
            <div className="flex items-center gap-4">
              <div className="rounded-lg border border-[hsl(var(--accent))]/30 bg-[hsl(var(--accent))]/10 p-3">
                <FileText className="h-6 w-6 text-[hsl(var(--accent))]" />
              </div>
              <div>
                <div className="text-lg font-bold">Download Resume</div>
                <div className="text-sm text-neutral-400">
                  Complete CV with detailed experience and projects
                </div>
              </div>
            </div>
            <Send className="h-5 w-5 text-[hsl(var(--accent))] transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>

        {/* Location Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card p-8 text-center"
        >
          {isBatman ? (
            <>
              <BatmanLogo className="mx-auto mb-4 text-[hsl(var(--accent))]" size={60} />
              <div className="mb-2 text-2xl font-bold">
                {portfolioData.personal.location} (Gotham City)
              </div>
              <div className="text-neutral-400">
                Protecting {portfolioData.personal.location} and ready to defend projects worldwide from bugs and inefficiencies
              </div>
            </>
          ) : (
            <>
              <MapPin className="mx-auto mb-4 h-8 w-8 text-[hsl(var(--accent))]" />
              <div className="mb-2 text-2xl font-bold">
                {portfolioData.personal.location}
              </div>
              <div className="text-neutral-400">
                Based in {portfolioData.personal.location}, open to remote and hybrid opportunities worldwide
              </div>
            </>
          )}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="mb-6 text-neutral-400">
            {isBatman ? 'Equipped with skills in:' : 'Currently seeking opportunities in:'}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {(isBatman ? [
              '🦇 AI Crime Fighting',
              '🦇 ML Vigilante Systems',
              '🦇 Neural Networks',
              '🦇 Dark Data Science',
              '🦇 Computer Vision',
              '🦇 NLP Detective'
            ] : [
              'AI/ML Engineering',
              'Research Scientist',
              'Data Science',
              'Full-Stack ML',
              'Computer Vision',
              'NLP Engineer'
            ]).map((role, i) => (
              <motion.span
                key={role}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + i * 0.05 }}
                className="tag cursor-default transition-all hover:scale-110 hover:border-[hsl(var(--accent))]/70 hover:bg-[hsl(var(--accent))]/20 hover:shadow-glow"
              >
                {role}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
