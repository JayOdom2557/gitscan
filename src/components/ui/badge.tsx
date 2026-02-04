import { type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'brand' | 'success' | 'warning';
}

const variants = {
  default: 'border-border bg-surface-2/60 text-muted-foreground',
  brand: 'border-brand/30 bg-brand/10 text-brand',
  success: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400',
  warning: 'border-amber-500/30 bg-amber-500/10 text-amber-400',
};

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
