import axios from 'axios'
import type { NextPage } from 'next'
import Head from 'next/head'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { getProductType, productType } from '../../utils/custom'
import FullProductList from '../../components/FullProductList'
import { useState } from 'react'
import _ from 'lodash'

interface Iproducts {
  productList: Array<productType>
}

const Products: NextPage<Iproducts> = ( { productList }: Iproducts ) => {

  const [dropdown, showDropdown] = useState(false);
  const [filterCategory, setFilterCategory] = useState('');
  const sorted = _.orderBy(productList, item => item.name, ['asc']);

  const categories =  [...new Set(productList.map(o => o.category))];

  const handleDropdown = () => {
    showDropdown(!dropdown)
  }

  const HandleFilterProducts = (array: any) => {
    return array.filter(
      (el: any) => el.category.includes(filterCategory) 
    )
  }

  const filtered = HandleFilterProducts(sorted)

  return (
    <div>
      <Head>
        <title>NewMerch - All Products</title>
        <meta name="description" content="NewJeans Merchandise Shop" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className='flex flex-col lg:flex-row mx-4 lg:mx-auto my-4 lg:my-8 w-fit max-w-6xl space-y-3 lg:space-y-0 bg-white'>
        {/* Filter */}
        <div className='flex flex-col lg:px-10 border-r border-neutral-400 md:border-r-0 md:border-white'>
          <h1 className='text-3xl font-philosopher'>Filter</h1>
          <h3 className='lg:mt-6 text-lg font-abeezee'>Categories</h3>
          <div className='flex lg:flex-col space-x-2 lg:space-x-0 text-md font-abeezee'>
            <div className='flex space-x-1'>
              <input type="radio" value="All" onClick={() => setFilterCategory('')} name="category" id='all' defaultChecked={true} />
              <label htmlFor="all">All</label>   
            </div>
            {categories.map((cat, i) => (
              <div className='flex  space-x-1'>
                <input type="radio" value={cat} onClick={() => setFilterCategory(cat)} name="category" id={cat} key={i} />
                <label htmlFor={cat}>{cat}</label>            
              </div>
            ))}
          </div>

        </div>

        {/* Product */}
        <div className='flex flex-col lg:px-10 w-full'>
          <h1 className='text-3xl font-philosopher'>Products</h1>
          <FullProductList products={filtered} />  
        </div>
        
      </div>
      <Footer />   
    </div>
  )
}

export default Products

export const getServerSideProps = async () => {
  const res = await axios.get(`${process.env.HOST}/api/products`, { headers: { "Accept-Encoding": "gzip,deflate,compress" } })
  const products: Iproducts = res.data.data

  return {
    props: {
      productList: products
    } 
  }
}