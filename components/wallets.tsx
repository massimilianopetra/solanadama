import { useWallet } from "@solana/wallet-adapter-react";

export default function Wallets() {

    const { select, wallets, publicKey, disconnect } = useWallet();

    if (!publicKey) {

        if (wallets.filter((w) => w.readyState === "Installed").length > 0) {
            return (
                wallets.filter((wallet) => wallet.readyState === "Installed").map((wallet) => (
                    
                    <div className="flex justify-center p-1">
                        <button
                            type="button"
                            className="btn-sm rounded-lg text-white bg-red-700 hover:bg-red-900 ml-3"
                            onClick={() => select(wallet.adapter.name)}
                        >
                            <span>Connect {wallet.adapter.name} Wallet</span>
                        </button>
                    </div>
                
                ))

            );
        } else {
            return (<p>No wallet found. Please download a supported Solana wallet</p>);
        }

    }
    else {
        console.log("{publicKey.toBase58()}")
        return (
            <button
                type="button"
                className="btn-sm rounded-lg text-white bg-green-700 hover:bg-green-900 ml-3"
                onClick={disconnect}
            >
                <span>Disconnect ... {publicKey.toBase58().substring(publicKey.toBase58().length - 5)}</span>
            </button>
        );

    }
};