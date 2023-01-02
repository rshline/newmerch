import { ChevronDoubleLeftIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addProduct } from '../app/cartSlice'
import { Iproducts, productType } from '../utils/custom'
import { toast, ToastContainer } from "react-toastify";

function ProductDetail({ product }: Iproducts) {
  const subtotal = product.prices
  const [subqty, setSubQty] = useState(1)

  const dispatch = useDispatch()
  
  const handleClick = () => {
    dispatch(addProduct({...product, subtotal, subqty}))
    toast('🛒 Products have been added to your cart!')
  }

  return (
    <div className='flex flex-col w-5-xl max-w-5xl'>
      <div className='w-full'>
        <Link href={`/`}>
          <button className='flex mx-10 mt-6 px-4 py-1 space-x-2 rounded-full border border-solid border-primary-blue text-primary-blue hover:text-white hover:bg-primary-blue'>
            <ChevronDoubleLeftIcon height={13} className="my-2" /> 
            <p>Back</p>
          </button>
        </Link>
      </div>
      <div className='flex flex-col md:flex-row mx-10 mb-6'>
        <div className='flex w-full md:w-1/2 md:h-full py-6'>
          <img src={product.img} alt="" className='h-96 object-contain rounded-lg border border-solid border-primary-blue bg-primary-blue'  />
        </div>
        <div className='flex flex-col align-middle w-full md:w-1/2 h-full py-6 px-4 space-y-4'>
          <p className='text-sm font-abeezee font-bold'>{product.category}</p>
          <p className='text-5xl font-philosopher font-semibold'>{product.name}</p>
          <p className='text-3xl font-abeezee font-semibold'>${product.prices}</p>
          <p className='text-md font-abeezee'>{product.desc}</p>
          <div className='flex justify-between font-abeezee font-bold text-sm'>
            <p>Quantity</p>
            <div>
              <button
                disabled={subqty===0}
                onClick={() => setSubQty(subqty-1)}
                className='px-1 mx-1 text-white bg-primary-blue rounded-full'
              >
								-
							</button>
              <input
                value={subqty}
                className='w-4 text-center'
              />
              <button
                onClick={() => setSubQty(subqty+1)}
                className='px-1 mx-1 text-white bg-primary-blue rounded-full'
              >
                +
              </button>
            </div>
          </div>
          <button 
            disabled={subqty === 0}
            className={`w-full btn-navbar p-2 ${subqty===0 && 'cursor-not-allowed'}`}
            onClick={handleClick} > Add to Cart</button>
        </div>
      </div>      
    </div>

  )
}

export default ProductDetail