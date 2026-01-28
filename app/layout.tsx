
import './globals.css';
import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import { Providers } from '@/components/Providers';
import PageFade from '@/components/PageFade';
import NeuralNetwork from '@/components/animations/NeuralNetwork';
import HexGrid from '@/components/animations/HexGrid';
import BinaryRain from '@/components/animations/BinaryRain';
import CircuitBoard from '@/components/animations/CircuitBoard';
import CornerControls from '@/components/ui/CornerControls';
import BatmanBanner from '@/components/ui/BatmanBanner';
import BatmanBackground from '@/components/animations/BatmanBackground';
import BatmanAudio from '@/components/animations/BatmanAudio';

export const metadata: Metadata = {
  title: 'Rahul Dileep Kumar — AI Engineer & Data Scientist',
  description: '3+ Years Industry Experience | Research Assistant @ UB | Patented AI Innovator | Expert in NLP, Computer Vision, Causal AI & Full-Stack ML Systems'
};

export default function RootLayout({children}:{children:React.ReactNode}){
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          {/* Tech/Hacker aesthetic - darker, more professional */}
          <BinaryRain />
          <CircuitBoard />
          <NeuralNetwork />
          <HexGrid />
          {/* 🦇 BATMAN MODE - Complete Gotham Transformation */}
          <BatmanBackground />
          <BatmanBanner />
          <BatmanAudio />
          <Nav />
          <main className="relative min-h-screen z-10">
            <PageFade>{children}</PageFade>
          </main>
          <CornerControls />
        </Providers>
      </body>
    </html>
  );
}
