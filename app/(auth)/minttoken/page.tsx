'use client'

import React, { useState, useEffect } from 'react';
import { Keypair, PublicKey, Connection, clusterApiUrl } from '@solana/web3.js';
import Header from '@/components/ui/header'
import { Button, Snackbar, Link, Stack, Box } from "@mui/material";
import { createMintTransaction, createTokenAccountTransaction } from "@/src/solana_utils"

import { useWallet } from '@solana/wallet-adapter-react'
import bs58 from 'bs58';


const publicKey = new PublicKey("Gk6ZR5gQHF4wtiLmqC62dmuEFDD7mydXDZqnQnnkHz28");




export default function MintToken() {

  const [dMessage, setMessage] = useState({ message: '', color: '' });
  const [open, setOpen] = useState(false);
  const wallet = useWallet();
  const connection = new Connection(clusterApiUrl("devnet"));
  
  const handleClose = () => {
    setOpen(false);
  }

  async function createToken() {

    console.log("Create Token");
    
    if (!wallet.connected || !wallet.signTransaction) {
      console.error(
        'Wallet is not connected or does not support signing transactions'
      );
      return;
    }
    if (wallet?.publicKey) {
      
      const mint = Keypair.generate();

      console.log('Mint address ' + mint.publicKey)

      setMessage({ message: "Minting in progress", color: "rgb(150 150 150)" });
      setOpen(true);

      /* Create Mint */
      const tx1 = await createMintTransaction(connection, wallet.publicKey, mint.publicKey, 9);
      let blockhash = (await connection.getLatestBlockhash('finalized')).blockhash;
      console.log('Blockhash: '+blockhash)
      tx1.recentBlockhash = blockhash;
      tx1.feePayer = wallet.publicKey;
      tx1.sign(mint);

      const signedTx1 = await wallet.signTransaction(tx1);
      const rawSignedTx1 = signedTx1.serialize();
      const signedTX1 = bs58.encode(rawSignedTx1);
      let reply = await (await fetch('/api/sendtransactiondevnet', {
        headers: {
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
          "jsonrpc": "2.0",
          "id": 1,
          "method": "sendTransaction",
          "params": [signedTX1]
        })
      })).json();
      console.log(reply)

      /* Create Token Account */
      const tx2 = await createMintTransaction(connection, wallet.publicKey, mint.publicKey, 9);
      blockhash = (await connection.getLatestBlockhash('finalized')).blockhash;
      console.log('Blockhash: '+blockhash)
      tx2.recentBlockhash = blockhash;
      tx2.feePayer = wallet.publicKey;

      const signedTx2 = await wallet.signTransaction(tx2);
      const rawSignedTx2 = signedTx2.serialize();
      const signedTX2 = bs58.encode(rawSignedTx2);
      reply = await (await fetch('/api/sendtransactiondevnet', {
        headers: {
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
          "jsonrpc": "2.0",
          "id": 1,
          "method": "sendTransaction",
          "params": [signedTX2]
        })
      })).json();
      console.log(reply)

      setOpen(true);
      setMessage({ message: "Transaction completed", color: "rgb(0 150 0)" });

    }else {
      console.log("No publicKey for wallet");
    }

  }

  /*           <Wallets /> */
  console.log("MintToken Application");

  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">

        {/* Description  */}
        <div className="relative pt-32 pb-10 md:pt-40 md:pb-16">

          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">

            <h1 className="h1 mb-4" data-aos="fade-up">Solana Create Token Tool</h1>
            <Button variant="contained" onClick={createToken} className="bg-blue-900 hover:bg-blue-600">Proceed Create Token</Button>
            <br />
            <br />
            <br />

          </div>

        </div>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message={dMessage.message}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          ContentProps={{
            sx: {
              bgcolor: dMessage.color
            }
          }}
        />
      </div>


    </>
  )
}
