import { useSelector } from "react-redux";
import ProductCard from "../Components/ProductCard/ProductCard";

function WatchList() {

  const curentLange = useSelector((state) => state.lange.lange);
  const text = useSelector((state) => state.lange[curentLange]);

  const  allProduct= useSelector((state) => state.lange.products);
  console.log(allProduct);
  
    return (
        
       <div className="container mx-auto ">
         <div className="">

            <h1 className="font-bold text-2xl text-center m-7 flex-grow">{text.allFav}</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-10">
        {allProduct.map((allProduct) => (
         <ProductCard key={allProduct.id} productInfo={allProduct} />
        ))}
      </div>
        </div>
       </div>
    );
}
export default WatchList;