'use client';

import { useState, useEffect, useCallback } from 'react';

interface WalletState {
  address: string | null;
  isConnected: boolean;
  connect: () => void;
  disconnect: () => void;
}

export function useWallet(): WalletState {
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    const appKit = window.__gitscanAppKit;
    if (!appKit) return;

    const unsub = appKit.subscribeAccount((state: any) => {
      setAddress(state?.address || null);
    });

    return () => {
      if (typeof unsub === 'function') unsub();
    };
  }, []);

  const connect = useCallback(() => {
    window.__gitscanAppKit?.open();
  }, []);

  const disconnect = useCallback(() => {
    window.__gitscanAppKit?.close();
    setAddress(null);
  }, []);

  return {
    address,
    isConnected: !!address,
    connect,
    disconnect,
  };
}
