import React from 'react'
import { getProductType, productType } from '../utils/custom'
import ProductCard from './ProductCard'

interface Iproducts {
  products: getProductType
}

function FullProductList({ products }: Iproducts) {
  return (
    <div className="max-w-4xl mx-auto my-10">
        <div className='flex justify-center space-x-7 m-4'>
            <a href="" className='text-md lg:text-2xl font-abeezee border-b hover:border-primary-blue'>ALL ITEM</a>
            {/* <a href="" className='text-sm lg:text-xl font-abeezee active:text-2xl'>ALBUM</a>
            <a href="" className='text-sm lg:text-xl font-abeezee active:text-2xl'>CLOTHES</a>
            <a href="" className='text-sm lg:text-xl font-abeezee active:text-2xl'>ACCESORIES</a> */}
        </div>

        <div className='flex flex-wrap justify-center'>
            {products ? products.data.map( (product) => {
                return <ProductCard key={product._id} product={product} />
            }) : []}
        </div>
    </div>
  )
}

export default FullProductList