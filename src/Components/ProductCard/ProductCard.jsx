import { Link } from "react-router-dom"
import './ProductCard.css'
import { useContext } from "react"
import { auth } from "../../Contexts/AuthContext"
import { addToCart } from "../Cart/CartService"
import { addProduct } from "../../Redux/tolkit"
import { useDispatch,  } from "react-redux";





export default function ProductCard({productInfo}) {
    const {images, title, price, category, ratingsAverage, id} = productInfo

    let {userToken} = useContext(auth)

    const dispatch = useDispatch();

    const handeladd = () => {
        console.log(productInfo)
        addProduct(productInfo)
        dispatch(
            addProduct(productInfo)
        )

    }
    return (
    <>

    <div   className="lg:col-span-3 md:col-span-6 sm:col-span-12 drop-shadow-xl hover:-translate-y-4 transition-[0.3] shadow-lg hover:shadow-primary rounded-md overflow-hidden mt-10">
        <div className="relative">
        <Link to={`product/${id}`}>
        <img src={images[0]} className="w-full card-img object-fill"/>

        </Link>

     <button onClick={handeladd} >
     <i className="fa-regular fa-heart fav text-2xl" 
        >  </i>
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
            <div className="flex justify-around items-center mt-3">
                    <button onClick={()=>addToCart(id,userToken)} type="button" className="text-black pr-37 pl-37 hover:text-white border border-black hover:bg-black transition-[0.2] focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">Add</button>

                        
                </div>
        </div>
    </div>
    </>
  )
}
