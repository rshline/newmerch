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

  const [sorted, setSorted] = useState(_.orderBy(productList, item => item.name, ['asc']));
  const [filterCategory, setFilterCategory] = useState('');

  const categories =  [...new Set(productList.map(o => o.category))];

  const sortProduct = (selected: string) => {
    switch (selected) {
      case 'lower_price':
        setSorted(_.orderBy(productList, item => item.prices, ['asc']))
        break
      case 'higher_price':
        setSorted(_.orderBy(productList, item => item.prices, ['desc']))
        break
      default:
        setSorted(_.orderBy(productList, item => item.name, ['asc']))
        break
    }
    
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
      <div className='my-4 lg:my-8 lg:mx-10 bg-white'>
        <div className='grid grid-flow-row auto-rows-max lg:grid-cols-5 gap-4 w-full'>
          {/* Filter */}
          <div className='flex flex-col mx-4 lg:mx-0 lg:px-3 lg:border-r lg:border-neutral-300'>
            <h1 className='text-3xl font-philosopher'>Filter</h1>
            <h3 className='lg:mt-6 text-lg font-abeezee'>Sort</h3>
            <select onChange={(e) => sortProduct(e.target.value)}>
              <option defaultValue='alphabet'> A-Z </option>
              <option value='lower_price'>Lower Price</option>
              <option value='higher_price'>Higher Price</option>
            </select>
            <h3 className='lg:mt-6 text-lg font-abeezee'>Categories</h3>
            <div className='flex lg:flex-col space-x-2 lg:space-x-0 text-md font-abeezee'>
              <div className='flex space-x-1'>
                <input type="radio" value="All" onClick={() => setFilterCategory('')} name="category" id='all' defaultChecked={true} />
                <label htmlFor="all">All</label>   
              </div>
              {categories.map((cat, i) => (
                <div className='flex  space-x-1' key={i}>
                  <input type="radio" value={cat} onClick={() => setFilterCategory(cat)} name="category" id={cat} />
                  <label htmlFor={cat}>{cat}</label>            
                </div>
              ))}
            </div>

          </div>

          {/* Product */}
          <div className='lg:col-span-4 flex flex-col lg:px-3'>
            <h1 className='mx-4 lg:mx-0 text-3xl font-philosopher'>Products</h1>
            <FullProductList products={filtered} />  
          </div>
          
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