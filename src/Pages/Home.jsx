import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../Components/ProductCard/ProductCard";
import Loading from "../Components/Loading";
import Welcome from "../Components/Navbar/Welcome/Welcome";
import SearchBar from "../Components/SearchBar/SearchBar";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Home() {
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
        console.error("Error fetching products:", error);
      }
    }
    getProducts();
  }, []);

  const categories = [...new Set(products.map((product) => product.category?.name))];

  const handleSearch = (query) => {
    if (!query.trim()) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
    setPage(1);
  };

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
    setPage(1);
  }, [selectedCategory, priceRange, products]);

  const productsPerPage = Math.ceil(filteredProducts.length / 2);
  const startIndex = (page - 1) * productsPerPage;
  const displayedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

  return (
    <div className="container w-full flex flex-col justify-center items-center pb-[240px] pt-[50px] pr-[35px] pl-[35px]">
      <Welcome />
      <SearchBar onSearch={handleSearch} />

      <div className="my-4">
        <label htmlFor="category" className="mr-2">Filter by Category:</label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div className="my-4">
        <label htmlFor="minPrice" className="mr-2">Min Price:</label>
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
        <label htmlFor="maxPrice" className="mr-2">Max Price:</label>
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

      <div className="products">
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

      <div className="d-flex align-items-center justify-center mt-10">
        <div className="pagination text-center">
          <button
            className="btn btn-warning mx-2"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            Previous
          </button>
          <span className="mx-3">Page {page} of {totalPages}</span>
          <button
            className="btn btn-warning mx-2"
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
