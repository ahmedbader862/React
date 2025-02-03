import { useSelector } from "react-redux";
import ProductCard from "../Components/ProductCard/ProductCard";

function WatchList() {
  const  allProduct= useSelector((state) => state.lange.products);
  console.log(allProduct);
  
    return (
        
        <div>
            <h1>allProduct</h1>
            <div className="grid grid-cols-12 gap-4">
        {allProduct.map((allProduct) => (
         <ProductCard key={allProduct.id} productInfo={allProduct} />
        ))}
      </div>
        </div>
    );
}
export default WatchList;