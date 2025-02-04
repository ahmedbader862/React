import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../Components/ProductCard/ProductCard";
import Loading from "../Components/Loading";

export default function Products() {
    const [products,setProducts] = useState(null);

  async function getProducts(){
    const options = {
        url : "https://ecommerce.routemisr.com/api/v1/products",
        method : "GET",
    }
    const {data} = await axios.request(options)
    setProducts(data.data);
    }

    useEffect(()=>{
        getProducts()
    },[])

  return (
    <>
    <div className="container mx-auto px-10">
        
    {products ? (<div className='grid grid-cols-12 gap-4 mt-16'>
            { products.map((product)=>(
            <ProductCard productInfo ={product}/>
        ))} 
    </div>):(
    <Loading/>
    )}
    </div>
    </>
);
}
