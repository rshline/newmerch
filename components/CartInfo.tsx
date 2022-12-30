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
    <div className='mx-10 my-6 min-h-screen'>
      <h1 className='text-3xl font-abeezee'>Your Cart</h1>

      {/* Empty */}
      <div className={`${cart.cart.qty!=0 && 'hidden'} my-7`}>
        <p className='text-center'>There is no item.</p>
      </div>

      {/* Cart Items */}
      <div className='flex flex-col flex-wrap w-screen my-4 space-y-3 font-abeezee'>
        {cartItems.map((product, i) => (
          <div key={i} className='flex justify-between w-full'>
            <div className='flex w-4/6 items-center space-x-5'>
              {/* Image */}
              <div className='space-y-3'>
                <img src={product.img} className="h-16 lg:h-40 border border-solid border-primary-blue rounded" />  
              </div> 
              {/* Product info */}
              <div className='flex flex-col'>
                <h1 className='text-md lg:text-2xl'>{product.name}</h1>
                <p className='text-sm lg:text-lg'>${product.prices}</p>                     
              </div>              
            </div>    
            <div className='flex flex-col lg:flex-row w-1/6 items-center lg:space-x-5'>
              {/* Quantity */}
              <div className='flex'>
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
              <p className='flex text-sm lg:text-lg'>${product.subtotal.toFixed(2)}</p>
            </div>    
            {/* Delete */}
            <div className='flex w-1/6 mx-3 items-center cursor-pointer'>
              <XMarkIcon onClick={() => dispatch(removeProduct({...product}))} className='h-5' />
            </div>
          </div>
        ))}          
      </div>
      <div className='flex justify-between m-4'>
        <p className='font-bold'>{cart.cart.qty} item(s)</p>
        <p className='font-bold'>Total: ${cart.cart.total.toFixed(2)}</p>
      </div>

      {/* Button */}
      <div className='flex justify-end w-full my-4'>
          <div className={`${session && 'hidden'} mx-1`}>
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