import { useEffect, useState } from "react";
import Admincard from "../Components/Admincard/Admincard";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const Admin = () => {
  const curentLange = useSelector((state) => state.lange.lange);
 


  const text = useSelector((state) => state.lange[curentLange]);
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
        const updatedProducts = products.filter((product, currentIndex) => currentIndex !== index);
        setProducts(updatedProducts);
        localStorage.setItem("products", JSON.stringify(updatedProducts));
  
        Swal.fire("Deleted!", "Your product has been deleted.", "success");
      }
    });
  };
  
 

  return (
    <>
    
    <Helmet>
      <title>Admin</title>
    </Helmet>
    <div className="flex items-center justify-center flex-col">
      <h1 className="text-center mt-5 font-bold text-4xl">{text.HelloAdmin}</h1>
      <h3 className="my-8">{text.ProductManager}</h3>
      <form className="flex flex-col w-200" onSubmit={handleSubmit}>
        <label>{text.ProductName}</label>
        <input
          type="text"
          name="name"
          placeholder={text.ProductName}
          value={formData.name}
          onChange={handleInputChange}
          required
          className="border-1 p-1 my-2"
        />
        <label>{text.Category}</label>
        <input
          type="text"
          name="category"
          placeholder={text.Category}
          value={formData.category}
          onChange={handleInputChange}
          required
          className="border-1 p-1 my-2"
        />
        <label>{text.Image}</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleInputChange}
          required
          className="border-1 p-1 my-2"
        />
        <label>{text.Price}</label>
        <input
          type="number"
          name="price"
          placeholder={text.Price}
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
    </>
  );
};

export default Admin;
