'use client'

import { useEffect } from 'react'

import PageIllustration from '@/components/page-illustration'

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { useMemo } from "react";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  MathWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new MathWalletAdapter(),
    ],
    []
  );

  const endpoint = useMemo(() => clusterApiUrl("mainnet-beta"), []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <PageIllustration />
        {children}
      </WalletProvider>
    </ConnectionProvider>

  )
}
