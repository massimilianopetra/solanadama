'use client'

import { useMemo, useEffect } from "react";
import { ConnectionProvider, WalletProvider, } from "@solana/wallet-adapter-react";
import { PhantomWalletAdapter, SolflareWalletAdapter, MathWalletAdapter, } from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";


import AOS from 'aos'
import 'aos/dist/aos.css'


export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {

  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 600,
      easing: 'ease-out-sine',
    })
  })

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
    <>
      <main className="grow">

        <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={wallets} autoConnect>

            {children}

          </WalletProvider>
        </ConnectionProvider>

      </main>


    </>
  )
}
