export default function GetToken() {
    return (
        <section>
            <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
                <div className="py-12 md:py-12 border-t border-gray-700">
                    {/* Section header */}
                    <div>
                        <div className="max-w-3xl mx-auto text-center pb-8 md:pb-10">
                            <h1 id="gettoken" className="h1 mb-4" data-aos="fade-up">Get DaMa Token</h1>

                            <a href="https://solscan.io/token/FvjpE23aoMwTygaMeAN1YsqB6UMpix89HxBGyF933tU1" className="text-gray-400 hover:text-red-500" target="_blank">
                                Contract Address FvjpE23aoMwTygaMeAN1YsqB6UMpix89HxBGyF933tU1
                            </a>
                            <br />
                            <p className="text-gray-500 dark:text-gray-200 text-center mb-8">If you want to support our project and if you believe in what we are building you can either get our
                                utility token by directly connect to the <a href="/swap" className="text-gray-400 hover:text-red-500" target="_blank"> SolaDama Swap App </a>
                                or if you prefer follow the 3 steps listed below and obtain Dama token from the main DEX exchanges
                            </p>
                        </div>
                    </div>
                    {/* Steps */}
                    <div className="max-w-sm mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-start md:max-w-2xl lg:max-w-none ">
                        {/* Get SOL */}
                        <div className="relative flex flex-col items-center p-6 bg-zinc-800 rounded-lg shadow">
                            <svg className="w-16 h-16 p-1 -mt-1 mb-2" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                                <g fill="none" fillRule="evenodd">
                                    <rect className="fill-current text-zinc-800" width="64" height="64" rx="32"></rect>
                                    <g className="stroke-2">
                                        <path className="stroke-current text-blue-300" d="M34.514 35.429l2.057 2.285h8M20.571 26.286h5.715l2.057 2.285"></path>
                                        <path className="stroke-current text-white" d="M20.571 37.714h5.715L36.57 26.286h8"></path>
                                        <path className="stroke-current text-blue-300" strokeLinecap="square" d="M41.143 34.286l3.428 3.428-3.428 3.429"></path>
                                        <path className="stroke-current text-white" strokeLinecap="square" d="M41.143 29.714l3.428-3.428-3.428-3.429"></path>
                                    </g>
                                </g>
                            </svg>
                            <h4 className="text-xl font-bold leading-snug tracking-tight mb-1 text-gray-300">Step 1</h4>
                            <p className="text-white text-center">Get Solana from any Centralized or Decentralized Exchange</p>
                        </div>

                        {/* Get Phantom */}
                        <div className="relative flex flex-col items-center p-6 bg-zinc-800 rounded-lg shadow">
                            <svg className="w-16 h-16 p-1 -mt-1 mb-2" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                                <g fill="none" fillRule="evenodd">
                                    <rect className="fill-current text-zinc-800" width="64" height="64" rx="32"></rect>
                                    <g className="stroke-2" transform="translate(19.429 20.571)">
                                        <circle className="stroke-current text-white" strokeLinecap="square" cx="12.571" cy="12.571" r="1.143"></circle>
                                        <path className="stroke-current text-white" d="M19.153 23.267c3.59-2.213 5.99-6.169 5.99-10.696C25.143 5.63 19.514 0 12.57 0 5.63 0 0 5.629 0 12.571c0 4.527 2.4 8.483 5.99 10.696"></path>
                                        <path className="stroke-current text-blue-300" d="M16.161 18.406a6.848 6.848 0 003.268-5.835 6.857 6.857 0 00-6.858-6.857 6.857 6.857 0 00-6.857 6.857 6.848 6.848 0 003.268 5.835"></path>
                                    </g>
                                </g>
                            </svg>
                            <h4 className="text-xl font-bold leading-snug tracking-tight mb-1 text-gray-300">Step 2</h4>
                            <p className="text-white text-center">Install
                                <a href="https://phantom.app/download" className="text-gray-400 hover:text-white" target="_blank"> Phantom Wallet </a>
                                and transfer the amount of your choice
                            </p>
                        </div>

                        {/* Swap Dama */}
                        <div className="relative flex flex-col items-center p-6 bg-zinc-800 rounded-lg shadow">
                            <svg className="w-16 h-16 p-1 -mt-1 mb-2" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                                <g fill="none" fillRule="evenodd">
                                    <rect className="fill-current text-zinc-800" width="64" height="64" rx="32"></rect>
                                    <g className="stroke-2">
                                        <path className="stroke-current text-blue-300" d="M34.743 29.714L36.57 32 27.43 43.429H24M24 20.571h3.429l1.828 2.286"></path>
                                        <path className="stroke-current text-white" strokeLinecap="square" d="M34.743 41.143l1.828 2.286H40M40 20.571h-3.429L27.43 32l1.828 2.286"></path>
                                        <path className="stroke-current text-blue-300" d="M36.571 32H40"></path>
                                        <path className="stroke-current text-white" d="M24 32h3.429" strokeLinecap="square"></path>
                                    </g>
                                </g>
                            </svg>
                            <h4 className="text-xl font-bold leading-snug tracking-tight mb-1 text-gray-300">Step 3</h4>
                            <p className="text-white  text-center">
                                Go to
                                <a href="https://jup.ag/swap/SOL-DAMA_FvjpE23aoMwTygaMeAN1YsqB6UMpix89HxBGyF933tU1" className="text-gray-400 hover:text-white" target="_blank"> Jupiter </a>

                                or

                                <a href="https://v1.orca.so" className="text-gray-400 hover:text-white" target="_blank"> Orca </a>

                                connect your wallet and swap SOL-DAMA
                            </p>
                        </div>

                    </div>
                    <div>
                        <br />
                        <p className="text-gray-500 dark:text-gray-200 mb-8 text-justify">
                            Dama Token was released on March 7th on the Solana Network. Unlike other projects associated with a token, we chose not to engage in a presale.
                            Instead, we allowed our early adopters to acquire tokens immediately to mitigate the risk of potential fraud. What early adopter acquire is immediately
                            available for them to hold over time, potentially benefiting from any increase in value. However, at any point, if you, as early adopter, no longer wish
                            to hold onto the token, you have the option to exchange it on the market, as it is listed from the outset
                        </p>
                        <p className="text-gray-500 dark:text-gray-200 mb-8 text-justify">
                            Below, you can view the performance chart available on the
                            <a href="https://dexscreener.com/solana/bbg5xqoqvbbiym32bnu4adcnyt7mcbmpashywhdy6zxu" className="text-gray-400 hover:text-red-500" target="_blank"> DEXSCREEN </a>
                            aggregator, allowing you to track the token's progress over time
                        </p>
                        <img src="/images/graph.png" />
                    </div>
                </div>
            </div>

        </section>
    )
}