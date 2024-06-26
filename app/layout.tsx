import './css/style.css'

import { Inter, Architects_Daughter } from 'next/font/google'
import Script from 'next/script'

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
      <head>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-BQCQY9SJQL"></Script>
        <Script id='google-analytics'>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-BQCQY9SJQL');
          `
            }
        </Script>
      </head>
      <body className={`${inter.variable} ${architects_daughter.variable} bg-white font-inter antialiased dark:bg-gray-900 dark:text-gray-200 tracking-tight`}>
        <div className="flex flex-col min-h-screen overflow-hidden">

          {children}
          <Footer />
        </div>
      </body>
    </html>
  )
}


