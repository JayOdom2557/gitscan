import { HeroSection } from '@/components/hero/hero-section';
import { Leaderboard } from '@/components/repo/leaderboard';

export const metadata = {
  title: 'Markets',
  description: 'Market momentum signals for open-source ecosystems.',
};

export default function MarketsPage() {
  return (
    <>
      <HeroSection variant="markets" />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Leaderboard category="markets" />
      </section>
    </>
  );
}
