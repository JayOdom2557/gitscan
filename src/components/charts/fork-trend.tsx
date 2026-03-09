'use client';

import { useMemo } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import type { Repo } from '@/lib/github/types';

interface ForkTrendProps {
  repo?: Repo;
}

export function ForkTrend({ repo }: ForkTrendProps) {
  const data = useMemo(() => {
    const months = 6;
    const base = repo?.forksCount ?? 340;
    return Array.from({ length: months }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - (months - 1 - i));
      return {
        month: date.toLocaleDateString('en-US', { month: 'short' }),
        forks: Math.round(base * (0.4 + 0.6 * ((i + 1) / months)) + Math.random() * 20),
      };
    });
  }, [repo]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fork Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 11, fill: '#71717a' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: '#71717a' }}
              axisLine={false}
              tickLine={false}
              width={40}
            />
            <Tooltip
              contentStyle={{
                background: '#111113',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 8,
                fontSize: 12,
              }}
            />
            <Bar dataKey="forks" fill="#0988F0" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
