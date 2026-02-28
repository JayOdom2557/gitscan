'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Star, GitFork, ArrowUpRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatCompact } from '@/lib/utils';
import type { Repo } from '@/lib/github/types';

interface RepoCardProps {
  repo: Repo;
  rank: number;
}

export function RepoCard({ repo, rank }: RepoCardProps) {
  return (
    <Card className="group flex items-center gap-4 transition hover:border-brand/20">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface-2 text-sm font-bold tabular-nums text-muted-foreground">
        {rank}
      </div>

      {repo.avatarUrl && (
        <Image
          src={repo.avatarUrl}
          alt={repo.owner}
          width={40}
          height={40}
          className="h-10 w-10 rounded-full border border-border"
        />
      )}

      <div className="min-w-0 flex-1">
        <Link
          href={`/repo/${repo.slug}`}
          className="font-semibold tracking-tight text-foreground transition-colors hover:text-brand"
        >
          {repo.fullName}
        </Link>
        <p className="truncate text-sm text-muted-foreground">{repo.description}</p>
      </div>

      <div className="hidden items-center gap-4 sm:flex">
        {repo.language && <Badge>{repo.language}</Badge>}
        <span className="flex items-center gap-1 text-sm tabular-nums text-muted-foreground">
          <Star className="h-3.5 w-3.5" />
          {formatCompact(repo.stargazersCount)}
        </span>
        <span className="flex items-center gap-1 text-sm tabular-nums text-muted-foreground">
          <GitFork className="h-3.5 w-3.5" />
          {formatCompact(repo.forksCount)}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <a
          href={repo.htmlUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden rounded-lg p-2 text-muted-foreground transition hover:bg-surface-2 hover:text-foreground lg:block"
          aria-label="View on GitHub"
        >
          <ArrowUpRight className="h-4 w-4" />
        </a>
        <Button size="sm" variant="outline" className="text-xs">
          Boost
        </Button>
      </div>
    </Card>
  );
}
