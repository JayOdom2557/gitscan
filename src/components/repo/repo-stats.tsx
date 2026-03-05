import { Star, GitFork, Eye, CircleDot } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { formatCompact } from '@/lib/utils';
import type { Repo } from '@/lib/github/types';

interface RepoStatsProps {
  repo: Repo;
}

const STATS = [
  { key: 'stargazersCount', label: 'Stars', icon: Star },
  { key: 'forksCount', label: 'Forks', icon: GitFork },
  { key: 'watchersCount', label: 'Watchers', icon: Eye },
  { key: 'openIssuesCount', label: 'Open Issues', icon: CircleDot },
] as const;

export function RepoStats({ repo }: RepoStatsProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {STATS.map(({ key, label, icon: Icon }) => (
        <Card key={key} className="flex items-center gap-3 p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-2">
            <Icon className="h-5 w-5 text-brand" />
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              {label}
            </p>
            <p className="text-2xl font-bold tabular-nums">
              {formatCompact(repo[key] ?? 0)}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
}
