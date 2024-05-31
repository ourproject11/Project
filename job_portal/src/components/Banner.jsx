import React from 'react'

const Banner = () => {
  return (
    <div className='mx-w-screen-2xl container mx-auto xl:px-24 px-4 md:py-20 py-14 '>
       <h1 className='text-5xl font-bold text-primary mb-3'>Find your<span className='text-purple'> new job</span> today</h1>
       <p className='text-lg text-black/70 mb-8'>Thousands of jobs in all sectors are waiting for you</p>
       <form>
        <div>
            <div>
                <input type = "text" name = "title" className='block flex-1 border-0 bg-transparent py-1.5 pl-8 text-gray-900 placeholder: text-gray-400 focus:right-0 sm:leading-6'
            </div>
        </div>
       </form>
    </div>
  )
}

export default Banner
