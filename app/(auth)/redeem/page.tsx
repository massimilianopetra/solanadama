'use client'

import React, { useState, useEffect, useCallback } from 'react';
import Link from "@mui/material/Link";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import HeaderApp from '@/components/ui/headerapp'
import Wallets from '@/components/wallets'
import { RENT_PER_TOKEN_ACCOUNT_IN_SOL } from "@/src/fee_redeeemer"
import { findEmptyTokenAccounts, EmptyAccount, EmptyAccountInfo, getEmptyAccountInfos, getSolscanLink } from "@/src/fee_redeeemer"
import { useWallet } from '@solana/wallet-adapter-react'
import { LAMPORTS_PER_SOL, Connection } from '@solana/web3.js'

interface AlertState {
  open: boolean;
  message: string;
  severity: "success" | "info" | "warning" | "error" | undefined;
}

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
  const [alertState, setAlertState] = useState<AlertState>({
    open: false,
    message: "",
    severity: undefined,
  });
  const wallet = useWallet();
  const donationPercentage = 10;
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

  const enableTable = async () => {
    if (!emptyAccounts) return;
    setShowTable(true);
  }

  const disableTable = async () => {
    setShowTable(false);
  }

  useEffect(loadEmptyAccounts, [
    wallet
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
                <p>We found you have {emptyAccountInfos.length} empty token accounts. You can redeem these accounts and earn up to {emptyAccountInfos.length * RENT_PER_TOKEN_ACCOUNT_IN_SOL} SOL.
                  By clicking on the link below you can view the list of associated Tokens and NFT, so if you want to earn the SOL currently blocked in the rents of
                  these accounts click on the proceed button. The accounts will be permanently deleted, so make sure these accounts are no longer of interest to you.</p>
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
                    checkboxSelection
                  />
                  <button className="underline decoration-solid" onClick={disableTable}>Hide Empty Accounts Details</button>
                </div>
                :
                <p></p>
            }
          </div>

        </div>

      </div>


    </>
  )
}
