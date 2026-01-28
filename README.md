# Rahul D. Kumar - AI Engineer Portfolio

A cutting-edge portfolio website featuring AI-powered chat assistant, stunning animations, and a modern cyberpunk aesthetic.

## Features

- **AI Chat Assistant**: Powered by Groq's fast LLM inference for real-time responses
- **Cool AI Animations**:
  - Neural network connections background
  - Matrix-style digital rain effect
  - Glitch text effects
  - Terminal-style typing animations
  - Holographic card hover effects
  - Orbital particle system
- **Modern Tech Stack**: Next.js 14, TypeScript, Tailwind CSS, Framer Motion
- **Theme Support**: Dark/Light mode with 5 accent colors
- **Fully Responsive**: Optimized for all devices

## Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment variables**:
   - Copy `.env.example` to `.env.local`:
     ```bash
     cp .env.example .env.local
     ```
   - Get your Groq API key from [https://console.groq.com/keys](https://console.groq.com/keys)
   - Add your API key to `.env.local`:
     ```
     GROQ_API_KEY=your_actual_api_key_here
     ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Build for Production

```bash
npm run build
npm start
```

## Customization

### Update Portfolio Content

Edit `lib/portfolio-data.ts` to customize:
- Personal information
- Skills and technologies
- Work experience
- Projects
- Chat assistant behavior

### Change Theme Colors

The portfolio supports 5 accent colors:
- Violet (default)
- Emerald
- Sky
- Rose
- Amber

Click the color picker in the navigation to switch themes.

## Technologies

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **AI Chat**: Groq SDK (Llama 3.3 70B)
- **Icons**: Lucide React

## Project Structure

```
├── app/
│   ├── api/chat/         # Chat API endpoint with streaming
│   ├── page.tsx          # Home page
│   ├── skills/           # Skills page
│   ├── projects/         # Projects page
│   ├── experience/       # Experience page
│   └── contact/          # Contact page
├── components/
│   ├── animations/       # Animation components
│   ├── background/       # Background effects
│   ├── chat/             # Chat components
│   └── *.tsx            # UI components
├── lib/
│   └── portfolio-data.ts # Portfolio content
└── public/              # Static assets
```

## Performance

- Canvas animations are optimized for 60fps
- Streaming responses for instant AI chat feedback
- Lazy loading and code splitting
- Optimized images with Next.js Image

## License

Personal portfolio project - feel free to use as inspiration!

---

Built with passion by Rahul D. Kumar
