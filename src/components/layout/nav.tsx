'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const LINKS = [
  { label: 'Data', href: '/data' },
  { label: 'Blog', href: '/blog' },
  { label: 'FAQ', href: '/faq' },
] as const;

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="hidden items-center gap-1 md:flex">
      {LINKS.map(({ label, href }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            'rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
            pathname === href
              ? 'text-foreground'
              : 'text-muted-foreground hover:text-foreground',
          )}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
