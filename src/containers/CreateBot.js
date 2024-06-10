import React from 'react'
import UploadComponent from './UploadComponent'
import HomePageBackground from '../assets/images/HomePageBackground2.svg'
import HomepageBgShape from '../assets/images/Homepage_bg_shape.svg'

export default function CreateQuiz () {
 
  const bgImage = {
    backgroundImage: `url(${HomePageBackground})`,
    backgroundSize: 'cover',
    backgroundPosition: 'bottom',
    backgroundRepeat: 'no-repeat'
  }
  const bgShape = {
    position: 'absolute',
    right: '0',
    top: '0'
    // zIndex: '10'
  }

  
  return (
        <div id='home' className="min-h-screen h-full relative pt-24 md:pt-32 pb-24 rounded-bl-[20px] rounded-br-[20px] overflow-hidden bg-gradient-to-tr from-[#A770EF] via-[#CF8BF3] to-[#FDB99B]" style={bgImage}>
            <img src={HomepageBgShape} alt="" className='w-3/4 md:w-1/2' style={bgShape} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 md:gap-y-12 mx-auto w-11/12 h-full">
                    <div className="h-full flex justify-center items-center w-full mx-auto order-1 md:order-2 ">
                        <UploadComponent />
                        
                    </div>
                </div>
                {/* <CreateQuizButton /> */}
        </div>
  )
}
