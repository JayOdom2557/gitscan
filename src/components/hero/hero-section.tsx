import { HeroCanvas } from './hero-canvas';

interface HeroSectionProps {
  variant?: 'repos' | 'products' | 'markets';
}

const COPY = {
  repos: {
    title: 'Repository Radar',
    subtitle: 'Live momentum signals for the repositories shaping developer culture.',
  },
  products: {
    title: 'Product Pulse',
    subtitle: 'Track developer tools rising through the noise. Ranked by real signals.',
  },
  markets: {
    title: 'Market Momentum',
    subtitle: 'Where open-source ecosystems become markets people can watch.',
  },
};

export function HeroSection({ variant = 'repos' }: HeroSectionProps) {
  const { title, subtitle } = COPY[variant];

  return (
    <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden">
      <HeroCanvas />
      <div className="hero-glow left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="relative z-10 mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          <span className="gradient-text">{title}</span>
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-base text-white/60 sm:text-lg">
          {subtitle}
        </p>

        <a
          href="https://x.com/usegitscan"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-auto mt-6 flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1 text-xs font-medium text-white/80 transition hover:border-white/30 hover:bg-white/[0.08] hover:text-white"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-3.5 w-3.5">
            <path d="M4 4h4.2l4.5 6.1L18.2 4H20l-6.4 7.3L20 20h-4.1l-4.8-6.4L5.8 20H4l6.7-7.7L4 4Z" />
          </svg>
          <span>@usegitscan</span>
        </a>
      </div>
    </section>
  );
}
