import { ChevronDoubleLeftIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addProduct } from '../app/cartSlice'
import { Iproducts, productType } from '../utils/custom'

function ProductDetail({ product }: Iproducts) {
  const [price, setPrice] = useState(product.prices)
  const [qty, setQty] = useState(1)

  const dispatch = useDispatch()
  
  const handleClick = () => {
    dispatch(addProduct({...product, price, qty}))
  }

  return (
    <div className='flex flex-col w-5-xl max-w-5xl'>
      <div className='w-full'>
        <Link href={`/`}>
          
          <button className='btn-navbar flex mx-10 my-6 px-4 py-1'>Back</button>
        </Link>
      </div>
      <div className='flex flex-col md:flex-row'>
        <div className='flex place-content-center w-1/2 h-full py-6'>
          <img src={product.img} alt="" className='h-96 object-contain rounded-lg'  />
        </div>
        <div className='flex flex-col align-middle w-1/2 h-full py-6 px-4 space-y-5'>
          <p className='text-sm font-abeezee font-bold'>{product.category}</p>
          <p className='text-5xl font-philosopher font-semibold'>{product.name}</p>
          <p className='text-md font-abeezee'>{product.desc}</p>
          <p className='text-3xl font-abeezee font-semibold'>${product.prices}</p>
          <button className='w-full btn-navbar p-2' onClick={handleClick}> Add to Cart</button>
        </div>
      </div>      
    </div>

  )
}

export default ProductDetail