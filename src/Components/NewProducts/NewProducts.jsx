import { useEffect, useState } from "react";
import './Newcard.css'

const ProductDisplayPage = () => {
  const [products, setProducts] = useState([]);

  // Load products from localStorage on component mount
  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  return (
    <div className="product-page">
      <h1 className="text-2xl font-semibold my-5">New Products</h1>
      {products.length === 0 ? (
        <p>No products available</p>
      ) : (
        <div className="product-grid shadow-2xl p-4 rounded-2xl">
          {products.map((product, index) => (
            <div key={index} className="product-card ">
              <img src={product.image} alt={product.name} />
              <h3 className="text-lg font-medium">{product.name}</h3>
              <p className="text-lg"> {product.category}</p>
              <p className="text-lg">{product.price}L.E</p>
              <div className="new">
                <label className="bg-black text-white p-2 rounded-2xl">New</label>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductDisplayPage;
