import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loading from '../Components/Loading';
import BrandCard from '../Components/BrandCard/BrandCard';


export default function Brands() {
    const [brands, setBrands] = useState(null)
    


    async function getBrands(){
        const options = {
            url:"https://ecommerce.routemisr.com/api/v1/brands",
            method:"GET",
        };

        let {data} = await axios.request(options)
        console.log(data);
        setBrands(data.data)
    }
  
    useEffect(()=>{
        getBrands()
    },[])
  
  
    return (
        <>
    <section className=' container mx-auto mb-5 mt-16'>
        
        <div className='grid grid-cols-12 gap-4 mt-16'>
            {brands ? brands.map((brand)=>(
                <BrandCard brandInfo={brand}/>
           )):( <Loading/>)}

            </div>
    </section>
    </>
  )
}
