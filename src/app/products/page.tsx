import { HeroSection } from '@/components/hero/hero-section';
import { Leaderboard } from '@/components/repo/leaderboard';

export const metadata = {
  title: 'Products',
  description: 'Top developer tools and products tracked by GitScan.',
};

export default function ProductsPage() {
  return (
    <>
      <HeroSection variant="products" />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Leaderboard category="products" />
      </section>
    </>
  );
}
