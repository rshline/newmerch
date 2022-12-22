import Link from 'next/link'
import React from 'react'
import { CartState, Icart } from '../utils/custom'

function CartInfo(cart: Icart) {
  return (
    <div className='mx-10 my-6 min-h-screen'>
      <h1 className='text-3xl font-abeezee'>Your Cart</h1>
      <div className='flex'>
        <table className='w-4/6 font-inter text-lg table-fixed text-center my-4 mx-6'>
          <tbody>
            {cart.cart.products.map((product) => (
              <tr className='border-b border-solid border-neutral-100'>
                <td className='p-1'><img src={product.img} className="h-36" /></td>
                <td className='break-normal'>{product.name}</td>
                <td>${product.prices}</td>
              </tr>
            ))}
          </tbody>
        </table>   
        <div className='w-2/6 my-4 mx-6 px-4 py-2 rounded-lg bg-neutral-300'>
          <p>Total Items: {cart.cart.qty}</p>
          <p>Total Prices: ${cart.cart.total}</p>
        </div>     
      </div>

      
    </div>
  )
}

export default CartInfo