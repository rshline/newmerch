import axios from 'axios'
import type { NextPage } from 'next'
import Head from 'next/head'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import ProductDetail from '../../components/ProductDetail'
import { getProductType } from '../../utils/custom'

interface Iproducts {
  product: getProductType
}

const Product: NextPage<Iproducts> = ({ product }: Iproducts) => {
  return (
    <div>
      <Head>
        <title>NewMerch</title>
        <meta name="description" content="NewJeans Merchandise Shop" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <ProductDetail product={product} />
      <Footer />   
    </div>
  )
}

export default Product

export const getServerSideProps = async ({params}) => {
  const res = await axios.get(`http://localhost:3000/api/products/${params.id}`)
  const productData: Iproducts = res.data

  return {
    props: {
      product: productData
    } 
  }
}
