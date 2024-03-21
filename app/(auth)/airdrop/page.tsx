'use client'

import HeaderApp from '@/components/ui/headerapp'
import AirdropForm from "@/components/airdropform"




export default function Home() {


  console.log("Swap Application");
  return (
    <>
      <HeaderApp />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">

        {/* Description  */}
        <div className="relative pt-32 pb-10 md:pt-40 md:pb-16">

          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">

            <h1 className="h1 mb-4" data-aos="fade-up">DaMa Tokens Airdrop </h1>
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
              To receive the airdrop of our token, please ensure that you have opened your X repost of solanadama on another page. 
              Then, in the designated form, provide your Solana wallet address along with the link to the reposted tweet. 
              The first 1000 users who have retweeted will be elegible to receive DaMa tokens.
            </p>
            <br />
            <p className='text-center'>
              Thank you for your participation!
            </p>
            <br />
            </div>

            <AirdropForm />

          </div>

        </div>

      </div>


    </>
  )
}
