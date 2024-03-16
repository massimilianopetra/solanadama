import './css/style.css'

import { Inter, Architects_Daughter } from 'next/font/google'

import Footer from '@/components/ui/footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

const architects_daughter = Architects_Daughter({
  subsets: ['latin'],
  variable: '--font-architects-daughter',
  weight: '400',
  display: 'swap'
})

export const metadata = {
  title: 'SolanaDama Platform',
  description: 'The Reliability CryptoMunity Platform powered by Dama Token',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">

      <body className={`${inter.variable} ${architects_daughter.variable} font-inter antialiased dark:bg-gray-900 dark:text-gray-200 tracking-tight`}>
        <div className="flex flex-col min-h-screen overflow-hidden">

          {children}
          <Footer />
        </div>
      </body>
    </html>
  )
}

/* <script src="https://terminal.jup.ag/main-v2.js" /> */
