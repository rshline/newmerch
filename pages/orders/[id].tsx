import { Navbar, Footer } from 'flowbite-react'
import type { NextPage } from 'next'
import Head from 'next/head'

const Order: NextPage = () => {
  return (
    <div>
      <Head>
        <title>NewMerch</title>
        <meta name="description" content="NewJeans Merchandise Shop" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Footer />   
    </div>
  )
}

export default Order
