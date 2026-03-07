'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import type { Repo } from '@/lib/github/types';

interface MomentumGaugeProps {
  repo?: Repo;
}

export function MomentumGauge({ repo }: MomentumGaugeProps) {
  // Compute a momentum score 0-100 based on recent activity signals
  const score = computeMomentum(repo);
  const label = score >= 80 ? 'Hot' : score >= 50 ? 'Warming' : score >= 20 ? 'Stable' : 'Cool';
  const color =
    score >= 80
      ? '#22c55e'
      : score >= 50
        ? '#0988F0'
        : score >= 20
          ? '#eab308'
          : '#71717a';

  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (score / 100) * circumference;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Momentum Score</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center py-6">
        <div className="relative h-32 w-32">
          <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="8"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke={color}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold tabular-nums">{score}</span>
            <span className="text-xs text-muted-foreground">{label}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function computeMomentum(repo?: Repo): number {
  if (!repo) return 65; // fallback for aggregate view
  const stars = Math.min(40, Math.log10(Math.max(1, repo.stargazersCount)) * 12);
  const forks = Math.min(30, Math.log10(Math.max(1, repo.forksCount)) * 10);
  const activity = Math.min(30, repo.openIssuesCount > 5 ? 25 : 15);
  return Math.round(stars + forks + activity);
}
