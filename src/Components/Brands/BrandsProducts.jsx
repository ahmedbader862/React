import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import Breadcrumb from "./BreadCrumbBrand";
import { Helmet } from "react-helmet";
import Loading from "../Loading";
import { useSelector } from "react-redux";

export default function BrandProducts() {

  const curentLange = useSelector((state) => state.lange.lange);  

  const  text = useSelector((state) => state.lange[curentLange]);  
  const { brandId, brandName } = useParams();  // Get brandId and brandName from URL params
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`);
        setProducts(response.data.data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [brandId]);

  if (isLoading) return <Loading />;
  if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

  return (
    <div className="container mx-auto my-5 px-4">
      <Helmet>
        <title>{brandName}</title>
      </Helmet>
      <Breadcrumb brandId={brandId} brandName={brandName} />

      <h1 className="text-center text-3xl font-bold text-gray-800 mt-4">{text.Productsby} {brandName}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <Link to={`/product/${product._id}`}>
                <img className="w-full h-48 object-cover" src={product.imageCover} alt={product.title} />
                <div className="p-4">
                  <p className="text-center text-lg font-semibold text-gray-700">{product.title}</p>
                  <p className="text-center text-gray-500">
                    {product.priceAfterDiscount ? product.priceAfterDiscount : product.price} L.E
                  </p>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 mt-6">No products found for this brand.</p>
        )}
      </div>
    </div>
  );
}
