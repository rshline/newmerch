import axios from 'axios'
import type { NextPage } from 'next'
import Head from 'next/head'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { getProductType } from '../../utils/custom'
import FullProductList from '../../components/FullProductList'


interface Iproducts {
  productList: getProductType
}

const Products: NextPage<Iproducts> = ( { productList }: Iproducts ) => {
  return (
    <div>
      <Head>
        <title>NewMerch</title>
        <meta name="description" content="NewJeans Merchandise Shop" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <FullProductList products={productList} />
      <Footer />   
    </div>
  )
}

export default Products

export const getServerSideProps = async () => {
  const res = await axios.get(`${process.env.HOST}/api/products`, { headers: { "Accept-Encoding": "gzip,deflate,compress" } })
  const products: Iproducts = res.data

  return {
    props: {
      productList: products
    } 
  }
}