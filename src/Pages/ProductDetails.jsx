import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../Components/Loading';
import ReactImageGallery from 'react-image-gallery';
import { addToCart } from '../Components/Cart/CartService';
import { auth } from '../Contexts/AuthContext';
import { useSelector } from 'react-redux';


export default function ProductDetails() {

    const curentLange = useSelector((state) => state.lange.lange);  
    const text = useSelector((state) => state.lange[curentLange]);  

    const [details , setDetails] = useState(null)
    let {id} = useParams();
    let {userToken} = useContext(auth)

    async function getProductDetails(){
        let {data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
        setDetails(data.data);
    }

    useEffect (()=> {
        getProductDetails()
    },[]);

    const imageItems = details?.images.map((imageURL) => {
        return {
            original: imageURL,
            thumbnail: imageURL,
        }
    })

  return (
    <>
    {details === null ? (<Loading />
    ) : (
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 items-center mt-10 pb-[240px] pt-[10px] px-6">
        <div className="md:col-span-5 lg:col-span-4 mx-auto md:mx-0 w-full">
            <ReactImageGallery
                items={imageItems}
                showNav={false}
                showFullscreenButton={false}
                showPlayButton={false}
            />
        </div>
        <div className="md:col-span-7 lg:col-span-8 mt-6 md:mt-0">
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 leading-tight">
                {details.title}
            </h2>
            <h3 className="text-primary font-medium text-lg md:text-xl mt-2">
                {details.category.name}
            </h3>
            <p className="mt-3 text-gray-600 text-base md:text-lg">
                {details.description}
            </p>
            <div className="flex justify-between items-center mt-4">
                <span className="text-lg md:text-xl font-semibold text-black">
                    {details.price} L.E
                </span>
                <span className="flex items-center">
                    <i className="fa-solid fa-star text-lg text-yellow-400"></i>
                    <span className="ml-2 text-gray-600">{details.ratingsAverage}</span>
                </span>
            </div>
    
            <button
                onClick={() => addToCart(id, userToken)}
                type="button"
                className="mt-5 w-full text-white bg-black hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center"
            >
                {text.add}
            </button>
        </div>
    </div>
    
    )}
    </>
  );
}
