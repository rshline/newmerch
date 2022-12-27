import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
import { signIn, useSession } from 'next-auth/react'
import React from 'react'
import api from '../utils/axios-config'
import { Icart } from '../utils/custom'
const stripePromise = loadStripe(process.env.strive_public_key!)

function CartInfo(cart: Icart) {

  const cartItems = cart.cart.products

  const {data: session} = useSession()
  
  const createStripeCheckout = async () => {
    const stripe = await stripePromise

    if(session && stripe!= null){
      const checkoutSession = await api.post(`/create-checkout-session`, {
        data: {
          items: cartItems,
          email: session.user.email,
        },        
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

      {/* Empty */}
      <div className={`${cart.cart.qty!=0 && 'hidden'} my-7`}>
        <p className='text-center'>There is no item.</p>
      </div>

      {/* Cart Items */}
      <table className='w-full my-4 font-inter table-auto text-center'>
        <tbody>
          {cartItems.map((product, i) => (
            <tr className='border-b border-solid border-neutral-100' key={i}>
              <td className='p-1'><img src={product.img} className="lg:h-36 border border-solid border-primary-blue rounded" /></td>
              <td className='break-normal border-x border-solid border-neutral-100 py-2'>{product.name}</td>
              <td>${product.prices}</td>
            </tr>
          ))}
            <tr className={`${cart.cart.qty===0 && 'hidden'} border-b border-solid border-neutral-100`}>
              <td></td>
              <td className='font-bold'>{cart.cart.qty} items</td>
              <td className='font-bold'>${cart.cart.total}</td>
            </tr>
        </tbody>
      </table>   

      {/* Button */}
      <div className='flex justify-end w-full my-4'>
          <div className={`${session && 'hidden'} mx-1`}>
            <button onClick={() => signIn()} className={`px-2 py-1 cursor-pointer bg-primary-blue text-white rounded active:drop-shadow-lg active:bg-blend-overlay ${session && 'hidden'}`}>                
              Sign In to Checkout
            </button>            
          </div>                      

          <div  className={`${!session && 'hidden'} flex flex-col space-y-2`}>
            {/* <button onClick={createCODCheckout} disabled={cart.cart.qty==0} className={`px-2 py-1 cursor-pointer bg-primary-blue text-white rounded active:drop-shadow-lg active:bg-blend-overlay ${cart.cart.qty==0 && 'bg-gray-400 cursor-not-allowed'}`}>                
              Cash on Delivery (CoD)
            </button>   */}
            <button onClick={createStripeCheckout} disabled={cart.cart.qty==0} className={`px-2 py-1 cursor-pointer bg-primary-blue text-white rounded active:drop-shadow-lg active:bg-blend-overlay ${cart.cart.qty==0 && 'bg-gray-400 cursor-not-allowed'}`}>                
              Pay with Stripe
            </button>    
          </div>             
      </div>    

    </div>
  )
}

export default CartInfo