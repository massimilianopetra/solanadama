import { useWallet } from "@solana/wallet-adapter-react";

export default function Wallets() {

    const { select, wallets, publicKey, disconnect } = useWallet();

    if (!publicKey) {

        if (wallets.filter((w) => w.readyState === "Installed").length > 0) {
            return (
                wallets.filter((wallet) => wallet.readyState === "Installed").map((wallet) => (
                        <button
                            type="button"
                            className="py-2.5  text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700"
                            onClick={() => select(wallet.adapter.name)}
                        >
                            <span>Connect {wallet.adapter.name} Wallet</span>
                        </button>
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
            className="py-2.5 px-5 text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700"
            onClick={disconnect}
        >
            <span>Disconnect ...{publicKey.toBase58().substring(publicKey.toBase58().length-5)}</span>
        </button>
        );

    }
};