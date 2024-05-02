'use client'

import React, { useState, useEffect, useCallback } from 'react';
import HeaderApp from '@/components/ui/headerapp'
import Wallets from '@/components/wallets'
import { findEmptyTokenAccounts, EmptyAccount } from "@/src/fee_redeeemer"
import { useWallet } from '@solana/wallet-adapter-react'
import { LAMPORTS_PER_SOL, Connection } from '@solana/web3.js'

const donationPercentage = 10;


const connection = new Connection('https://mainnet.helius-rpc.com/?api-key=' + process.env.NEXT_PUBLIC_HELIUSKEY);
// const [emptyAccounts, setEmptyAccounts] = useState<EmptyAccount[]>([]);

async function loadEmptyAccounts() {
  const wallet = useWallet();
 

  console.log("loadEmptyAccounts()");
  if (wallet?.publicKey) {
    console.log("Finding empty token accounts");
    const updatedEA = await findEmptyTokenAccounts(connection, wallet.publicKey);
   
    console.log("Empty Token Account");
    for (let e of updatedEA) {
      console.log("mint: ",e.mint.toString());
      console.log("funded solana: " ,e.lamports / LAMPORTS_PER_SOL );
      console.log("accounts PubKey",e.publicKey.toString());
    }

    //setEmptyAccounts(updatedEA);
  }
};

async function getInfo() {

  const wallet = useWallet();

  console.log("getinfo()");
  let lamportBalance
  if (wallet?.publicKey) {
    const balance = await connection.getBalance(wallet.publicKey);
    lamportBalance = (balance / LAMPORTS_PER_SOL);
    console.log(lamportBalance);
    const account = await connection.getAccountInfo(wallet.publicKey);
    console.log(account);
  }

}


export default function Redeem() {
  const [emptyAccounts, setEmptyAccounts] = useState<EmptyAccount[]>([]);

  console.log("Redeem Application");
  loadEmptyAccounts();

  return (
    <>
      <HeaderApp />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">

        {/* Description  */}
        <div className="relative pt-32 pb-10 md:pt-40 md:pb-16">

          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">

            <h1 className="h1 mb-4" data-aos="fade-up">Redeem Tools</h1>
            <br />
            <Wallets />

            <br />

          </div>

        </div>

      </div>


    </>
  )
}
