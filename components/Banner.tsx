import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

function Banner() {
  return (
    <div>
        <Carousel showArrows={false} showThumbs={false}>
            <div>
                <img src="/banner_1.jpeg" className='object-cover h-96' />
            </div>
            <div>
                <img src="https://pbs.twimg.com/media/FYMylBpXgAA2_ff?format=jpg&name=4096x4096" className='object-cover h-96' />
            </div>
            <div>
                <img src="https://pbs.twimg.com/media/FZEMB83agAAebSa?format=jpg&name=large" className='object-cover h-96' />
            </div>
        </Carousel>  
    </div>
  )
}

export default Banner