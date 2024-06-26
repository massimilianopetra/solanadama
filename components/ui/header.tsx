'use client'

import MobileMenu from './mobile-menu';
import { useState } from 'react';
import { Link } from "@mui/material";
import ConnectButton from '../connect_button';
import ToggleTheme from "@/components/ui/toggletheme"


export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute w-full z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Site branding */}
          <div className="shrink-0 mr-4">
            {/* Logo */}
            <Link href="/" className="block" aria-label="Cruip">
              <img src="/images/logo-header.png" />
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:grow">
            {/* Desktop sign in links */}
            <ul className="flex grow justify-end flex-wrap items-center">
              <li>
                <Link
                  href="/redeem" className="font-medium rounded-lg text-blue-600 hover:text-gray-200 px-2 py-3 flex items-center transition duration-150 ease-in-out">
                  Solana RedeemingTool
                </Link>
              </li>
              <li>
                <Link
                  href="/airdrop" className="font-medium rounded-lg text-blue-600 hover:text-gray-200 px-2 py-3 flex items-center transition duration-150 ease-in-out">
                  Airdrop Subcription
                </Link>
              </li>
              <li>
                <Link
                  href="/contactus" className="font-medium rounded-lg text-blue-600 hover:text-gray-200 px-2 py-3 flex items-center transition duration-150 ease-in-out">
                  Contact us
                </Link>
              </li>

              <li>
                <ConnectButton />
              </li>

              <li>
                <ToggleTheme />
              </li>


            </ul>
          </nav>

          <MobileMenu />

        </div>
      </div>


    </header>
  )
}
