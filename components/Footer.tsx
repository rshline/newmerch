import Link from 'next/link'
import React from 'react'

function Footer() {
  return (
    <div className='flex flex-col justify-start align-bottom p-4 h-40 bg-primary-blue'>
      <Link href="https://ador.world/">
        <img src="/ador_logo.png" />
      </Link>
      <Link href="https://weverseshop.io/en/shop/GL_USD/artists/82/categories/1134">
        <img src="/wvshop_logo.png" />
      </Link>
    </div>
  )
}

export default Footer