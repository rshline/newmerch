import React from 'react'
import { ShoppingCartIcon, HeartIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { CartState } from '../utils/custom';
import { useSession, signIn, signOut } from 'next-auth/react';

interface IRootState {
  cart: CartState;
} 

function Navbar() {

  const {data: session} = useSession()
  const qty = useSelector((state: IRootState) => state.cart.qty)
  return (
    <div className='flex w-screen max-w-full justify-between border border-neutral-300 bg-gradient-to-b from-white to-primary-violet'>
      
      {/* Left - cart - wishlist - search */}
      <div className='flex px-4 py-1 w-2/5 space-x-2'>
        <Link href={`/admin`}>
          <button className='px-2 py-1 m-1 font-inter btn-navbar text-sm'>
              Order
          </button>
        </Link>
        <Link href={`admin/product`}>
          <button className='px-2 py-1 m-1 font-inter btn-navbar text-sm'>
              Product
          </button>          
        </Link>

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
        <button 
          onClick={!session ? () => signIn() : () => signOut()}
          className='px-2 py-1 m-1 font-inter btn-navbar text-sm'>{!session ? "Log in" : "Log out"}</button>
      </div>
    </div>
  )
}

export default Navbar