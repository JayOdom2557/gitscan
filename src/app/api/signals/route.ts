import { NextResponse } from 'next/server';
import { computeSignals } from '@/lib/github/signals';

export const revalidate = 21600; // ISR: revalidate every 6 hours

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const owner = searchParams.get('owner');
  const repo = searchParams.get('repo');

  if (!owner || !repo) {
    return NextResponse.json(
      { error: 'Missing owner or repo parameter' },
      { status: 400 },
    );
  }

  try {
    const signals = await computeSignals(owner, repo);
    return NextResponse.json(signals);
  } catch (error) {
    console.error(`[api/signals] ${owner}/${repo} failed:`, error);
    return NextResponse.json(
      { error: 'Failed to compute signals' },
      { status: 500 },
    );
  }
}
