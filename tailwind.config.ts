import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: '#0988F0',
        background: '#0a0a0a',
        foreground: '#e5e7eb',
        surface: {
          DEFAULT: '#111113',
          2: '#1a1a1e',
          3: '#232328',
        },
        border: 'rgba(255, 255, 255, 0.08)',
        'muted-foreground': '#71717a',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'monospace'],
        display: ['Playfair Display', 'serif'],
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(9, 136, 240, 0.3)' },
          '50%': { boxShadow: '0 0 20px 4px rgba(9, 136, 240, 0.15)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
