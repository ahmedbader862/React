const Admincard = ({ product, onEdit, onDelete, index }) => {
  return (
    <div className="border p-4 rounded-2xl shadow-lg bg-white w-full">
      {/* Product Image */}
      {product.image ? (
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-40 object-cover rounded"
        />
      ) : (
        <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
          <p className="text-gray-500">No Image</p>
        </div>
      )}

      {/* Product Info */}
      <h3 className="text-lg font-bold mt-2">{product.name}</h3>
      <p>Category: {product.category}</p>
      <p>Price: {product.price} L.E</p>

      {/* Action Buttons */}
      <div className="flex justify-between mt-2">
        <button 
          className="bg-black text-white px-6 py-1 rounded"
          onClick={() => onEdit(index)}
        >
          Edit
        </button>
        <button 
          className="bg-red-600 text-white px-4 py-1 rounded"
          onClick={() => onDelete(index)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Admincard;


  