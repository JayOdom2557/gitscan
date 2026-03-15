'use client';

import { useWallet } from '@/hooks/use-wallet';
import { Button } from '@/components/ui/button';

export function ConnectButton() {
  const { address, isConnected, connect, disconnect } = useWallet();

  if (isConnected && address) {
    const short = `${address.slice(0, 6)}...${address.slice(-4)}`;
    return (
      <Button variant="outline" size="sm" onClick={disconnect}>
        {short}
      </Button>
    );
  }

  return (
    <Button size="sm" onClick={connect}>
      Join
    </Button>
  );
}
