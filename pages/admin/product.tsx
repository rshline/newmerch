import axios from 'axios';
import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react';
import AdminNavbar from '../../components/AdminNavbar';
import Footer from '../../components/Footer';
import { getProductType } from '../../utils/custom';

interface Iproduct {
  products: getProductType
}

const Product: NextPage<Iproduct> = ({ products }: Iproduct ) => {
  const [productlist, setProductlist] = useState(products.data);
  console.log(productlist)

  const handleDelete = async (id: any) => {
    try {
      const res = await axios.delete(
        "http://localhost:3000/api/products/" + id
      );
      setProductlist(productlist.filter((product) => product._id !== id));
    } catch (err) {
      console.log(err);
    }
  };
  
  return (
    <div>
      <Head>
        <title>NewMerch</title>
        <meta name="description" content="NewJeans Merchandise Shop" />
        <link rel="icon" href="/favicon.ico" />
      </Head> 
      <AdminNavbar />
      <div className='w-full max-w-4xl min-h-screen m-8 font-inter'>
          <h1 className='texl-xl font-bold'>Products</h1>
          <table className='w-full my-5 border-collapse table-border text-center'>
            <tbody>
              <tr>
                <th className='table-border'>Image</th>
                <th className='table-border'>Id</th>
                <th className='table-border'>Title</th>
                <th className='table-border'>Price</th>
                <th className='table-border'>Action</th>
              </tr>
            </tbody>
            {productlist.map((product) => (
              <tbody key={product._id} className="text-sm">
                <tr>
                  <td className='table-border'>
                    <img
                      src={product.img}
                      alt=""
                      className='h-20'
                    />
                  </td>
                  <td className='break-words table-border'>{product._id}...</td>
                  <td className='table-border'>{product.name}</td>
                  <td className='table-border'>${product.prices}</td>
                  <td className='table-border flex flex-col justify-between space-y-5'>
                    <button className='cursor-pointer font-bold'>Edit</button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className='cursor-pointer font-bold text-red-700'
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
      </div>
      <Footer />
    </div>
  )
}

export default Product

export const getServerSideProps = async (ctx: any) => {
  const myCookie = ctx.req?.cookies || "";

  if (myCookie.token !== process.env.TOKEN) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }

  const productRes = await axios.get("http://localhost:3000/api/products");

  return {
    props: {
      products: productRes.data,
    },
  };
};

