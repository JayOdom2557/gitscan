import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const metadata = {
  title: 'Blog',
  description: 'Insights on open-source momentum, developer trends, and repository analytics.',
};

const POSTS = [
  {
    slug: 'momentum-signals-explained',
    title: 'How Momentum Signals Work',
    excerpt: 'A deep dive into the metrics behind our real-time repository scoring system.',
    date: '2026-04-15',
    tag: 'Engineering',
  },
  {
    slug: 'top-repos-q1-2026',
    title: 'Top Repositories — Q1 2026',
    excerpt: 'The fastest-growing open-source projects this quarter by star velocity.',
    date: '2026-04-02',
    tag: 'Report',
  },
  {
    slug: 'web3-meets-open-source',
    title: 'Web3 Meets Open Source',
    excerpt: 'How wallet-based identity is changing the way developers fund and govern projects.',
    date: '2026-03-18',
    tag: 'Opinion',
  },
  {
    slug: 'building-gitscan',
    title: 'Building GitScan: Architecture Deep Dive',
    excerpt: 'Next.js 15, Supabase, and the GitHub API — our stack in detail.',
    date: '2026-02-28',
    tag: 'Engineering',
  },
];

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8 px-4 py-12 sm:px-6 lg:px-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Blog</h1>
        <p className="text-muted-foreground">
          Insights on open-source momentum and developer trends.
        </p>
      </header>

      <div className="space-y-4">
        {POSTS.map((post) => (
          <Card key={post.slug} className="p-5 transition hover:border-brand/30">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <h2 className="text-lg font-semibold tracking-tight">{post.title}</h2>
                <p className="text-sm text-muted-foreground">{post.excerpt}</p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1">
                <Badge>{post.tag}</Badge>
                <time className="text-xs text-muted-foreground">{post.date}</time>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
