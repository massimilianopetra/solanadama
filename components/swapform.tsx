'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { VersionedTransaction, Connection } from '@solana/web3.js';
import React, { useState, useEffect, useCallback } from 'react';
import DynamicMessage from '@/components/dynamicmessage';

const assets = [
    { name: 'SOL', mint: 'So11111111111111111111111111111111111111112', decimals: 9 },
    { name: 'USDC', mint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', decimals: 6 },
    { name: 'DAMA', mint: 'FvjpE23aoMwTygaMeAN1YsqB6UMpix89HxBGyF933tU1', decimals: 6 },
];



const debounce = <T extends unknown[]>(
    func: (...args: T) => void,
    wait: number
) => {
    let timeout: NodeJS.Timeout | undefined;

    return (...args: T) => {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

export default function SwapForm() {
    const [fromAsset, setFromAsset] = useState(assets[0]);
    const [toAsset, setToAsset] = useState(assets[2]);
    const [fromAmount, setFromAmount] = useState(0);
    const [toAmount, setToAmount] = useState(0);
    const [quoteResponse, setQuoteResponse] = useState(null);
    const [dMessage, setMessage] = useState({ message: '', color: '', timeout: -1 });

    const wallet = useWallet();

    const connection = new Connection('https://mainnet.helius-rpc.com/?api-key='+process.env.NEXT_PUBLIC_HELIUSKEY);
    //const connection = new Connection('https://solana-mainnet.g.alchemy.com/v2/'+process.env.NEXT_PUBLIC_ALKEMYKEY);

    /*console.info("******************")
    console.info(process.env.NEXT_PUBLIC_ALKEMYKEY)
    console.info("-----------------")*/

    const handleFromAssetChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(`From Asset Change: ${event.target.value}`);
        setFromAsset(
            assets.find((asset) => asset.name === event.target.value) || assets[0]
        );
    };

    const handleToAssetChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(`To Asset Change: ${event.target.value}`);
        setToAsset(
            assets.find((asset) => asset.name === event.target.value) || assets[2]
        );
    };

    const handleFromValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFromAmount(Number(event.target.value));
    };

    const debounceQuoteCall = useCallback(debounce(getQuote, 500), []);

    useEffect(() => {
        console.log(fromAsset);
        debounceQuoteCall(fromAmount, fromAsset, toAsset);
    }, [fromAmount, fromAsset,toAsset, debounceQuoteCall]);

    async function getQuote(currentAmount: number, 
        currentFromAsset: { name: string; mint: string; decimals: number },
        currentToAsset: { name: string; mint: string; decimals: number }) {

        console.log("getQuote");
        console.log(`Amount: ${currentAmount}`);
        console.log(`From ${currentFromAsset.name} ${currentFromAsset.mint}`);
        console.log(`To ${currentToAsset.name} ${currentToAsset.mint}`);

        if (isNaN(currentAmount) || currentAmount <= 0) {
            console.error('Invalid fromAmount value:', currentAmount);
            return;
        }

        /*  https://quote-api.jup.ag/v6/quote?inputMint=So11111111111111111111111111111111111111112&outputMint=FvjpE23aoMwTygaMeAN1YsqB6UMpix89HxBGyF933tU1&amount=10000000 */
        const quote = await (
            await fetch(
                `https://quote-api.jup.ag/v6/quote?inputMint=${currentFromAsset.mint}&outputMint=${currentToAsset.mint}&amount=${currentAmount * Math.pow(10, currentFromAsset.decimals)}&slippageBps=1000`
            )
        ).json();

        if (quote && quote.outAmount) {
            const outAmountNumber =
                Number(quote.outAmount) / Math.pow(10, currentToAsset.decimals);
            setToAmount(outAmountNumber);
        }

        console.log(quote);
        setQuoteResponse(quote);

    }

    async function signAndSendTransaction() {

        console.log("signAndSendTransaction");
        console.log(quoteResponse);
        console.log(`Address ${wallet.publicKey?.toString()}`)

        /*
        JSON.stringify({
            quoteResponse,
            userPublicKey: wallet.publicKey?.toString(),
            wrapAndUnwrapSol: true,

            // feeAccount is optional. Use if you want to charge a fee.  feeBps must have been passed in /quote API.
            // feeAccount: "fee_account_public_key"
        })
        */

        if (!wallet.connected || !wallet.signTransaction) {
            console.error(
                'Wallet is not connected or does not support signing transactions'
            );
            return;
        }

        console.log("aa")
        // get serialized transactions for the swap
        const { swapTransaction } = await (
            await fetch('https://quote-api.jup.ag/v6/swap', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    quoteResponse,
                    userPublicKey: wallet.publicKey?.toString(),
                    wrapAndUnwrapSol: true,
                    // feeAccount is optional. Use if you want to charge a fee.  feeBps must have been passed in /quote API.
                    // feeAccount: "fee_account_public_key"
                }),
            })
        ).json();

        console.log("bb")
        try {
            // deserialize the transaction
            const swapTransactionBuf = Buffer.from(swapTransaction, 'base64');
            const transaction = VersionedTransaction.deserialize(swapTransactionBuf);
            console.log("cc")
            // sign the transaction
            const signedTransaction = await wallet.signTransaction(transaction);
            console.log("dd")

            // Execute the transaction
            const rawTransaction = signedTransaction.serialize();
            const txid = await connection.sendRawTransaction(rawTransaction, {
                skipPreflight: true,
                maxRetries: 2,
            });
            console.log(`https://solscan.io/tx/${txid}`);

            console.log("ee")

            // Confirm transaction
            const latestBlockHash = await connection.getLatestBlockhash();
            console.log("ff");

            console.log(latestBlockHash);
            setMessage({ message: "Transaction in progress", color: "rgb(150 150 150)", timeout: -1 });
            await connection.confirmTransaction({
                blockhash: latestBlockHash.blockhash,
                lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
                signature: txid
            }, 'confirmed');

            console.log("gg");

            
            setMessage({ message: "Transaction success", color: "rgb(21 128 61)", timeout: 10000 });

        } catch (error) {
            console.error('Error signing or sending the transaction:', error);
            setMessage({ message: "Transaction error", color: "rgb(220 38 38)", timeout: 10000 });
        }
    }


    return (
        <div className="flex flex-col items-center justify-center">
            <div className="w-80 bg-gray-200 dark:bg-gray-800 rounded-xl p-6 border border-blue-700">
                <div>
                    <div className="mb-3 font-bold text-xl">You swap</div>
                    <input
                        type="number"
                        value={fromAmount}
                        onChange={handleFromValueChange}
                        className="dark:bg-gray-700 text-lg mb-3 rounded-xl dark:text-white p-3 border-0 w-4/5 text-right"
                    />
                    <select
                        value={fromAsset.name}
                        onChange={handleFromAssetChange}
                        className="dark:bg-gray-700 text-lg mb-3 rounded-xl dark:text-white p-3 border-0 w-4/5 text-left"
                    >
                        {assets.map((asset) => (
                            <option key={asset.mint} value={asset.name}>
                                {asset.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <div className="mb-3 font-bold text-xl ">You receive</div>
                    <input
                        type="number"
                        value={toAmount}
                        // onChange={(e) => setToAmount(Number(e.target.value))}
                        className="dark:bg-gray-700 text-lg mb-3 rounded-xl dark:text-white p-3 border-0 w-4/5 text-right"
                        readOnly
                    />
                    <select
                        value={toAsset.name}
                        onChange={handleToAssetChange}
                        className="dark:bg-gray-700 text-lg mb-3 rounded-xl dark:text-white p-3 border-0 w-4/5 text-left"
                    >
                        {assets.map((asset) => (
                            <option key={asset.mint} value={asset.name}>
                                {asset.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    onClick={signAndSendTransaction}
                    className="text-white bg-blue-700 hover:bg-blue-900 rounded-xl p-3 w-1/2"
                    disabled={toAsset.mint === fromAsset.mint}
                >
                    Swap
                </button>

            </div>
            <DynamicMessage message={dMessage.message} color={dMessage.color} timeout={dMessage.timeout} />
        </div>
    );
}