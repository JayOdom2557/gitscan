import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Playfair_Display } from 'next/font/google';
import { Providers } from './providers';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-display' });

export const metadata: Metadata = {
  title: {
    default: 'GitScan — Repository Radar',
    template: '%s | GitScan',
  },
  description:
    'Live momentum signals for GitHub repositories. Track stars, forks, and community growth in real time.',
  metadataBase: new URL('https://usegitscan.xyz'),
  openGraph: {
    title: 'GitScan — Repository Radar',
    description: 'Live momentum signals for GitHub repositories.',
    url: 'https://usegitscan.xyz',
    siteName: 'GitScan',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GitScan',
    description: 'Live momentum signals for GitHub repositories.',
    creator: '@usegitscan',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${playfair.variable} dark`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
