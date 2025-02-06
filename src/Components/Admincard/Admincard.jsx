const Admincard = ({ product, onEdit, onDelete, index }) => {
    return (
      <div className="product-card border p-4 rounded-2xl w-50  shadow-lg">
        <img src={product.image} alt={product.name} className="w-full  object-cover rounded" />
        <h3 className="text-lg font-bold mt-2">{product.name}</h3>
        <p>Category: {product.category}</p>
        <p>Price: {product.price}L.E</p>
        <div className="flex justify-between mt-2">
          <button 
            className="bg-black text-white px-6 py-1 rounded"
            onClick={() => onEdit(index)}
          >
            Edit
          </button>
          <button 
            className="bg-black text-white px-4 py-1 rounded"
            onClick={() => onDelete(index)}
          >
            Delete
          </button>
        </div>
      </div>
    );
  };
  
  export default Admincard;
  