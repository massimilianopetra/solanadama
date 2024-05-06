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

            <h1 className="h1 mb-4" data-aos="fade-up">Airdrop Subscription Tool</h1>
            <div className="flex justify-center items-center">
              <img className="dark:hidden w-20 h-20 " src="/images/airdrop.png" />
            </div>
            <div className="flex justify-center items-center">
              <img className="hidden dark:block w-20 h-20 " src="/images/d_airdrop.png" />
            </div>
            <br />
            <div className='text-justify'>
              <p>
                Dear SolanaDama Users,
              </p>
              <br />
              <p>
               We're currently developing a new tool called Targeted Airdrop, tailored for Solana enthusiasts like you!. 
               This tool aims to simplify the process of subscribing to targeted airdrops for active users within the Solana network. 
               Rest assured, our team is hard at work crafting this platform to provide the best possible experience for our community. 
               sStay tuned for updates as we work towards bringing Targeted Airdrop to life!
              </p>
              <p>

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
