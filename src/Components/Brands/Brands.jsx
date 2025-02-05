import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
import { Helmet } from "react-helmet";
import Loading from "../Loading";


export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
        setBrands(response.data.data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBrands();
  }, []);

  if (isLoading) return <Loading />;
  if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

  const handleBrandClick = (id, name) => {
    navigate(`/brands/${id}/${name}`);
  };

  return (
    <>
      <Helmet>
        <title>Brands</title>
      </Helmet>

      <div className="container mx-auto my-5 px-4">
        <h1 className="mt-10 text-center text-3xl font-bold text-gray-800">All Brands</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
          {brands.map((brand) => (
            <div
              onClick={() => handleBrandClick(brand?._id, brand?.name)}
              key={brand._id}
              className="cursor-pointer bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img className="w-full h-48 object-cover" src={brand?.image} alt={brand?.name} />
              <div className="p-4">
                <p className="text-center text-xl font-semibold text-gray-700">{brand?.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
