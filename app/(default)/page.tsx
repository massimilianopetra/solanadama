export const metadata = {
  title: 'SolanaDama',
  description: 'SolanaDama Platoform',
}

import Header from '@/components/ui/header'
import Intro from '@/components/intro'
import Features from '@/components/features'
import Newsletter from '@/components/newsletter'
import GetToken from '@/components/gettoken'


export default function Home() {
  return (
    <>
      <Header />
      <Intro />
      <Features />
      <GetToken />
      <Newsletter />
    </>
  )
}
