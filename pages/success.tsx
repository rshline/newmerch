import { CheckBadgeIcon } from '@heroicons/react/24/solid'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import router from 'next/router'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const Success: NextPage = () => {
  return (
    <div>
        <Head>
            <title>NewMerch</title>
            <meta name="description" content="NewJeans Merchandise Shop" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navbar />
        <main className="h-screen max-w-screen-lg mx-auto my-auto">
          <div className="flex flex-col p-10 mx-5 my-10 bg-white items-center space-y-5">
              <CheckBadgeIcon className="text-green-600 h-16" />
              <h1 className="text-4xl font-abeezee">Thank you for your purchase!</h1>          
              <p className='font-inter text-center'>
                Your order has been confirmed. We'll email you an order confirmation with details info.
                <Link href={`/`}><span className='text-primary-blue'> Continue Shopping</span></Link> or click the button below to see your order(s).
              </p>
              <button
              onClick={()=> router.push('/orders')}
              className="px-2 py-1 cursor-pointer bg-primary-blue text-white rounded active:drop-shadow-lg active:bg-blend-overlay">
                See order(s)
            </button>
          </div>
        </main>
        <Footer />
    </div>
  )
}

export default Success
