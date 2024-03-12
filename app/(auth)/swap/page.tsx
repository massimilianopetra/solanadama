'use client'

import { useEffect } from 'react'


import { useWallet } from "@solana/wallet-adapter-react";
import HeaderApp from '@/components/ui/headerapp'
import Swap from '@/components/swap'


export default function Home() {
  const { wallets } = useWallet();

  console.log(wallets);
  return (
    <>
      <HeaderApp />
      <Swap />
    </>
  )
}
