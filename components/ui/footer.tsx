import React from 'react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer>
      <div className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">

          <div className="text-xs text-white">
            <p>
              Disclaimer:
            </p>
            <p>

              This website and the SolanaDama Platform does not constitute investment advice, solicitation, or recommendation to buy or sell any financial instruments.
              The content provided here is not intended as a substitute for professional financial advice.
            </p>
            <p>
              Investing in financial markets involves risks, and individuals should carefully consider their own financial situation and objectives before making any investment
              decisions. The information presented on this website is believed to be accurate and reliable, but we make no representations or warranties, express or implied,
              regarding the accuracy, completeness, or suitability of the information provided.
            </p>
            Users of this website are solely responsible for their own investment decisions and should conduct their own research and due diligence before engaging in any
            financial transactions. We do not endorse or recommend any specific investment products or services mentioned on this website.
            <p>
              By accessing this website, you agree that we are not liable for any loss or damage resulting from the use of the information provided herein. Past performance
              is not indicative of future results, and investment outcomes may vary.
            </p>
          </div>
          <br />

          {/* Bottom area */}
          <div className="md:flex md:items-center md:justify-between">

            {/* Social links */}
            <ul className="flex mb-4 md:order-1 md:ml-4 md:mb-0">
              {/* X */}
              <li>
                <Link href="https://twitter.com/SolanaDaMa" className="flex justify-center items-center text-red-600 bg-gray-800 hover:text-gray-100 hover:bg-purple-600 rounded-full transition duration-150 ease-in-out" aria-label="Twitter">
                  <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="m13.063 9 3.495 4.475L20.601 9h2.454l-5.359 5.931L24 23h-4.938l-3.866-4.893L10.771 23H8.316l5.735-6.342L8 9h5.063Zm-.74 1.347h-1.457l8.875 11.232h1.36l-8.778-11.232Z" />
                  </svg>
                </Link>
              </li>
              {/* Github */}
              <li className="ml-4">
                <Link href="https://github.com/solanadama/solanadama/tree/main" className="flex justify-center items-center text-red-600 bg-gray-800 hover:text-gray-100 hover:bg-purple-600 rounded-full transition duration-150 ease-in-out" aria-label="Github">
                  <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 8.2c-4.4 0-8 3.6-8 8 0 3.5 2.3 6.5 5.5 7.6.4.1.5-.2.5-.4V22c-2.2.5-2.7-1-2.7-1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.3 1.9.9 2.3.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-4 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8.6-.2 1.3-.3 2-.3s1.4.1 2 .3c1.5-1 2.2-.8 2.2-.8.4 1.1.2 1.9.1 2.1.5.6.8 1.3.8 2.1 0 3.1-1.9 3.7-3.7 3.9.3.4.6.9.6 1.6v2.2c0 .2.1.5.6.4 3.2-1.1 5.5-4.1 5.5-7.6-.1-4.4-3.7-8-8.1-8z" />
                  </svg>
                </Link>
              </li>
              {/* Telegram */}
              <li className="ml-4">
                <Link href="https://t.co/30uMljzVyZ" className="flex justify-center items-center text-red-600 bg-gray-800 hover:text-gray-100 hover:bg-purple-600 rounded-full transition duration-150 ease-in-out" aria-label="Linkedin">
                  <svg className="w-8 h-8 fill-current" viewBox="-100 -100 700 700" xmlns="http://www.w3.org/2000/svg">
                    <path d="M446.7 98.6l-67.6 318.8c-5.1 22.5-18.4 28.1-37.3 17.5l-103-75.9-49.7 47.8c-5.5 5.5-10.1 10.1-20.7 10.1l7.4-104.9 190.9-172.5c8.3-7.4-1.8-11.5-12.9-4.1L117.8 284 16.2 252.2c-22.1-6.9-22.5-22.1 4.6-32.7L418.2 66.4c18.4-6.9 34.5 4.1 28.5 32.2z"></path>
                  </svg>
                </Link>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  )
}
