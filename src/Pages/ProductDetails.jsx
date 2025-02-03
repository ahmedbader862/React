import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Loading from '../Components/Loading';
import ReactImageGallery from 'react-image-gallery';

export default function ProductDetails() {
    const [details , setDetails] = useState(null)
    let {id} = useParams();
    console.log(id);

    async function getProductDetails(){
        let {data } =await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
        setDetails(data.data);
    }


    useEffect (()=>{
        getProductDetails()
    },[]);

    const imageItems = details?.images.map((imageURL)=> {
        return{
            original : imageURL,
            thumbnail : imageURL,
        }
    })


  return (
    <>
    {details === null ? (<Loading/>
    ):(<div className='grid items-center grid-cols-12 mt-10 pb-[240px] pt-[10px] pr-[35px] pl-[35px]'>
        <div className='col-span-4'>
            <ReactImageGallery items={imageItems}
            showNav={false}
            showFullscreenButton={false}
            showPlayButton={false}
            />
            
        </div>
        <div className='col-span-8 mt-10'>
            <h2 className='text-3xl font'>{details.title}</h2>
            <h3 className='text-primary font-semibold mt-2'>{details.category.name}</h3>
            <p className='mt-3'>{details.description}</p>
            <div className='flex justify-between items-center'>
                <span className='text-lg mt-4' >{details.price} L.E</span>
                <span>
                <i className="fa-solid fa-star text-lg text-yellow-400"></i>
                {details.ratingsAverage}
                </span>

            </div>
                    <button onClick={()=>addToCart(id,userToken)} type="button" className="mt-5 w-full text-black pr-37 pl-37 hover:text-white border border-black hover:bg-black transition-[0.2] focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">Add</button>
        </div>
    </div>)}
    </>
  )
}
