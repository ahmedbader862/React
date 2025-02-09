import { useEffect, useState } from "react";
import Admincard from "../Components/Admincard/Admincard";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const Admin = () => {
  const curentLange = useSelector((state) => state.lange.lange);
  const text = useSelector((state) => state.lange[curentLange]);
  
  const [products, setProducts] = useState(() => JSON.parse(localStorage.getItem("products")) || []);
  const [formData, setFormData] = useState({ name: "", category: "", image: "", price: "" });
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => localStorage.setItem("products", JSON.stringify(products)), [products]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files?.[0]) {
      const reader = new FileReader();
      reader.onload = (e) => setFormData((prev) => ({ ...prev, image: e.target.result }));
      reader.readAsDataURL(files[0]);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProducts((prev) => (editIndex !== null ? prev.map((p, i) => (i === editIndex ? formData : p)) : [...prev, formData]));
    setFormData({ name: "", category: "", image: "", price: "" });
    setEditIndex(null);
  };

  const handleEdit = (index) => {
    setFormData(products[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setProducts((prev) => prev.filter((_, i) => i !== index));
        Swal.fire("Deleted!", "Your product has been deleted.", "success");
      }
    });
  };

  return (
    <>
      <Helmet>
        <title>Admin</title>
      </Helmet>
      <div className="flex flex-col items-center px-4">
        <h1 className="mt-5 font-bold text-3xl sm:text-4xl">{text.HelloAdmin}</h1>
        <h3 className="my-6 text-lg sm:text-xl">{text.ProductManager}</h3>

        <form className="flex flex-col w-full max-w-lg" onSubmit={handleSubmit}>
          {["name", "category", "price"].map((field) => (
            <input key={field} type={field === "price" ? "number" : "text"} name={field} placeholder={text[field]} value={formData[field]} onChange={handleInputChange} required className="border p-2 my-2 rounded w-full" />
          ))}
          <input type="file" name="image" accept="image/*" onChange={handleInputChange} required className="border p-2 my-2 rounded w-full" />
          <button type="submit" className="mt-4 px-6 py-2.5 border rounded-lg text-sm transition hover:bg-black hover:text-white">
            {editIndex !== null ? "Update Product" : "Add Product"}
          </button>
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-6xl mt-6">
          {products.map((product, index) => (
            <Admincard key={index} product={product} onEdit={() => handleEdit(index)} onDelete={() => handleDelete(index)} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Admin;
