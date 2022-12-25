import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
import { iteratorSymbol } from 'immer/dist/internal'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import { CartState, Icart } from '../utils/custom'
const stripePromise = loadStripe(process.env.strive_public_key!)

function CartInfo(cart: Icart) {

  const cartItems = cart.cart.products

  const {data: session} = useSession()

  const createCODCheckout = () => {
    

  }
  
  const createStripeCheckout = async () => {
    const stripe = await stripePromise

    if(session && stripe!= null){
      const checkoutSession = await axios.post('/api/create-checkout-session', {
        items: cartItems,
        email: session?.user?.email,
      })

      const result = await stripe.redirectToCheckout({
        sessionId: checkoutSession.data.id
      })

      if (result.error){
        alert(result.error.message)
      }
    }
  }

  return (
    <div className='mx-10 my-6 min-h-screen'>
      <h1 className='text-3xl font-abeezee'>Your Cart</h1>
      <div className='flex flex-col md:flex-row'>
        <table className='w-full font-inter text-lg table-fixed text-center my-4 mx-6'>
          <tbody>
            {cart.cart.products.map((product) => (
              <tr className='border-b border-solid border-neutral-100' key={product._id}>
                <td className='p-1'><img src={product.img} className="h-36" /></td>
                <td className='break-normal'>{product.name}</td>
                <td>${product.prices}</td>
              </tr>
            ))}
          </tbody>
        </table>   
        <div className='flex flex-col text-center w-full lg:w-2/6 my-4 mx-0 lg:mx-6 px-4 py-2 space-y-3 rounded-lg bg-neutral-300'>
          <div>
            <p>Total Items: {cart.cart.qty}</p>
            <p>Total Prices: ${cart.cart.total}</p>            
          </div>

          <div>
            <button onClick={() => signIn()} className={`px-2 py-1 cursor-pointer bg-primary-blue text-white rounded active:drop-shadow-lg active:bg-blend-overlay ${session && 'hidden'}`}>                
              Sign In to Checkout
            </button>            
          </div>

          <div  className={`${!session && 'hidden'} flex flex-col space-y-2`}>
            <button onClick={createCODCheckout} disabled={cart.cart.qty==0} className={`px-2 py-1 cursor-pointer bg-primary-blue text-white rounded active:drop-shadow-lg active:bg-blend-overlay ${cart.cart.qty==0 && 'bg-gray-400 cursor-not-allowed'}`}>                
              Cash on Delivery (CoD)
            </button>  
            <button onClick={createStripeCheckout} disabled={cart.cart.qty==0} className={`px-2 py-1 cursor-pointer bg-primary-blue text-white rounded active:drop-shadow-lg active:bg-blend-overlay ${cart.cart.qty==0 && 'bg-gray-400 cursor-not-allowed'}`}>                
              Pay with Stripe
            </button>    
          </div>
        </div>     
      </div>
    </div>
  )
}

export default CartInfo