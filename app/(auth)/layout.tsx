'use client'

import { useMemo } from "react";
import { ConnectionProvider, WalletProvider, } from "@solana/wallet-adapter-react";
import { PhantomWalletAdapter, SolflareWalletAdapter, MathWalletAdapter, } from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";


import PageIllustration from '@/components/page-illustration'


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
        <div className="flex flex-col min-h-screen overflow-hidden">
          <PageIllustration />
          {children}
        </div>
      </WalletProvider>
    </ConnectionProvider>

  )
}
