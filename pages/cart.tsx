import type { NextPage } from 'next'
import Head from 'next/head'
import { useSelector } from 'react-redux'
import CartInfo from '../components/CartInfo'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { Icart } from '../utils/custom'

const Cart: NextPage = () => {

  const cart = useSelector((state: Icart) => state.cart)

  return (
    <div>
      <Head>
        <title>NewMerch - Cart</title>
        <meta name="description" content="NewJeans Merchandise Shop" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <CartInfo cart={cart} />
      <Footer />   
    </div>
  )
}

export default Cart
