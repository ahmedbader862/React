import { Link } from "react-router-dom"
import './ProductCard.css'
import { useContext } from "react"
import { auth } from "../../Contexts/AuthContext"
import { addToCart } from "../Cart/CartService"
import { useDispatch, useSelector } from "react-redux"
import { addProduct, removeproduct } from "../../Redux/tolkit"





export default function ProductCard({productInfo}) {
    const {images, title, price, category, ratingsAverage, id} = productInfo

    let {userToken} = useContext(auth)
    

    const disbatch = useDispatch()
    
    const product = useSelector((state) => state.lange.products);
    
    const isAdded = product.some((item) => item.id === productInfo.id);

    const curentLange = useSelector((state) => state.lange.lange);

    const  text = useSelector((state) => state.lange[curentLange]);

    const handleAddToWatchList = () => {
        if (isAdded) {
            
            removeFromWatchList(); 

        } else {

            addToWatchList(); 
        }
    };

    const addToWatchList = () => {
        disbatch(addProduct(productInfo))
    }
    const removeFromWatchList = () => {
        disbatch(removeproduct(productInfo.id))
    }

    return (
    <>

    <div   className=" drop-shadow-xl hover:-translate-y-4 transition-[0.3] shadow-lg  hover:shadow-primary rounded-md overflow-hidden mt-10">
        <div className="relative">
        <Link to={`product/${id}`}>
        <img src={images[0]} className="w-full card-img object-fill"/>
        </Link>
                                                          {/*$$$ add To Watch List $$$*/}
        <button onClick={handleAddToWatchList}>       
        <i className={`text-2xl fav ${isAdded ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}`}></i>
        </button>

        </div>
        <div className="p-3  ">
            <h3 className="text-primary">{category.name}</h3>
            <h2 className="text-lg font-semibold line-clamp-1">{title}</h2>
            <div className="flex items-center justify-between mt-4 ">
                <span className="text-lg">{price} L.E</span>
                <div className="flex items-center gap-1">
                    <i className="fa-solid fa-star text-yellow-500"></i>
                    <span className="text-lg">{ratingsAverage}</span>
                </div>
                
            </div>
            <div className="flex justify-around items-center mt-3 w-full">
                    <button onClick={()=>addToCart(id,userToken)} type="button" className="cursor-pointer  w-full text-black pr-20 pl-20 hover:text-white border border-black hover:bg-black transition-[0.2] focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">
                    {text.add}</button>

                        
                </div>
        </div>
    </div>
    </>
  )
}
