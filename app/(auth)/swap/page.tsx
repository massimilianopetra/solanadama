'use client'

import { useEffect } from "react";
import HeaderApp from '@/components/ui/headerapp'
import Swap from '@/components/swap'




const SOL_ADDRESS = "So11111111111111111111111111111111111111112";
const USDC_ADDRESS = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";
const DAMA_ADDRESS = "FvjpE23aoMwTygaMeAN1YsqB6UMpix89HxBGyF933tU1";



function launchJupiter() {

  if (window.Jupiter) {

    window.Jupiter.init({
      displayMode: "integrated",
      integratedTargetId: "jupyter-terminal",
      endpoint: "https://mainnet.helius-rpc.com/?api-key=2ebfd2f1-0659-4a66-9c6c-49a8a772dbe3",
      formProps: {
        fixedOutputMint: true,
        initialAmount: "1000000",
        initialInputMint: SOL_ADDRESS,
        initialOutputMint: DAMA_ADDRESS
      }
    });
  } else {
    console.error("Jupyter script not loaded");
  }
}


export default function Home() {


  useEffect(() => {

    launchJupiter();
    console.log("Hook");

  }, [])

  console.log("Hi");
  return (
    <>
      <HeaderApp />
      <Swap />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">



          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <div id="jupyter-terminal"> </div>
          </div>

        </div>


    </>
  )
}
