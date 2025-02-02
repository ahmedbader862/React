import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../Components/ProductCard/ProductCard";
import Loading from "../Components/Loading";
import Welcome from "../Components/Navbar/Welcome/Welcome";
import SearchBar from "../Components/SearchBar/SearchBar"; // Import SearchBar
import AOS from "aos";
import "aos/dist/aos.css";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [page, setPage] = useState(1);
  const totalPages = 2; // Only 2 pages

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  useEffect(() => {
    async function getProducts() {
      try {
        const options = {
          url: "https://ecommerce.routemisr.com/api/v1/products",
          method: "GET",
        };
        const { data } = await axios.request(options);
        setProducts(data.data);
        setFilteredProducts(data.data); // Initialize with all products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    getProducts();
  }, []);

  // Search functionality
  const handleSearch = (query) => {
    if (!query.trim()) {
      setFilteredProducts(products); // Reset if search is empty
    } else {
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
    setPage(1); // Reset to first page after search
  };

  // Split filtered products into 2 pages
  const productsPerPage = Math.ceil(filteredProducts.length / 2);
  const startIndex = (page - 1) * productsPerPage;
  const displayedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

  return (
    <>
      <div className="container w-full flex flex-col justify-center items-center pb-[240px] pt-[50px] pr-[35px] pl-[35px]">
        <Welcome />
        <SearchBar onSearch={handleSearch} /> {/* Add Search Bar */}
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

        {/* Styled Pagination */}
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
    </>
  );
}
