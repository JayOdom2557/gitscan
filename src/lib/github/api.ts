import type { Repo, RepoCategory, TrendingResponse } from './types';

const GITHUB_API = 'https://api.github.com';

async function githubFetch<T>(path: string): Promise<T> {
  const headers: HeadersInit = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const res = await fetch(`${GITHUB_API}${path}`, {
    headers,
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export async function fetchRepoBySlug(slug: string): Promise<Repo | null> {
  try {
    // Slug format: "owner-repo" → try to match
    const data = await githubFetch<any>(`/repos/${slug.replace('-', '/')}`);
    return normalizeRepo(data);
  } catch {
    return null;
  }
}

export async function fetchTrendingRepos(opts: {
  category: RepoCategory;
  page: number;
  limit: number;
}): Promise<TrendingResponse> {
  const query = buildSearchQuery(opts.category);
  const data = await githubFetch<any>(
    `/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc&per_page=${opts.limit}&page=${opts.page}`,
  );

  return {
    repos: (data.items || []).map(normalizeRepo),
    totalCount: data.total_count || 0,
    page: opts.page,
  };
}

function buildSearchQuery(category: RepoCategory): string {
  const base = 'stars:>100 pushed:>2026-01-01';
  const categoryMap: Record<RepoCategory, string> = {
    all: base,
    frontend: `${base} topic:frontend`,
    backend: `${base} topic:backend`,
    'ai-ml': `${base} topic:machine-learning`,
    devops: `${base} topic:devops`,
    mobile: `${base} topic:mobile`,
    cms: `${base} topic:cms`,
  };
  return categoryMap[category] || base;
}

function normalizeRepo(data: any): Repo {
  const owner = data.owner?.login || '';
  const name = data.name || '';
  return {
    slug: `${owner}-${name}`.toLowerCase(),
    owner,
    name,
    fullName: data.full_name || `${owner}/${name}`,
    description: data.description || '',
    language: data.language || null,
    stargazersCount: data.stargazers_count || 0,
    forksCount: data.forks_count || 0,
    watchersCount: data.watchers_count || 0,
    openIssuesCount: data.open_issues_count || 0,
    topics: data.topics || [],
    htmlUrl: data.html_url || '',
    avatarUrl: data.owner?.avatar_url || '',
    homepage: data.homepage || null,
    license: data.license?.spdx_id || null,
    pushedAt: data.pushed_at || null,
    createdAt: data.created_at || null,
  };
}
