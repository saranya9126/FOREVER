import React from 'react'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import NewsLetterBox from '../components/NewsLetterBox'

const About = () => {
  return (
    <div className=''>
      <div className='border-b pt-8 text-2xl text-center'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>
      <div className='my-10 flex flex-col gap-14 md:flex-row'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste maiores quia culpa quasi et aut suscipit id iure nostrum quos.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, ea!
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam dolores, eum laborum accusantium temporibus iste recusandae! Commodi minima ullam blanditiis.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem odio consectetur id ex rerum hic, explicabo
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus,
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, corrupti? aliquam! mollitia a odit ea?Lorem ipsum dolor sit amet.
          </p>
          <b className='text-gray-800'>Our Mission</b>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, quidem.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui praesentium cumque cupiditate vitae temporibus ut eos ea tempore facere cum.
          </p>
        </div>
         </div>
        <div className='text-2xl py-4'>
          <Title text1={'WHY'} text2={'CHOOSE US'} />

        </div>
       
        <div className='flex flex-col md:flex-row text-sm mb-20'>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Quality Assurance:</b>
            <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, voluptatum dolor! At harum quo eaque aperiam laborum, voluptatibus earum saepe.</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Convenience</b>
            <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, voluptatum dolor! At harum quo eaque aperiam laborum, voluptatibus earum saepe.</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Exceptional Customer Service:</b>
            <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, voluptatum dolor! At harum quo eaque aperiam laborum, voluptatibus earum saepe.</p>
          </div>
</div>
<NewsLetterBox/>
      </div>
    
  )
}

export default About