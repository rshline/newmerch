import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

function Banner() {
  return (
    <div className='-z-30'>
        <Carousel showThumbs={false} showStatus={false} transitionTime={10} infiniteLoop={true} autoPlay={true} interval={50000}>
            <div>
                <img src="/banner_1.jpeg" className='object-cover h-52 md:h-72 lg:h-96' />
            </div>
            <div>
                <img src="/banner_2.jpeg" className='object-cover h-52 md:h-72 lg:h-96' />
            </div>
            <div>
                <img src="/banner_3.jpeg" className='object-cover h-52 md:h-72 lg:h-96' />
            </div>
        </Carousel>  
    </div>
  )
}

export default Banner