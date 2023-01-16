import React from 'react'
import { getProductType, productType } from '../utils/custom'
import ProductCard from './ProductCard'

interface Iproducts {
  products: Array<productType>
}

function FullProductList({ products }: Iproducts) {

  return (
    <div className="lg:my-4">
        <div className='flex flex-wrap justify-evenly lg:justify-between'>
            {products ? products.map( product => {
                return <ProductCard key={product._id} product={product} />
            }) : []}
        </div>
    </div>
  )
}

export default FullProductList