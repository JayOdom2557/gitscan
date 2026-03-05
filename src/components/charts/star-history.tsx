'use client';

import { useMemo } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import type { Repo } from '@/lib/github/types';

interface StarHistoryProps {
  repo?: Repo;
}

export function StarHistory({ repo }: StarHistoryProps) {
  const data = useMemo(() => {
    // Generate synthetic star growth curve for demo
    const points = 30;
    const base = repo?.stargazersCount ?? 1200;
    return Array.from({ length: points }, (_, i) => {
      const progress = i / (points - 1);
      const value = Math.round(base * (0.3 + 0.7 * Math.pow(progress, 0.7)));
      const date = new Date();
      date.setDate(date.getDate() - (points - 1 - i));
      return {
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        stars: value,
      };
    });
  }, [repo]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Star History</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="starGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0988F0" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#0988F0" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fill: '#71717a' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: '#71717a' }}
              axisLine={false}
              tickLine={false}
              width={48}
            />
            <Tooltip
              contentStyle={{
                background: '#111113',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 8,
                fontSize: 12,
              }}
            />
            <Area
              type="monotone"
              dataKey="stars"
              stroke="#0988F0"
              strokeWidth={2}
              fill="url(#starGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
