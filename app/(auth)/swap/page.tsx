'use client'

import { useEffect } from "react";
import Header from '@/components/ui/header'
import Wallets from '@/components/wallets'
import SwapForm from "@/components/swapform"


const assets = [
  { name: 'SOL', mint: 'So11111111111111111111111111111111111111112', decimals: 9 },
  { name: 'USDC', mint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', decimals: 6 },
  { name: 'DAMA', mint: 'FvjpE23aoMwTygaMeAN1YsqB6UMpix89HxBGyF933tU1', decimals: 6 }
];



export default function Home() {


  console.log("Swap Application");
  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">

        {/* Description  */}
        <div className="relative pt-32 pb-10 md:pt-40 md:pb-16">

          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">

            <h1 className="h1 mb-4" data-aos="fade-up">Swap Tools</h1>
            <br />
            <Wallets />
            <br />
            <SwapForm />

          </div>

        </div>

      </div>


    </>
  )
}
