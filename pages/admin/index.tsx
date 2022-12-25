import axios from 'axios';
import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react';
import AdminNavbar from '../../components/AdminNavbar';
import Footer from '../../components/Footer';
import { orderType } from '../../utils/custom';

interface Iorder {
  orders: Array<orderType>
}

const Index: NextPage<Iorder> = ({ orders }: Iorder) => {
  const [orderlist, setOrderlist] = useState(orders);
  const status = ["Processed", "On the way", "Delivery"];

  const handleStatus = async (id: any) => {
    const item = orderlist.filter((order) => order._id === id)[0];
    const currentStatus = item.status;

    try {
      const res = await axios.put(`${process.env.HOST}/api/orders/${id}`, {
        status: currentStatus + 1,
      });
      setOrderlist([
        res.data,
        ...orderlist.filter((order) => order._id !== id),
      ]);
    } catch (err) {
      console.log(err);
    }
  };
  
  return (
    <div>
      <Head>
        <title>NewMerch - Admin</title>
        <meta name="description" content="NewJeans Merchandise Shop" />
        <link rel="icon" href="/favicon.ico" />
      </Head> 
      <AdminNavbar />
      <div className='w-full max-w-4xl min-h-screen m-8 font-inter'>
          <h1 className='texl-xl font-bold'>Manage Orders</h1>
          <table className='w-full my-5 border-collapse border border-neutal-300'>
            <tbody>
              <tr>
                <th className='border-collapse border border-neutal-300'>Id</th>
                <th className='border-collapse border border-neutal-300'>Customer</th>
                <th className='border-collapse border border-neutal-300'>Total</th>
                <th className='border-collapse border border-neutal-300'>Payment</th>
                <th className='border-collapse border border-neutal-300'>Status</th>
                <th className='border-collapse border border-neutal-300'>Action</th>
              </tr>
            </tbody>
            {orderlist.map((order) => (
              <tbody key={order._id}>
                <tr>
                  <td className='border-collapse border border-neutal-300'>{order._id}...</td>
                  <td className='border-collapse border border-neutal-300'>{order.customer}</td>
                  <td className='border-collapse border border-neutal-300'>${order.total}</td>
                  <td className='border-collapse border border-neutal-300'>
                    {order.method === 0 ? <span>cash</span> : <span>paid</span>}
                  </td>
                  <td>{status[order.status]}</td>
                  <td className='border-collapse border border-neutal-300'>
                    <button onClick={() => handleStatus(order._id)}>
                      Next Stage
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

export default Index

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

  const orderRes = await axios.get(`${process.env.HOST}/api/orders`);

  return {
    props: {
      orders: orderRes.data,
    },
  };
};

