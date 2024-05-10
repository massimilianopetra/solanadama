'use client'

import { useWallet } from "@solana/wallet-adapter-react";
import { Button, Avatar } from "@mui/material";
import { useState } from 'react';
import { Dialog, DialogTitle } from "@mui/material";


export default function ConnectButton() {
    const [open, setOpen] = useState(false);
    const { publicKey, disconnect } = useWallet();
    const { select, wallets } = useWallet();

    if (!publicKey) {
        if (wallets.filter((w) => w.readyState === "Installed").length > 0) {
            return (
                <div>
                    <button onClick={() => setOpen(true)} className="text-sm btn-sm rounded-lg text-white bg-blue-700 hover:bg-blue-900 ml-3">
                        Connect Wallet
                    </button>
                    <Dialog onClose={() => setOpen(false)} open={open}>
                        <DialogTitle>Connect Wallet</DialogTitle>
                        {
                            wallets.filter((wallet) => wallet.readyState === "Installed").map((wallet) => (

                                <Button
                                    key={wallet.adapter.name}
                                    onClick={() => {
                                        select(wallet.adapter.name);
                                        setOpen(false);
                                    }}
                                    variant="outlined" startIcon={<Avatar src={wallet.adapter.icon} alt={wallet.adapter.name} />}
                                >
                                    {wallet.adapter.name}
                                </Button>

                            ))
                        }
                    </Dialog>
                </div>);
        } else {
            return (
                <div>
                    <button onClick={() => setOpen(true)} className="text-sm btn-sm rounded-lg text-white bg-blue-700 hover:bg-blue-900 ml-3">
                        Connect Wallet
                    </button>
                    <Dialog onClose={() => setOpen(false)} open={open}>
                        <DialogTitle>No Wallet Found</DialogTitle>
                    </Dialog>
                </div>
            );

        }
    } else {
        console.log("{publicKey.toBase58()}")
        return (
            <div>
                <button
                    type="button"
                    className="text-sm btn-sm rounded-lg text-white bg-green-700 hover:bg-green-900 ml-3"
                    onClick={disconnect}
                >
                    <span>Disconnect ... {publicKey.toBase58().substring(publicKey.toBase58().length - 5)}</span>
                </button>

            </div>
        );
    }
};