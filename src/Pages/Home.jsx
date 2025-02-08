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
    axios.get("https://ecommerce.routemisr.com/api/v1/products")
      .then(({ data }) => {
        setProducts(data.data);
        setFilteredProducts(data.data);
      })
      .catch((error) => console.error("Error fetching products:", error));
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
<<<<<<< HEAD
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
=======
        <NewProducts/>
    <SearchBar onSearch={handleSearch} /> 
    {/* categories */}
    <div className="my-4 flex flex-col sm:flex-row items-center gap-2">
  <label htmlFor="category" className="text-sm sm:text-base">
    {text.FilterbyCategory}
  </label>
  <select
    id="category"
    value={selectedCategory}
    onChange={(e) => setSelectedCategory(e.target.value)}
    className="p-2 border rounded w-full sm:w-auto"
  >
    <option value="">{text.AllCategories}</option>
    {categories.map((category) => (
      <option key={category} value={category}>
        {category}
      </option>
    ))}
  </select>
</div>

<div className="my-4 flex flex-col sm:flex-row items-center gap-2">
  <label htmlFor="minPrice" className="text-sm sm:text-base">
    {text.MinPrice}:
  </label>
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
    className="p-2 border rounded w-full sm:w-24"
  />
  <label htmlFor="maxPrice" className="text-sm sm:text-base">
    {text.MaxPrice}:
  </label>
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
    className="p-2 border rounded w-full sm:w-24"
  />
</div>

<div className="products mx-4 sm:mx-10">
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
>>>>>>> 63567b2169edd9a21233ea761f68aa380eebced1
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

        <nav id="pagenation" aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item">
              <button onClick={curentPageP} className={`page-link ${page === 1 && "disabled"}`}>Previous</button>
            </li>
            <li className={`page-item ${page === 1 ? "active" : ""}`}>
              <button onClick={() => setPage(1)} className="page-link">1</button>
            </li>
            <li className={`page-item ${page === 2 ? "active" : ""}`}>
              <button onClick={() => setPage(2)} className="page-link">2</button>
            </li>
            <li className="page-item">
              <button onClick={curentPageN} className={`page-link ${page === totalPages && "disabled"}`}>Next</button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
