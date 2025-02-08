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
import { Helmet } from "react-helmet";

export default function Home() {

  const curentLange = useSelector((state) => state.lange.lange);  

  const  text = useSelector((state) => state.lange[curentLange]);  

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState({ min: null, max: Infinity });
  const totalPages = 2;

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  useEffect(() => {
    async function getProducts() {
      try {
        const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
        setProducts(data.data);
        setFilteredProducts(data.data);
      } catch (error) {
        console.error( error);
      }
    }
    getProducts();
  }, []);

  const categories = [...new Set(products.map((product) => product.category?.name))];

  // search
  const handleSearch = (e) => {
    if (!e) {
      setProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(e.toLowerCase())
      );
      setProducts(filtered);
    }
  };

  // filter
  useEffect(() => {
    let filtered = products;

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
  }, [selectedCategory, priceRange, products]);

  // pagination
  const productsPerPage = Math.ceil(filteredProducts.length / 2);
  const startIndex = (page - 1) * productsPerPage;
  const displayedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

  return (
    
    <>
   
   <Helmet>
        <title>Home</title>
    </Helmet>
    
      <div className="container mx-auto w-full flex flex-col justify-center items-center  ">
        <Welcome />
        <NewProducts/>
    <SearchBar onSearch={handleSearch} /> 
    {/* categories */}
      <div className="my-4">
        <label htmlFor="category" className="mr-2">{text.FilterbyCategory}</label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">{text.AllCategories}</option>
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div className="my-4">
        <label htmlFor="minPrice" className="mr-2">{text.MinPrice}:</label>
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
          className="p-2 border rounded mr-4"
        />
        <label htmlFor="maxPrice" className="mr-2">{text.MaxPrice}:</label>
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
          className="p-2 border rounded"
        />
      </div>

      <div className="products mx-10">
        {displayedProducts.length > 0 ? (
          <div className="grid grid-cols-12 gap-4">
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} productInfo={product} />
            ))}
          </div>
        ) : (
          <Loading />
        )}
      </div>

        
        <div className="flex items-center justify-center mt-10">
          <div className="pagination text-center">
            <button
              className="btn btn-warning mx-2"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              {text.previous}
            </button>
            <span className="mx-3">{text.page} {page} {text.of} {totalPages}</span>
            <button
              className="btn btn-warning mx-2"
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
            >
              {text.next}
            </button>
        </div>
      </div>
  </div>
    </>
  );
}

