import { Link } from "react-router-dom";
import logo from "../../assets/Imges/freshcart-logo.svg";
import "./Navbar.css";
import { useSelector } from "react-redux";



function Navbar() {

 const productLenth = useSelector((state) => state.lange.products.length);
  
  return (
    <>
      <nav className="bg-white dark:bg-gray-900 sticky w-full z-20 top-0 start-0 ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={logo} className="h-8" alt="Flowbite Logo" />
          </a>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            
          

            <div className="buttons flex gap-2">
            
            <Link to={'/login'} type="button" className="text-white bg-black hover:bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
           log in  </Link>
           
            <Link to={"/register"} type="button" className="text-white bg-black hover:bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Sign up
            </Link>
            
            <Link to={"/watchlist"} type="button" className="text-white bg-black hover:bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              watchlist {productLenth}
            </Link>

            </div>
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>
          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link to="/" className="block py-2 hover:text-black px-3 text-white bg-gray-700 rounded-sm md:bg-transparent md:text-gray-700 md:p-0 md:dark:text-black-500">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="block py-2 hover:text-black px-3 text-white bg-gray-700 rounded-sm md:bg-transparent md:text-gray-700 md:p-0 md:dark:text-black">
                  Products
                </Link>
              </li>
              <li>
                <Link to="#" className="block py-2 hover:text-black px-3 text-white bg-gray-700 rounded-sm md:bg-transparent md:text-gray-700 md:p-0 md:dark:text-black">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/Brands" className="block py-2 hover:text-black px-3 text-white bg-gray-700 rounded-sm md:bg-transparent md:text-gray-700 md:p-0 md:dark:text-black">
                  Brands
                </Link>
              </li>
            </ul>
          </div>

          <Link to="/cart" className="cart md:order-3 relative">
          <i className="text-black hover:text-black text-2xl mt-2 fa-solid fa-cart-shopping"></i>
          <span className="bg-black text-white h-4 w-4 font-bold text-sm flex justify-center items-center rounded-full absolute pb-0.5 top-0 right-0 translate-x-1/2 -translate-y-1/2">
            0
          </span>
        </Link>
        </div>
        
      </nav>
    </>
  );
}

export default Navbar;
