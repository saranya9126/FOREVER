import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const Contact = () => {
  return ( <div>
    <div className='pt-10 border-t text-center text-2xl '>
<Title  text1={'CONTACT'} text2={'US'}/></div>
 <div className='my-10 flex flex-col justify-center items-start md:flex-row gap-10 mb-28'>
  <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="" />
  <div className=' flex flex-col justify-center items-start gap-6'>
    <p className='font-semibold text-xl text-gray-600'>Our Store</p>
    <p className='text-gray-500 text-lg'>432233 , willamson stadium<br /> mainstreet,Tamilnadu,India</p>
    <p className='text-gray-500 text-lg'>Tel:  91-(012)-3456789<br />Email:sara@gmail.com</p>
    <p className='font-semibold text-xl text-gray-600'>Careers at Forever</p>
    <p className='text-gray-500 text-lg'>Learn More about our teams and job openings</p>
    <button className='border border-black cursor-pointer px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>EXplore Jobs</button>
  </div>
    
    </div>
      <div>
        <NewsLetterBox/>
      </div>
    </div>
    
   
  )
}

export default Contact