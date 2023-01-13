import Link from 'next/link'
import React from 'react'
import { getProductType, productType } from '../utils/custom'
import ProductCard from './ProductCard'

interface Iproducts {
  products: getProductType
}

function ProductList({ products }: Iproducts) {
  return (
    <div className="max-w-4xl mx-auto my-10">
        <div className='flex justify-center space-x-7 m-4'>
            <a href="" className='text-md lg:text-2xl font-abeezee font-bold'>Merch</a>
        </div>

        <div className='flex flex-wrap justify-center'>
            {products ? products.data.slice(0,4).map( (product) => {
                return <ProductCard key={product._id} product={product} />
            }) : []}
        </div>
        <div className='flex justify-center pt-4'>
          <Link href={`/product`} className='px-4 py-2 text-white bg-primary-blue hover:bg-primary-blue/80 rounded-full'>
            See more &gt;&gt;  
          </Link>
        </div>

        
    </div>
  )
}

export default ProductList