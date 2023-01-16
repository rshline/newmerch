import { XMarkIcon } from '@heroicons/react/24/solid'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
import { signIn, useSession } from 'next-auth/react'
import React from 'react'
import { useDispatch } from 'react-redux'
import { incQty, decQty, removeProduct } from '../app/cartSlice'
import { Icart } from '../utils/custom'
const stripePromise = loadStripe(process.env.strive_public_key!)

function CartInfo(cart: Icart) {

  const cartItems = cart.cart.products

  const {data: session} = useSession()

  const dispatch = useDispatch()
  
  const createStripeCheckout = async () => {
    const stripe = await stripePromise

    if(session && stripe!= null){
      let checkoutData = JSON.stringify({
        items: cartItems,
        email: session.user.email, 
      })

      const checkoutSession = await axios.post("/api/create-checkout-session",  checkoutData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      const result = await stripe.redirectToCheckout({
        sessionId: checkoutSession.data.id
      })

      if (result.error){
        alert(result.error.message)
      }
    }
  }

  return (
    <div className='w-full my-8 min-h-screen'>
      <h1 className='mx-4 lg:mx-10 text-3xl font-abeezee'>Your Cart</h1>

      {/* Empty */}
      <div className={`${cart.cart.qty!=0 && 'hidden'} my-7`}>
        <p className='text-center'>There is no item.</p>
      </div>

      {/* Cart Items */}
      <div className='flex flex-col space-y-5 mx-4 lg:mx-10 my-10 font-abeezee'>
        {cartItems.map((product, i) => (
          <div key={i} className='grid grid-cols-5 lg:grid-cols-9 gap-2'>
            {/* image */}
            <div className='lg:col-span-2'>
              <img src={product.img} className="h-16 lg:h-40 border border-solid border-primary-blue rounded" />  
            </div>              
            {/* Product info */}
            <div className='flex flex-col col-span-2 lg:col-span-4 place-content-center'>
              <h1 className='text-sm lg:text-2xl'>{product.name}</h1>
              <p className='text-sm lg:text-lg'>${product.prices}</p>                     
            </div>               
            {/* Qty and price */}
            <div className='lg:col-span-2 grid grid-rows-2 grid-cols-1 lg:grid-rows-1 lg:grid-cols-2 gap-1'>
              {/* Quantity */}
              <div className='flex items-center lg:place-self-center'>
                <button
                  disabled={product.subqty==0}
                  onClick={() =>  dispatch(decQty({...product}))}
                  className='px-1 text-white bg-primary-blue rounded-full'
                >
                  -
                </button>     
                <input
                  value={product.subqty}
                  className='w-4 mx-1 text-center text-sm lg:text-lg'
                />
                <button
                  onClick={() => dispatch(incQty({...product}))}
                  className='px-1 text-white bg-primary-blue rounded-full'
                >
                  +
                </button>                           
              </div>
              {/* Subtotal */}
              <p className='flex text-sm lg:text-lg lg:place-self-center'>${product.subtotal.toFixed(2)}</p>
            </div>    
            {/* Delete */}
            <div className='flex place-content-end'>
              <XMarkIcon onClick={() => dispatch(removeProduct({...product}))} className='h-5 place-self-center cursor-pointer' />
            </div>
          </div>
        ))}          
      </div>

      {/* Total */}
      <div className='flex justify-between mx-4 lg:mx-10'>
        <p className='font-bold'>{cart.cart.qty} item(s)</p>
        <p className='font-bold'>Total: ${cart.cart.total.toFixed(2)}</p>
      </div>

      {/* Button */}
      <div className='flex justify-end my-4 mx-4 lg:mx-10'>
          <div className={`${session && 'hidden'}`}>
            <button onClick={() => signIn()} className={`px-2 py-1 cursor-pointer bg-primary-blue text-white rounded active:drop-shadow-lg active:bg-blend-overlay ${session && 'hidden'}`}>                
              Sign In to Checkout
            </button>            
          </div>                      

          <div  className={`${!session && 'hidden'} flex flex-col space-y-2`}>
            <button onClick={createStripeCheckout} disabled={cart.cart.qty==0} className={`px-2 py-1 cursor-pointer bg-primary-blue text-white rounded active:drop-shadow-lg active:bg-blend-overlay ${cart.cart.qty==0 && 'bg-gray-400 cursor-not-allowed'}`}>                
              Pay with Stripe
            </button>    
          </div>             
      </div>    

    </div>
  )
}

export default CartInfo