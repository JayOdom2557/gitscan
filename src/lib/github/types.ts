export interface Repo {
  slug: string;
  owner: string;
  name: string;
  fullName: string;
  description: string;
  language: string | null;
  stargazersCount: number;
  forksCount: number;
  watchersCount: number;
  openIssuesCount: number;
  topics: string[];
  htmlUrl: string;
  avatarUrl: string;
  homepage: string | null;
  license: string | null;
  pushedAt: string | null;
  createdAt: string | null;
}

export type RepoCategory =
  | 'all'
  | 'frontend'
  | 'backend'
  | 'ai-ml'
  | 'devops'
  | 'mobile'
  | 'cms';

export interface TrendingResponse {
  repos: Repo[];
  totalCount: number;
  page: number;
}

export interface MomentumSignal {
  repoSlug: string;
  score: number;
  starVelocity: number;    // stars gained per day (7d avg)
  forkVelocity: number;    // forks gained per day (7d avg)
  issueActivity: number;   // issues opened + closed per day (7d avg)
  commitFrequency: number; // commits per day (30d avg)
  trend: 'rising' | 'stable' | 'declining';
  computedAt: string;
}
