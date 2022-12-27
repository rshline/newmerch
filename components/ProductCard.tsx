import React, { useState } from 'react'
import Link from 'next/link'
import { productType } from '../utils/custom'

interface Iproducts {
    product: productType
  }  

function ProductCard({ product }: Iproducts) {

  return (
    <div className='w-1/3 md:w-1/5 border border-solid border-gray-700 mx-2 my-4 font-inter hover:shadow-lg'>
        <div className='bg-primary-yellow h-3 border-b border-solid border-gray-700'></div>
        <div className='justify-center align-middle'>
            <img 
                className='h-full object-fill object-center'
                src={product.img}
            />
        </div>
        <div className='flex flex-col md:flex-row justify-between p-2 border-t border-solid border-gray-700 space-y-2 md:space-x-2'>
            <div className='col-span-2'>
                <Link href={`/product/${product._id}`}>
                    <p className='hover:font-bold'>{product.name}</p>
                </Link>
                
            </div>
            <div className='col-span-1'>
                <p className='font-bold'>${product.prices}</p>
            </div>
        </div>
    </div>
  )
}

export default ProductCard