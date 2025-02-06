import { useEffect, useState } from "react";
import Admincard from "../Components/Admincard/Admincard";

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    image: "",
    price: "",
  });
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem("products", JSON.stringify(products));
    }
  }, [products]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files && files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData({ ...formData, image: e.target.result });
      };
      reader.readAsDataURL(files[0]);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updatedProducts = [...products];
      updatedProducts[editIndex] = formData;
      setProducts(updatedProducts);
      setEditIndex(null);
    } else {
      setProducts([...products, formData]);
    }
    setFormData({ name: "", category: "", image: "", price: "" });
  };

  const handleEdit = (index) => {
    setFormData(products[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedProducts = products.filter((product, currentIndex) => currentIndex !== index);
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  return (
    <div className="flex items-center justify-center flex-col">
      <h1 className="text-center mt-5 font-bold text-4xl">Hello, Admin</h1>
      <h3 className="my-8">Product Manager</h3>
      <form className="flex flex-col w-200" onSubmit={handleSubmit}>
        <label>Product Name</label>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleInputChange}
          required
          className="border-1 p-1 my-2"
        />
        <label>Category</label>
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleInputChange}
          required
          className="border-1 p-1 my-2"
        />
        <label>Image</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleInputChange}
          required
          className="border-1 p-1 my-2"
        />
        <label>Price</label>
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleInputChange}
          required
          className="border-1 p-1 my-2"
        />
        <div className="btn-holder text-center my-3">
          <button
            type="submit"
            className="text-black pr-37 pl-37 hover:text-white border border-black hover:bg-black transition-[0.2] focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            {editIndex !== null ? "Update Product" : "Add Product"}
          </button>
        </div>
      </form>

      <div className="grid grid-cols-3 gap-4">
        {products.map((product, index) => (
          <Admincard
            key={index}
            product={product}
            onEdit={handleEdit}
            onDelete={handleDelete}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default Admin;
