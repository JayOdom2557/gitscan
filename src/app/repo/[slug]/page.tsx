import { notFound } from 'next/navigation';
import { RepoDetail } from '@/components/repo/repo-detail';
import { RepoStats } from '@/components/repo/repo-stats';
import { StarHistory } from '@/components/charts/star-history';
import { MomentumGauge } from '@/components/charts/momentum-gauge';
import { fetchRepoBySlug } from '@/lib/github/api';

interface RepoPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: RepoPageProps) {
  const { slug } = await params;
  const repo = await fetchRepoBySlug(slug);

  if (!repo) return { title: 'Repository not found' };

  return {
    title: `${repo.fullName} — Momentum Signals`,
    description: repo.description || `Track ${repo.fullName} on GitScan.`,
  };
}

export default async function RepoPage({ params }: RepoPageProps) {
  const { slug } = await params;
  const repo = await fetchRepoBySlug(slug);

  if (!repo) notFound();

  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <RepoDetail repo={repo} />
      <RepoStats repo={repo} />
      <div className="grid gap-6 lg:grid-cols-2">
        <StarHistory repo={repo} />
        <MomentumGauge repo={repo} />
      </div>
    </div>
  );
}
