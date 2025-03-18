import { useEffect, useState } from "react";
import "./Newcard.css";

const ProductDisplayPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  return (
    <div className="product-page">
      <h1 className="text-2xl text-center font-semibold my-5">New Products</h1>
      {products.length === 0 ? (
        <p>No products available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-10">
          {products.map((product, index) => (
            <div key={index} className="product-card shadow-lg p-4 rounded-2xl m-4 bg-white ">
              <img className="product-image" src={product.image} alt={product.name} />
              <h3 className="text-lg font-medium mt-2">{product.name}</h3>
              <p className="text-gray-600">{product.category}</p>
              <p className="text-lg font-bold">{product.price} L.E</p>
              <div className="new">
                <label className="bg-black text-white px-3 py-1 rounded-2xl text-sm">New</label>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductDisplayPage;
