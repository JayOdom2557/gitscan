import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 py-10 sm:flex-row sm:px-6 lg:px-8">
        <div className="flex items-center gap-2.5">
          <Image
            src="/gitscan-logo-nobg.png"
            alt="GitScan"
            width={24}
            height={24}
            className="h-6 w-6"
          />
          <span className="text-sm font-semibold">GitScan</span>
        </div>

        <nav className="flex items-center gap-5 text-sm text-muted-foreground">
          <Link href="/blog" className="hover:text-foreground transition-colors">
            Blog
          </Link>
          <Link href="/data" className="hover:text-foreground transition-colors">
            Data
          </Link>
          <Link href="/faq" className="hover:text-foreground transition-colors">
            FAQ
          </Link>
          <a
            href="https://x.com/usegitscan"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            @usegitscan
          </a>
        </nav>

        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} GitScan. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
