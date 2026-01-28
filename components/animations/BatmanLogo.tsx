'use client';
import Image from 'next/image';

interface BatmanLogoProps {
  className?: string;
  size?: number;
  animate?: boolean;
  useGif?: boolean;
}

export default function BatmanLogo({ className = '', size = 100, animate = false, useGif = false }: BatmanLogoProps) {
  if (useGif) {
    return (
      <Image
        src="/logo-batman.gif"
        alt="Batman Logo"
        width={size}
        height={size}
        className={`${className} ${animate ? 'animate-pulse' : ''}`}
        unoptimized
      />
    );
  }

  return (
    <svg
      className={`${className} ${animate ? 'animate-pulse' : ''}`}
      width={size}
      height={size}
      viewBox="0 0 512 512"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Classic Batman Logo */}
      <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256 256-114.6 256-256S397.4 0 256 0zm0 472c-119.1 0-216-96.9-216-216S136.9 40 256 40s216 96.9 216 216-96.9 216-216 216z"/>
      <path d="M398.1 256c0-15.7-3.7-30.5-10.2-43.7l-48.6 11.9c-11.8-33.7-39.3-60.4-73.3-71.3v-24.4c0-5.5-4.5-10-10-10s-10 4.5-10 10v24.4c-34 10.9-61.5 37.6-73.3 71.3l-48.6-11.9c-6.5 13.2-10.2 28-10.2 43.7s3.7 30.5 10.2 43.7l48.6-11.9c11.8 33.7 39.3 60.4 73.3 71.3v24.4c0 5.5 4.5 10 10 10s10-4.5 10-10v-24.4c34-10.9 61.5-37.6 73.3-71.3l48.6 11.9c6.5-13.2 10.2-28 10.2-43.7z"/>
      <path d="M256 180c-41.9 0-76 34.1-76 76s34.1 76 76 76 76-34.1 76-76-34.1-76-76-76zm0 132c-30.9 0-56-25.1-56-56s25.1-56 56-56 56 25.1 56 56-25.1 56-56 56z"/>
      {/* Batman wings */}
      <path d="M456 216c-13.3-33.6-38.2-61.5-70-78.4-8.8-4.7-18.2-8.4-28-11.1l-22.6 55.2c24.7 10.1 44.9 28.9 57.1 52.7l63.5-18.4z"/>
      <path d="M56 216l63.5 18.4c12.2-23.8 32.4-42.6 57.1-52.7L154 126.5c-9.8 2.7-19.2 6.4-28 11.1-31.8 16.9-56.7 44.8-70 78.4z"/>
      <path d="M456 296l-63.5-18.4c-12.2 23.8-32.4 42.6-57.1 52.7l22.6 55.2c9.8-2.7 19.2-6.4 28-11.1 31.8-16.9 56.7-44.8 70-78.4z"/>
      <path d="M119.5 277.6L56 296c13.3 33.6 38.2 61.5 70 78.4 8.8 4.7 18.2 8.4 28 11.1l22.6-55.2c-24.7-10.1-44.9-28.9-57.1-52.7z"/>
    </svg>
  );
}
