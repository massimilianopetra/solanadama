export default function GetToken() {
    return (
        <section>
            <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
                {/* Section header */}
                <div className="py-12 md:py-14">
                    <div className="max-w-3xl mx-auto text-center pb-8 md:pb-10">
                        <a name="gettoken">
                            <h1 className="h1 mb-4" data-aos="fade-up">Get DaMa Token</h1>
                        </a>
                        <p className="text-xl text-white-100 mb-8" data-aos="fade-up" data-aos-delay="200">
                            Swap DaMa tokens and supports our project
                        </p>
                        <a href="https://solscan.io/token/FvjpE23aoMwTygaMeAN1YsqB6UMpix89HxBGyF933tU1" className="text-gray-400 hover:text-white" target="_blank">
                            Contract Address FvjpE23aoMwTygaMeAN1YsqB6UMpix89HxBGyF933tU1
                        </a>
                    </div>
                </div>
                {/* Steps */}
                <div className="max-w-sm mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-start md:max-w-2xl lg:max-w-none">
                    {/* Get SOL */}
                    <div className="relative flex flex-col items-center p-6 bg-zinc-800 rounded shadow-xl">
                        <svg className="w-16 h-16 p-1 -mt-1 mb-2" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                            <g fill="none" fill-rule="evenodd">
                                <rect className="fill-current text-zinc-800" width="64" height="64" rx="32"></rect>
                                <g stroke-width="2">
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

                    {/* Tramsfer SOL */}
                    <div className="relative flex flex-col items-center p-6 bg-zinc-800 rounded shadow-xl">
                        <svg className="w-16 h-16 p-1 -mt-1 mb-2" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                            <g fill="none" fill-rule="evenodd">
                                <rect className="fill-current text-zinc-800" width="64" height="64" rx="32"></rect>
                                <g stroke-width="2" transform="translate(19.429 20.571)">
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
                    {/* Tramsfer SOL */}
                    <div className="relative flex flex-col items-center p-6 bg-zinc-800 rounded shadow-xl">
                        <svg className="w-16 h-16 p-1 -mt-1 mb-2" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                            <g fill="none" fill-rule="evenodd">
                                <rect className="fill-current text-zinc-800" width="64" height="64" rx="32"></rect>
                                <g stroke-width="2">
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

                            and connect your Phantom wallet
                        </p>
                    </div>

                    {/* Swap SOL - DAMA */}
                    <div className="relative flex flex-col items-center p-6 bg-zinc-800 rounded shadow-xl">
                        <svg className="w-16 h-16 p-1 -mt-1 mb-2" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                            <g fill="none" fill-rule="evenodd">
                                <rect className="fill-current text-zinc-800" width="64" height="64" rx="32"></rect>
                                <g stroke-width="2">
                                    <path className="stroke-current text-white" d="M32 37.714A5.714 5.714 0 0037.714 32a5.714 5.714 0 005.715 5.714"></path>
                                    <path className="stroke-current text-white" d="M32 37.714a5.714 5.714 0 015.714 5.715 5.714 5.714 0 015.715-5.715M20.571 26.286a5.714 5.714 0 005.715-5.715A5.714 5.714 0 0032 26.286"></path>
                                    <path className="stroke-current text-white" d="M20.571 26.286A5.714 5.714 0 0126.286 32 5.714 5.714 0 0132 26.286"></path>
                                    <path className="stroke-current text-blue-300" d="M21.714 40h4.572M24 37.714v4.572M37.714 24h4.572M40 21.714v4.572" stroke-linecap="square"></path>
                                </g>
                            </g>
                        </svg>
                        <h4 className="text-xl font-bold leading-snug tracking-tight mb-1 text-gray-300">Step 4</h4>
                        <p className="text-white text-center">Swap $SOL for <strong> $DAMA </strong> using the correct contract adress</p>
                    </div>

                    {/* HODL */}
                    <div className="relative flex flex-col items-center p-6 bg-zinc-800 rounded shadow-xl">
                        <svg className="w-16 h-16 p-1 -mt-1 mb-2" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                            <g fill="none" fill-rule="evenodd">
                                <rect className="fill-current text-zinc-800" width="64" height="64" rx="32"></rect>
                                <g stroke-width="2">
                                    <path className="stroke-current text-white" d="M19.429 32a12.571 12.571 0 0021.46 8.89L23.111 23.11A12.528 12.528 0 0019.429 32z"></path>
                                    <path className="stroke-current text-blue-300" d="M32 19.429c6.943 0 12.571 5.628 12.571 12.571M32 24a8 8 0 018 8"></path>
                                    <path className="stroke-current text-white" d="M34.286 29.714L32 32"></path>
                                </g>
                            </g>
                        </svg>
                        <h4 className="text-xl font-bold leading-snug tracking-tight mb-1 text-gray-300">Step 5</h4>
                        <p className="text-white text-center">
                            You are now enabled to all SolanaDama platform's features
                        </p>
                    </div>

                    <div className="relative flex flex-col items-center p-6 bg-zinc-800 rounded shadow-xl">
                        <svg className="w-16 h-16 p-1 -mt-1 mb-2" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                            <g fill="none" fill-rule="evenodd">
                                <rect className="fill-current text-zinc-800" width="64" height="64" rx="32"></rect>
                                <g stroke-width="2" stroke-linecap="square">
                                    <path className="stroke-current text-white" d="M29.714 40.358l-4.777 2.51 1.349-7.865-5.715-5.57 7.898-1.147L32 21.13l3.531 7.155 7.898 1.147L40 32.775"></path>
                                    <path className="stroke-current text-blue-300" d="M44.571 43.429H34.286M44.571 37.714H34.286"></path>
                                </g>
                            </g>
                        </svg>
                        <h4 className="text-xl font-bold leading-snug tracking-tight mb-1 text-gray-300">Step 6</h4>
                        <p className="text-white text-center">Enjoy the <strong> $DAMA </strong>
                            token and support our project!
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}