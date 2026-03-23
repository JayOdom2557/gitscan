import { Suspense } from 'react';
import { HeroSection } from '@/components/hero/hero-section';
import { Leaderboard } from '@/components/repo/leaderboard';
import { Skeleton } from '@/components/ui/skeleton';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Suspense
          fallback={
            <div className="space-y-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="h-24 w-full rounded-xl" />
              ))}
            </div>
          }
        >
          <Leaderboard />
        </Suspense>
      </section>
    </>
  );
}
