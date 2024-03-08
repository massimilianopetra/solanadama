export const metadata = {
  title: 'SolanaDama',
  description: 'Page description',
}

import Hero from '@/components/hero'
import Features from '@/components/features'
import Newsletter from '@/components/newsletter'
import GetToken from '@/components/gettoken'
import Testimonials from '@/components/testimonials'

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <GetToken />
      {/* <Testimonials /> */}
      <Newsletter />
    </>
  )
}
