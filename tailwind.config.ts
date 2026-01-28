
import type { Config } from 'tailwindcss'
const config: Config = {
  darkMode: ['class'],
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--bg))',
        foreground: 'hsl(var(--fg))',
        card: 'hsl(var(--card))',
        border: 'hsl(var(--border))',
        accent: 'hsl(var(--accent))'
      },
      boxShadow: { glow:'0 0 32px -6px hsl(var(--accent)/0.65)', soft:'0 10px 40px rgba(0,0,0,.25)' }
    }
  },
  plugins: []
}
export default config
