'use client';

import { type ReactNode } from 'react';
import { WalletProvider } from '@/components/wallet/wallet-provider';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return <WalletProvider>{children}</WalletProvider>;
}
