'use client';

import { type ReactNode, useEffect, useRef } from 'react';
import { createAppKit } from '@reown/appkit';
import { EthersAdapter } from '@reown/appkit-adapter-ethers';
import {
  mainnet,
  base,
  arbitrum,
  optimism,
  polygon,
} from '@reown/appkit/networks';
import { WALLET_PROJECT_ID, WALLET_METADATA } from '@/lib/wallet/config';

const networks = [mainnet, base, arbitrum, optimism, polygon];

export function WalletProvider({ children }: { children: ReactNode }) {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const appKit = createAppKit({
      adapters: [new EthersAdapter()],
      networks,
      projectId: WALLET_PROJECT_ID,
      metadata: WALLET_METADATA,
      themeMode: 'dark',
      themeVariables: {
        '--w3m-accent': '#0988F0',
        '--w3m-color-mix': '#0a0a0a',
        '--w3m-color-mix-strength': 20,
        '--w3m-border-radius-master': '4px',
        '--w3m-font-family': "'Inter', system-ui, sans-serif",
      },
      features: {
        email: true,
        socials: ['google', 'github', 'discord', 'x'],
        emailShowWallets: true,
        analytics: false,
        onramp: false,
      },
      featuredWalletIds: [
        // Phantom
        'a797aa35c0fadbfc1a53e7f675162ed5226968b44a19ee3d24385c64d1d3c393',
        // MetaMask
        'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',
        // Coinbase
        'fd20dc426fb37566d803205b19bbc1d4096b248ac04548e18b34c67d167c0dc7',
      ],
    });

    window.__gitscanAppKit = appKit;
  }, []);

  return <>{children}</>;
}

declare global {
  interface Window {
    __gitscanAppKit?: ReturnType<typeof createAppKit>;
  }
}
