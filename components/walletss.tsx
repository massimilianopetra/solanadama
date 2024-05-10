import { useWallet } from "@solana/wallet-adapter-react";
import { Button, Avatar } from "@mui/material";
import { Dispatch, SetStateAction, useState } from 'react';
import { Link, Dialog, DialogTitle } from "@mui/material";

type propsType = {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>

}

export default function Walletss(props: propsType) {

    const { select, wallets } = useWallet();


    if (wallets.filter((w) => w.readyState === "Installed").length > 0) {
        return (

            <Dialog onClose={() => props.setOpen(false)} open={props.open}>
                <DialogTitle>Connect Wallet</DialogTitle>
                {
                    wallets.filter((wallet) => wallet.readyState === "Installed").map((wallet) => (

                        <Button
                            key={wallet.adapter.name}
                            onClick={() => {
                                select(wallet.adapter.name);
                                props.setOpen(false);
                            }}
                            variant="outlined" startIcon={<Avatar src={wallet.adapter.icon} alt={wallet.adapter.name} />}
                        >
                            {wallet.adapter.name}
                        </Button>

                    ))
                }
            </Dialog>
        );
    } else {
        return (

            <Dialog onClose={() => props.setOpen(false)} open={props.open}>
                <DialogTitle>No Wallet Found</DialogTitle>
            </Dialog>
        );
    }


};