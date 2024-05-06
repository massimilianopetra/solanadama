'use client'

import React, { useState, useEffect } from 'react';
import HeaderApp from '@/components/ui/headerapp'
import Wallets from '@/components/wallets'
import DynamicMessage from '@/components/dynamicmessage';
import { RENT_PER_TOKEN_ACCOUNT_IN_SOL, COSTS_IN_SOL } from "@/src/fee_redeeemer"
import { findEmptyTokenAccounts, EmptyAccount, EmptyAccountInfo, getEmptyAccountInfos, getSolscanLink } from "@/src/fee_redeeemer"
import { useWallet } from '@solana/wallet-adapter-react'
import { LAMPORTS_PER_SOL, Connection } from '@solana/web3.js'
import Link from "@mui/material/Link";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button, Snackbar } from "@mui/material";




const emptyAccountsColumns: GridColDef[] = [
  { field: 'id', headerName: 'id', width: 40 },
  {
    field: 'mint', headerName: 'mint', width: 400,
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

  //const connection = new Connection('https://mainnet.helius-rpc.com/?api-key=' + process.env.NEXT_PUBLIC_HELIUSKEY);
  const connection = new Connection('https://devnet.helius-rpc.com/?api-key=' + process.env.NEXT_PUBLIC_HELIUSKEY);

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
          setEmptyAccountInfos(undefined); setEmptyAccountInfos(data);
        }

        const eaInfos = await getEmptyAccountInfos(connection, updatedEA, updateStateCallback);
        if (eaInfos) {
          setEmptyAccountInfos(eaInfos);
        }
      }

    })();
  };

  const proceedRedeem = async () => {
    if (!emptyAccounts) return;
    console.log("Proceeding redeem");
    setMessage({ message: "Transaction in progress", color: "rgb(150 150 150)" });
    setOpen(true);
    setTimeout(() => {
      setOpen(true);
      setMessage({ message: "Transaction completed", color: "rgb(0 150 0)" });
    }, 15000);
    settxCount(txCount + 1);
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
            {emptyAccountInfos && emptyAccountInfos.length > 0 ?
              <div>
                <p className="text-justify">We found you have {emptyAccountInfos.length} empty token accounts. You can redeem these accounts and earn up
                  to <strong>{emptyAccountInfos.length * RENT_PER_TOKEN_ACCOUNT_IN_SOL} SOL</strong>.
                  By clicking on the link below you can view the list of associated Tokens and NFT. If you wish to earn the SOL currently blocked in the rents of
                  these accounts click on the proceed button. The accounts will be permanently deleted. Before proceeding make sure these accounts are no longer of interest to you.
                  The transaction will costs up to <strong>{emptyAccountInfos.length * COSTS_IN_SOL} SOL</strong>.
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
                <div>
                  <DataGrid sx={{
                    color: "gray",
                    border: 2,
                  }}
                    autoHeight
                    rows={emptyAccountInfos}
                    columns={emptyAccountsColumns}
                  />
                  <button className="underline decoration-solid" onClick={disableTable}>Hide Empty Accounts Details</button>
                </div>

                :
                <p></p>
            }
            <br />
            <br />
            <br />
            {emptyAccountInfos && emptyAccountInfos.length > 0 ?
              <div className="p-1">
                <div>
                  <Button variant="contained" onClick={proceedRedeem}>Proceed Reedeming Accounts</Button>
                </div>
              </div>
              :
              <div>
              </div>
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
