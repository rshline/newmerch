import axios from 'axios'
import type { NextPage } from 'next'
import Head from 'next/head'
import Banner from '../components/Banner'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import NewArrival from '../components/NewArrival'
import ProductList from '../components/ProductList'
import { getProductType, productType } from '../utils/custom'


interface Iproducts {
  productList: getProductType
}

const Home: NextPage<Iproducts> = ( { productList }: Iproducts ) => {
  return (
    <div>
      <Head>
        <title>NewMerch</title>
        <meta name="description" content="NewJeans Merchandise Shop" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Banner />
      <ProductList products={productList} />
      <NewArrival />
      <Footer />   
    </div>
  )
}

export default Home

export const getServerSideProps = async () => {
  const res = await axios.get(`${process.env.HOST}/api/products`)
  const products: Iproducts = res.data

  return {
    props: {
      productList: products
    } 
  }
}