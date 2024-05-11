'use client'

import React, { useState, useEffect } from 'react';
import { PublicKey } from '@solana/web3.js';
import Header from '@/components/ui/header'

import { RENT_PER_TOKEN_ACCOUNT_IN_SOL, COSTS_IN_SOL } from "@/src/fee_redeeemer"
import { findEmptyTokenAccounts, EmptyAccount, EmptyAccountInfo, getEmptyAccountInfos, getSolscanLink, getPKsToClose } from "@/src/fee_redeeemer"
import { createCloseEmptyAccountsTransactions } from "@/src/fee_redeeemer"
import { useWallet } from '@solana/wallet-adapter-react'
import { LAMPORTS_PER_SOL, Connection } from '@solana/web3.js'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button, Snackbar, Link, Stack, Box } from "@mui/material";
import bs58 from 'bs58';


const publicKey = new PublicKey("Gk6ZR5gQHF4wtiLmqC62dmuEFDD7mydXDZqnQnnkHz28");

const emptyAccountsColumns: GridColDef[] = [
  { field: 'id', headerName: 'id', width: 40 },
  {
    field: 'account', headerName: 'account address', width: 200,
    renderCell: (cellValues) => {
      const adr = cellValues.row.account.publicKey.toBase58();
      return <Link href={getSolscanLink(adr)} target="_blank">{adr.substring(0,3)}...{adr.substring(adr.length - 5)}</Link>;
    }
  },
  {
    field: 'mint', headerName: 'mint address', width: 200,
    renderCell: (cellValues) => {
      const adr = cellValues.row.account.mint.toBase58();
      return <Link href={getSolscanLink(adr)} target="_blank">{adr}</Link>;
    }
  },
  { field: 'name', headerName: 'name', width: 200 },
];

export default function Redeem() {
  const [emptyAccounts, setEmptyAccounts] = useState<EmptyAccount[]>([]);
  const [emptyAccountInfos, setEmptyAccountInfos] = useState<EmptyAccountInfo[]>();
  const [showTable, setShowTable] = useState<boolean>(false);
  const [dMessage, setMessage] = useState({ message: '', color: '' });
  const [open, setOpen] = useState(false);
  const [txCount, settxCount] = useState(0);

  const wallet = useWallet();

  const connection = new Connection('https://mainnet.helius-rpc.com/?api-key=' + process.env.NEXT_PUBLIC_HELIUSKEY);
  //const connection = new Connection('https://devnet.helius-rpc.com/?api-key=' + process.env.NEXT_PUBLIC_HELIUSKEY);

  const loadEmptyAccounts = () => {
    (async () => {

      if (wallet?.publicKey) {
        const updatedEA = await findEmptyTokenAccounts(connection, wallet.publicKey);

        console.log("Empty Token Account");
        for (let e of updatedEA) {
          console.log("mint: ", e.mint.toString());
          console.log("funded solana: ", e.lamports / LAMPORTS_PER_SOL);
          console.log("accounts PubKey", e.publicKey.toString());
        }
        setEmptyAccounts(updatedEA);

        const updateStateCallback = (data: EmptyAccountInfo[]) => {
          setEmptyAccountInfos(data);
        }

        const eaInfos = await getEmptyAccountInfos(connection, updatedEA, updateStateCallback);
        if (eaInfos) {
          setEmptyAccountInfos(eaInfos);
        }
      }

    })();
  };



  const proceedRedeem = async () => {

    if (!wallet.connected || !wallet.signTransaction) {
      console.error(
        'Wallet is not connected or does not support signing transactions'
      );
      return;
    }
    if (wallet.publicKey && emptyAccounts && emptyAccounts.length > 0) {
      console.log("Proceeding redeem");


      const closablePKs = getPKsToClose(emptyAccounts);
      const transaction = await createCloseEmptyAccountsTransactions(wallet.publicKey, closablePKs, publicKey);
      let blockhash = (await connection.getLatestBlockhash('finalized')).blockhash;
      console.log(blockhash);
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = wallet.publicKey;

      // sign the transaction
      const signedTransaction = await wallet.signTransaction(transaction);

      // Execute the transaction
      setMessage({ message: "Transaction in progress", color: "rgb(150 150 150)" });
      setOpen(true);
      const rawSignedTransaction = signedTransaction.serialize();
      const signedTX = bs58.encode(rawSignedTransaction);
      console.log("signedTX");
      console.log(signedTX);


      const reply = await (await fetch('https://damasrv.fixip.org:13144/sendtransaction', {
        headers: {
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
          "jsonrpc": "2.0",
          "id": 1,
          "method": "sendTransaction",
          "params": [signedTX]
        })
      })).json();

      console.log(reply);

      const replyconfirm = await (await fetch('https://damasrv.fixip.org:13144/confirmtransaction', {
        headers: {
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(reply)
      })).json();
      console.log(replyconfirm)


      setOpen(true);
      setMessage({ message: "Transaction completed", color: "rgb(0 150 0)" });

      settxCount(txCount + 1);
    }
  }

  const enableTable = async () => {
    if (!emptyAccounts) return;
    setShowTable(true);
  }

  const disableTable = async () => {
    setShowTable(false);
  }

  const handleClose = () => {
    setOpen(false);
  }

  useEffect(loadEmptyAccounts, [
    wallet, txCount
  ]);

  /*           <Wallets /> */
  console.log("Redeem Application");

  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">

        {/* Description  */}
        <div className="relative pt-32 pb-10 md:pt-40 md:pb-16">

          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">

            <h1 className="h1 mb-4" data-aos="fade-up">Solana Redeeming Tool</h1>

            {emptyAccountInfos && emptyAccountInfos.length > 0 ?
              <div>
                <h1 className="h3 mb-4 text-red-700" data-aos="fade-up">Earn up to {emptyAccountInfos.length * RENT_PER_TOKEN_ACCOUNT_IN_SOL} SOL </h1>
                <p className="text-justify">We found you have {emptyAccountInfos.length} empty token accounts. You can redeem these accounts and earn up
                  to <strong>{emptyAccountInfos.length * RENT_PER_TOKEN_ACCOUNT_IN_SOL} SOL</strong>.
                  By clicking on "Show Empty Token Accounts Details" you can view the list of these accounts. If you wish to earn the SOL currently locked to fund
                  these accounts click on the proceed button. The accounts will be permanently burned and you will earn the fees currently locked.
                  Before proceeding make sure these accounts are no longer of interest to you.
                </p>
                <br />
                <p className="text-justify">
                  In order to reduce network costs, the tool will group the accounts to be redeemed allowing you to close up to 15 accounts at a time.
                  Using the refresh button you can search for the accounts that remain to be deleted and proceed in sequence with subsequent recovering operation.
                </p>

              </div>
              :
              <div>
                <p> You don't have any empty token accounts</p>
              </div>
            }
            <br />
            {!showTable ? <button className="underline decoration-solid" onClick={enableTable}>Show Empty Token Accounts Details</button> :
              emptyAccountInfos && emptyAccountInfos.length > 0 ?
                <Box sx={{ width: '100%' }}>
                  <DataGrid sx={{
                    color: "gray",
                    border: 2,
                  }}
                    autoHeight
                    rows={emptyAccountInfos}
                    columns={emptyAccountsColumns}
                  />
                  <button className="underline decoration-solid" onClick={disableTable}>Hide Empty Accounts Details</button>
                </Box>

                :
                <p></p>
            }
            <br />
            <br />
            <br />
            {emptyAccountInfos && emptyAccountInfos.length > 0 ?
              <Stack spacing={2}>
                <Button variant="contained" onClick={proceedRedeem} className="bg-blue-900 hover:bg-blue-600">Proceed Reedeming Accounts</Button>
                <Button variant="contained" onClick={() => { settxCount(txCount + 1) }} className="bg-blue-900 hover:bg-blue-600">Refresh</Button>
              </Stack>

              :
              <Stack spacing={2}>
                <Button variant="contained" onClick={() => { settxCount(txCount + 1) }} className="bg-blue-900 hover:bg-blue-600">Refresh</Button>
              </Stack>
            }
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
