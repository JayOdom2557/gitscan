import { StarHistory } from '@/components/charts/star-history';
import { ForkTrend } from '@/components/charts/fork-trend';
import { MomentumGauge } from '@/components/charts/momentum-gauge';

export const metadata = {
  title: 'Data',
  description: 'Aggregate analytics and trend data across tracked repositories.',
};

export default function DataPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-10 px-4 py-12 sm:px-6 lg:px-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Data & Analytics</h1>
        <p className="max-w-2xl text-muted-foreground">
          Aggregate momentum signals across all tracked repositories. Updated every 6 hours.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        <StarHistory />
        <ForkTrend />
      </div>

      <MomentumGauge />
    </div>
  );
}
