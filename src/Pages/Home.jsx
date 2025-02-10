import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../Components/ProductCard/ProductCard";
import Loading from "../Components/Loading";
import Welcome from "../Components/Navbar/Welcome/Welcome";
import SearchBar from "../Components/SearchBar/SearchBar";
import AOS from "aos";
import "aos/dist/aos.css";
import { useSelector } from "react-redux";
import NewProducts from "../Components/NewProducts/NewProducts";
import '../index.css';

export default function Home() {
  const curentLange = useSelector((state) => state.lange.lange);
  const text = useSelector((state) => state.lange[curentLange]);

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [searche, setSearche] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState({ min: null, max: Infinity });
  const totalPages = 2;

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const curentPageP = () => {
    setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
  };

  const curentPageN = () => {
    setPage((prevPage) => (prevPage < totalPages ? prevPage + 1 : totalPages));
  };

  const search = (e) => {
    setSearche(e.target.value);
  };

  useEffect(() => {
    async function getProducts() {
      try {
        const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
        setProducts(data.data);
        setFilteredProducts(data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    getProducts();
  }, []);

  useEffect(() => {
    let filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searche.toLowerCase())
    );

    if (selectedCategory) {
      filtered = filtered.filter((product) => product.category?.name === selectedCategory);
    }

    if (priceRange.min !== null) {
      filtered = filtered.filter((product) => product.price >= priceRange.min);
    }

    if (priceRange.max !== Infinity) {
      filtered = filtered.filter((product) => product.price <= priceRange.max);
    }

    setFilteredProducts(filtered);
  }, [searche, selectedCategory, priceRange, products]);

  const productsPerPage = Math.ceil(filteredProducts.length / 2);
  const startIndex = (page - 1) * productsPerPage;
  const displayedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

  return (
    <>
      <div className="container mx-auto w-full flex flex-col justify-center items-center">
        <Welcome />
        <NewProducts />
        <SearchBar onSearch={search} />

        <div className="my-4">
          <label htmlFor="category" className="mr-2">{text.FilterbyCategory}</label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">{text.AllCategories}</option>
            {[...new Set(products.map((product) => product.category?.name))].map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="my-4 flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <label htmlFor="minPrice" className="whitespace-nowrap">{text.MinPrice}:</label>
            <input
              id="minPrice"
              type="number"
              value={priceRange.min === null ? "" : priceRange.min}
              onChange={(e) =>
                setPriceRange({
                  ...priceRange,
                  min: e.target.value === "" ? null : Number(e.target.value),
                })
              }
              className="p-2 border rounded w-full sm:w-32"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <label htmlFor="maxPrice" className="whitespace-nowrap">{text.MaxPrice}:</label>
            <input
              id="maxPrice"
              type="number"
              value={priceRange.max === Infinity ? "" : priceRange.max}
              onChange={(e) =>
                setPriceRange({
                  ...priceRange,
                  max: e.target.value === "" ? Infinity : Number(e.target.value),
                })
              }
              className="p-2 border rounded w-full sm:w-32"
            />
          </div>
        </div>


        <div className="products mx-10">
          {displayedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {displayedProducts.map((product) => (
                <ProductCard key={product.id} productInfo={product} />
              ))}
            </div>
          ) : (
            <Loading />
          )}
        </div>

        <nav id="pagination" aria-label="Page navigation example">
  <ul className="pagination flex gap-2 mt-10 justify-center">
   
    <li className="page-item">
      <button 
        onClick={curentPageP} 
        disabled={page === 1} 
        className={`page-link px-4 py-2 rounded-md border transition 
        ${page === 1 ? "cursor-not-allowed bg-gray-800 text-gray-500 border-gray-700" 
        : "cursor-pointer bg-black text-white border-white hover:bg-gray-900 hover:border-gray-500"}`}>
        {text.previous}
      </button>
    </li>

            <li className="page-item">
              <button
                onClick={curentPageP}
                disabled={page === 1}
                className={`page-link px-4 py-2 rounded-md border transition 
        ${page === 1 ? "cursor-not-allowed bg-gray-800 text-gray-500 border-gray-700"
                    : "cursor-pointer bg-black text-white border-white hover:bg-gray-900 hover:border-gray-500"}`}>
                Previous
              </button>
            </li>


    
    <li className="page-item">
      <button 
        onClick={curentPageN} 
        disabled={page === totalPages} 
        className={`page-link px-4 py-2 rounded-md border transition 
        ${page === totalPages ? "cursor-not-allowed bg-gray-800 text-gray-500 border-gray-700" 
        : "cursor-pointer bg-black text-white border-white hover:bg-gray-900 hover:border-gray-500"}`}>
        {text.next}
      </button>
    </li>
  </ul>
</nav>

      </div>
    </>
  );
}
