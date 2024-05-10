'use client'

import { MouseEventHandler } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

type propsType = {
    handler: MouseEventHandler<HTMLButtonElement>
}
export default function ConnectButton(props: propsType) {

    const { publicKey, disconnect } = useWallet();

    if (!publicKey) {
        return (
            <button onClick={props.handler} className="text-sm btn-sm rounded-lg text-white bg-blue-700 hover:bg-blue-900 ml-3">
                Connect Wallet
            </button>
        );
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