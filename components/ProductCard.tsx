import React from 'react'
import Link from 'next/link'
import { productType } from '../utils/custom'

interface Iproducts {
    product: productType
  }  

function ProductCard({ product }: Iproducts) {
  return (
    <div className='w-60 border border-solid border-gray-700 mx-6 my-4 font-inter'>
        <div className='bg-primary-yellow h-3 border-b border-solid border-gray-700'></div>
        <div className='h-64 w-58 max-h-64 justify-center align-middle'>
            <img 
                className='h-full object-fill object-center'
                src={product.img}
            />
        </div>
        <div className='flex justify-between p-2 border-t border-solid border-gray-700'>
            <div className='col-span-2'>
                <Link href={`/product/${product._id}`}>
                    <p>{product.name}</p>
                </Link>
                
            </div>
            <div className='col-span-1'>
                <p>{product.prices}</p>
            </div>
        </div>
    </div>
  )
}

export default ProductCard