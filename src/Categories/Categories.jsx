import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import { Helmet } from "react-helmet";
import Loading from "../Components/Loading";


export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
        setCategories(response.data.data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (isLoading) return <Loading />;
  if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

  
  const handleCategoryClick = (id, name) => {
    navigate(`/categories/${id}/${name}`);
  };

  return (
    <>
      <Helmet>
        <title>Categories</title>
      </Helmet>

      <div className="container mx-auto my-5 px-4">
        <h1 className="mt-10 text-center text-3xl font-bold text-gray-800">All Categories</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
          {categories.map((cat) => (
            <div
              onClick={() => handleCategoryClick(cat?._id, cat?.name)}
              key={cat._id}
              className="cursor-pointer bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img className="w-full h-48 object-cover" src={cat?.image} alt={cat?.name} />
              <div className="p-4">
                <p className="text-center text-xl font-semibold text-gray-700">{cat?.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
