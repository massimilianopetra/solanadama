import Link from 'next/link'
import MobileMenu from './mobile-menu'

export default function HeaderApp() {
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
                <div>

                </div>
              </li>
            </ul>
          </nav>

          <MobileMenu />

        </div>
      </div>



    </header>
  )
}
