import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Repo } from '@/lib/github/types';

interface RepoDetailProps {
  repo: Repo;
}

export function RepoDetail({ repo }: RepoDetailProps) {
  return (
    <header className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        {repo.avatarUrl && (
          <Image
            src={repo.avatarUrl}
            alt={`${repo.owner} avatar`}
            width={56}
            height={56}
            className="h-14 w-14 rounded-full border border-border"
          />
        )}

        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {repo.fullName}
          </h1>
          <p className="text-sm text-muted-foreground">
            {repo.owner} &middot; {repo.language || 'Unknown'} &middot;{' '}
            {repo.license || 'No license'}
          </p>
        </div>

        <a href={repo.htmlUrl} target="_blank" rel="noopener noreferrer">
          <Button className="gap-2">
            <ExternalLink className="h-4 w-4" />
            View on GitHub
          </Button>
        </a>
      </div>

      <p className="max-w-3xl text-foreground/90">{repo.description}</p>

      {repo.topics && repo.topics.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {repo.topics.slice(0, 8).map((topic) => (
            <Badge key={topic}>{topic}</Badge>
          ))}
        </div>
      )}
    </header>
  );
}
