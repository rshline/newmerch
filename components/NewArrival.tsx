import React from 'react'
import Marquee from 'react-fast-marquee'

function NewArrival() {
  return (
    <div>
        <Marquee speed={50} className='py-3 font-inter text-primary-violet font-bold text-4xl md:text-6xl lg:text-7xl overflow-y-hidden'> NEW ARRIVAL NEW ARRIVAL </Marquee>

        {/* special product */}
        <div className='flex justify-center bg-gradient-to-r from-primary-violet via-white to-primary-violet'>
          <div className='flex flex-col lg:flex-row p-4 mx-5 my-7 w-full lg:w-3/5 align-middle drop-shadow-lg bg-gradient-to-br rounded-lg from-custom-mint via-custom-blue to-custom-purple'>
            <div className='flex flex-col justify-center font-philosopher space-y-3'>
              <h1 className='text-xl text-center lg:text-left lg:text-7xl text-custom-purple'>SEASON GREETING</h1>
              <button className='px-3 py-1 rounded-full text-white bg-custom-peach hover:bg-opacity-70'>Add to Cart</button>
            </div>
            <div className='flex justify-center'>
              <img src='/sg2023.png' className='h-40 md:h-48 lg:h-54 object-contain' />
            </div>
          </div>
        </div>

        {/* Gallery */}
        <Marquee speed={20} gradient={false} className='h-36 lg:h-64 bg-custom-mint'>
            <img src='https://kpopping.com/documents/02/1/3000/NewJeans-2023-SEASON-S-GREETINGS-Concept-Photo-documents-1(1).jpeg?v=12845' className='h-32 lg:h-60' />
            <img src='https://kpopping.com/documents/6a/1/800/NewJeans-2023-SEASON-S-GREETINGS-Concept-Photo-documents-2(1).jpeg?v=9270a' className='h-32 lg:h-60' />
            <img src='https://kpopping.com/documents/9a/5/800/NewJeans-2023-SEASON-S-GREETINGS-Concept-Photo-documents-4(1).jpeg?v=5cfcf' className='h-32 lg:h-60' />
            <img src='https://kpopping.com/documents/b4/4/800/NewJeans-2023-SEASON-S-GREETINGS-Concept-Photo-documents-3(1).jpeg?v=8399d' className='h-32 lg:h-60' />
            <img src='https://kpopping.com/documents/44/3/800/NewJeans-2023-SEASON-S-GREETINGS-Concept-Photo-documents-5(1).jpeg?v=2c5a4' className='h-32 lg:h-60' />
        </Marquee>
    </div>
  )
}

export default NewArrival