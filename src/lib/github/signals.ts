import type { MomentumSignal } from './types';

const GITHUB_API = 'https://api.github.com';

export async function computeSignals(
  owner: string,
  repo: string,
): Promise<MomentumSignal> {
  const headers: HeadersInit = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  // Fetch recent activity in parallel
  const [repoData, commits, issues] = await Promise.all([
    fetch(`${GITHUB_API}/repos/${owner}/${repo}`, { headers }).then((r) => r.json()),
    fetch(`${GITHUB_API}/repos/${owner}/${repo}/commits?per_page=30`, { headers }).then((r) =>
      r.json(),
    ),
    fetch(
      `${GITHUB_API}/repos/${owner}/${repo}/issues?state=all&per_page=30&sort=updated`,
      { headers },
    ).then((r) => r.json()),
  ]);

  const now = Date.now();
  const weekAgo = now - 7 * 86400000;
  const monthAgo = now - 30 * 86400000;

  // Star velocity: approximate from recent stargazer growth
  const starVelocity = estimateVelocity(repoData.stargazers_count, 7);

  // Fork velocity
  const forkVelocity = estimateVelocity(repoData.forks_count, 7);

  // Commit frequency (30d)
  const recentCommits = Array.isArray(commits)
    ? commits.filter(
        (c: any) =>
          c.commit?.author?.date && new Date(c.commit.author.date).getTime() > monthAgo,
      )
    : [];
  const commitFrequency = recentCommits.length / 30;

  // Issue activity (7d)
  const recentIssues = Array.isArray(issues)
    ? issues.filter(
        (i: any) => i.updated_at && new Date(i.updated_at).getTime() > weekAgo,
      )
    : [];
  const issueActivity = recentIssues.length / 7;

  // Composite score
  const score = computeScore({
    starVelocity,
    forkVelocity,
    commitFrequency,
    issueActivity,
  });

  const trend =
    score >= 70 ? 'rising' : score >= 35 ? 'stable' : 'declining';

  return {
    repoSlug: `${owner}-${repo}`.toLowerCase(),
    score,
    starVelocity: round2(starVelocity),
    forkVelocity: round2(forkVelocity),
    issueActivity: round2(issueActivity),
    commitFrequency: round2(commitFrequency),
    trend,
    computedAt: new Date().toISOString(),
  };
}

function estimateVelocity(total: number, days: number): number {
  // Rough heuristic: assume ~0.5% growth rate per week for active repos
  return (total * 0.005) / days;
}

function computeScore(metrics: {
  starVelocity: number;
  forkVelocity: number;
  commitFrequency: number;
  issueActivity: number;
}): number {
  const s = Math.min(35, metrics.starVelocity * 5);
  const f = Math.min(25, metrics.forkVelocity * 8);
  const c = Math.min(25, metrics.commitFrequency * 10);
  const i = Math.min(15, metrics.issueActivity * 5);
  return Math.round(s + f + c + i);
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
