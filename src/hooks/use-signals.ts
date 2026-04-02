'use client';

import useSWR from 'swr';
import type { MomentumSignal } from '@/lib/github/types';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function useSignals(owner: string, repo: string) {
  const { data, error, isLoading } = useSWR<MomentumSignal>(
    owner && repo ? `/api/signals?owner=${owner}&repo=${repo}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 300_000, // 5 min
    },
  );

  return {
    signals: data ?? null,
    isLoading,
    isError: !!error,
  };
}
