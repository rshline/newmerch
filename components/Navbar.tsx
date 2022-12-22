import React from 'react'
import { ShoppingCartIcon, HeartIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { CartState } from '../utils/custom';

interface IRootState {
  cart: CartState;
} 

function Navbar() {

  const qty = useSelector((state: IRootState) => state.cart.qty)

  return (
    <div className='flex w-screen max-w-full justify-between border border-neutral-300 bg-gradient-to-b from-white to-primary-violet'>
      
      {/* Left - cart - wishlist - search */}
      <div className='flex px-4 py-1 w-2/5 space-x-2'>
        <Link href={`/cart`}>
          <div className='relative btn-navbar btn-navbar-logo p-1 m-1' >
            <ShoppingCartIcon className='h-5' />
            <div className='absolute top-1 right-1 text-[6px] rounded-full h-2 w-2 bg-white text-center'>{qty}</div>
          </div>          
        </Link>

        <div className='btn-navbar btn-navbar-logo p-1 m-1'>
          <HeartIcon className='h-5' />
        </div>
        <div className='hidden lg:flex m-1 rounded-full btn-navbar h-7'>
          <MagnifyingGlassIcon className='m-1 h-5 rounded-l-full' />
          <input type="text" name='search'  className='rounded-r-full bg-transparent border-transparent focus:border-transparent focus:ring-0 focus:drop-shadow-lg'/>
        </div>
      </div>

      {/* Logo */}
      <div className='flex w-1/5 justify-between outline-neural-300 items-center'>
        <div className='navbar-skew-line'></div>
        <Link href={`/`}>
          <img src='/newmerch-logo.png' className='py-1 h-8 lg:h-12' />
        </Link>
        <div className='navbar-skew-line'></div>
      </div>

      {/* Right - log in */}
      <div className='flex px-4 py-1 w-2/5 justify-end'>
        <button className='px-2 py-1 m-1 font-inter btn-navbar text-sm'>Log in</button>
      </div>
    </div>
  )
}

export default Navbar