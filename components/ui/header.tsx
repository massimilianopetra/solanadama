import Link from 'next/link'
import MobileMenu from './mobile-menu'

import ToggleTheme from "@/components/ui/toggletheme"

export default function Header() {
  return (
    <header className="absolute w-full z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
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
                  href="/redeem" className="font-medium rounded-lg text-blue-600 hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out">
                  Solana RecoverTool
                </Link>
              </li>
              <li>
                <Link
                  href="/airdrop" className="font-medium rounded-lg text-blue-600 hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out">
                  Airdrop Subcription
                </Link>
              </li>
              <li>
                <Link
                  href="/swap" className="font-medium rounded-lg text-blue-600 hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out">
                  SwapTool
                </Link>
              </li>
              <li>
                <ToggleTheme />
              </li>
              {/*
              <li>
                <Link href="/dapp" className="btn-sm rounded-lg text-white bg-blue-700 hover:bg-blue-900 ml-3">
                  Launch App
                </Link>
              </li>
               */}
            </ul>
          </nav>

          <MobileMenu />

        </div>
      </div>



    </header>
  )
}
