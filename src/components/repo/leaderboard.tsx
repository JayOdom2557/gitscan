'use client';

import { useState } from 'react';
import { RepoCard } from './repo-card';
import { Badge } from '@/components/ui/badge';
import { useRepos } from '@/hooks/use-repos';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import type { RepoCategory } from '@/lib/github/types';

const CATEGORIES: { label: string; value: RepoCategory }[] = [
  { label: 'All', value: 'all' },
  { label: 'Frontend', value: 'frontend' },
  { label: 'Backend', value: 'backend' },
  { label: 'AI / ML', value: 'ai-ml' },
  { label: 'DevOps', value: 'devops' },
  { label: 'Mobile', value: 'mobile' },
  { label: 'CMS', value: 'cms' },
];

interface LeaderboardProps {
  category?: RepoCategory;
}

export function Leaderboard({ category: initialCategory }: LeaderboardProps) {
  const [category, setCategory] = useState<RepoCategory>(initialCategory || 'all');
  const { repos, isLoading } = useRepos(category);

  return (
    <div className="space-y-6">
      <nav className="flex flex-wrap items-center gap-2">
        {CATEGORIES.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setCategory(value)}
            className={cn(
              'rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors',
              category === value
                ? 'bg-brand text-white'
                : 'bg-surface-2 text-muted-foreground hover:text-foreground',
            )}
          >
            {label}
          </button>
        ))}
      </nav>

      <div className="space-y-3">
        {isLoading
          ? Array.from({ length: 10 }).map((_, i) => (
              <Skeleton key={i} className="h-20 w-full rounded-xl" />
            ))
          : repos.map((repo, i) => (
              <RepoCard key={repo.slug} repo={repo} rank={i + 1} />
            ))}

        {!isLoading && repos.length === 0 && (
          <p className="py-12 text-center text-muted-foreground">
            No repositories found in this category.
          </p>
        )}
      </div>
    </div>
  );
}
