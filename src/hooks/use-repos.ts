'use client';

import useSWR from 'swr';
import type { Repo, RepoCategory, TrendingResponse } from '@/lib/github/types';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function useRepos(category: RepoCategory = 'all', page = 1) {
  const { data, error, isLoading, mutate } = useSWR<TrendingResponse>(
    `/api/repos?category=${category}&page=${page}&limit=20`,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60_000,
    },
  );

  return {
    repos: data?.repos ?? [],
    totalCount: data?.totalCount ?? 0,
    isLoading,
    isError: !!error,
    mutate,
  };
}
