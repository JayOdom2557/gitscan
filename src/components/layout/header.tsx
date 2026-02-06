'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Nav } from './nav';
import { ConnectButton } from '@/components/wallet/connect-button';
import { cn } from '@/lib/utils';

const TABS = [
  { label: 'Repos', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Markets', href: '/markets' },
] as const;

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/gitscan-logo-nobg.png"
              alt="GitScan"
              width={28}
              height={28}
              className="h-7 w-7"
              priority
            />
            <span className="text-lg font-bold tracking-tight">GitScan</span>
          </Link>

          <nav className="hidden items-center gap-1 sm:flex">
            {TABS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  'rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
                  pathname === href
                    ? 'bg-surface-2 text-foreground'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Nav />
          <ConnectButton />
        </div>
      </div>
    </header>
  );
}
