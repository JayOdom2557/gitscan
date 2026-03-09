export const WALLET_PROJECT_ID = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID || '';

export const WALLET_METADATA = {
  name: 'GitScan',
  description: 'Live momentum signals for GitHub repositories and tools.',
  url: typeof window !== 'undefined' ? window.location.origin : 'https://usegitscan.xyz',
  icons: [
    typeof window !== 'undefined'
      ? `${window.location.origin}/gitscan-logo-nobg.png`
      : 'https://usegitscan.xyz/gitscan-logo-nobg.png',
  ],
};
