'use client'

import Header from '@/components/ui/header'
import AirdropForm from "@/components/airdropform"




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

            <h1 className="h1 mb-4" data-aos="fade-up">Solana Recovering Tool</h1>

            <br />
            <div className='text-justify'>
              <p>
                Dear SolanaDama Users,
              </p>
              <br />
              <p>
              We're currently in the process of developing a new tool which we aim to launch by the second half of May. 
              This tool is designed to enable you to claim Solana used to fund accounts that are no longer of interest, meaning those accounts where neither tokens nor NFTs 
              are deposited. 
              
              </p>
              <br/>
              <p>
                From an analysis we conducted by observing the accounts associated with many users of the Solana network, 
                it emerged that on average, each active user in the Solana network owns approximately 100 accounts used to store tokens or NFTs that they no longer possess. 
                Consider all the trading activities, for example, to execute operations on meme coins; 
                once these tokens are sold, the associated accounts still are present in our wallets

              </p>
              <br/>
              <p>
              The tool will automatically discover empty accounts within your wallet and, by initiating a redeeming transaction, 
              will allow you to reclaim 0.00203928 SOL for each reclaimed account used to pay the rent fees to the solana voters. Considering an average user, you could potentially earn up to 0.2 SOL!
              </p>
              <br/>
              <p>
              We're pouring our hearts into creating this tool, and we can't wait to share it with you soon!
              </p>
              <br />
              <div className="flex justify-center items-center">
                <img className="w-40 h-40 " src="/images/wprogress.png" />
              </div>
              <br />
            </div>

          </div>

        </div>

      </div>


    </>
  )
}
