export const metadata = {
  title: 'SolanaDama Swap Tools',
  description: 'SolanaDama Swap Tools',
}

import Wallets from '@/components/wallets'
export default function Swap() {


  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">

          {/* Page header */}
          <div className="max-w-3xl mx-auto justify-center pb-12 md:pb-20">
            <h1 className="h1">SolanaDama Swap Tools</h1>
            <br />
 
            <div className="flex flex-col justify-between h-32 w-64">
              <Wallets />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
