import { NextResponse } from 'next/server';
import { fetchTrendingRepos } from '@/lib/github/api';
import type { RepoCategory } from '@/lib/github/types';

export const revalidate = 3600; // ISR: revalidate every hour

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = (searchParams.get('category') || 'all') as RepoCategory;
  const page = Math.max(1, Number(searchParams.get('page') || '1'));
  const limit = Math.min(50, Math.max(1, Number(searchParams.get('limit') || '20')));

  try {
    const data = await fetchTrendingRepos({ category, page, limit });
    return NextResponse.json(data);
  } catch (error) {
    console.error('[api/repos] fetch failed:', error);
    return NextResponse.json(
      { error: 'Failed to fetch repositories' },
      { status: 500 },
    );
  }
}
