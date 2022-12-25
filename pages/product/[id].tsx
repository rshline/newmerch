import axios from 'axios'
import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import ProductDetail from '../../components/ProductDetail'
import { getProductType, productType } from '../../utils/custom'

interface Iproducts {
  product: productType
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

export const getServerSideProps: GetServerSideProps = async ({params}) => {
  const res = await axios.get(`${process.env.HOST}/api/products/${params?.id}`)
  const productData: Iproducts = res.data

  return {
    props: {
      product: productData
    } 
  }
}
