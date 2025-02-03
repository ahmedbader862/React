import React from 'react'

export default function BrandCard({brandInfo}) {
    const {image,name} = brandInfo
  return (
    <>
    <div className='col-span-4 shadow-lg hover:shadow-primary rounded-md overflow-hidden mt-10' >
            <img 
            src={image}
            className='w-full h-96 object-cover'
            />
            <h3 className='text-3xl py-8 text-center'>{name}</h3>
        </div>
    </>
  )
}
