import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/Imges/freshcart-logo.svg";
import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { changeEn } from "../../Redux/tolkit";
import { useContext, useState } from "react";
import { auth } from "../../Contexts/AuthContext";

function Navbar() {
  const dispatch = useDispatch();

  const isAdmin = localStorage.getItem("isAdmin") === "true"; // Check admin status

  let { setLogin, isLogin } = useContext(auth);

  const currentLange = useSelector((state) => state.lange.lange);

  const text = useSelector((state) => state.lange[currentLange]);

  const productLength = useSelector((state) => state.lange.products.length);

  const en = () => {
    console.log(currentLange);
    dispatch(changeEn(currentLange === "en" ? "ar" : "en"));
  };

  let navigate = useNavigate();
  function logOut() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('isAdmin');
    setLogin(null);
    navigate('/login');
  }

  // Add state to manage mobile menu toggle
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className="clr sticky w-full z-20 top-0 start-0">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <h1 className="text-3xl font-bold text-black">
              <i className="text-black hover:text-black text-2xl mt-2 me-1 fa-solid fa-cart-shopping"></i>
              QuickCart
            </h1>
          </Link>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <div className="buttons flex gap-2">
              {(isLogin || isAdmin) ? (
                <li
                  onClick={logOut}
                  className="list-none text-white bg-black hover:bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center cursor-pointer"
                >
                  {text.Logout}
                </li>
              ) : (
                <>
                  <Link
                    to={"/login"}
                    type="button"
                    className="text-white bg-black hover:bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center cursor-pointer"
                  >
                    {text.signIn}
                  </Link>
                  <Link
                    to={"/register"}
                    type="button"
                    className="text-white bg-black hover:bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center cursor-pointer"
                  >
                    {text.signUp}
                  </Link>
                </>
              )}

              <Link
                to={"/watchlist"}
                type="button"
                className="text-white bg-black hover:bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center cursor-pointer"
              >
                {text.wishlist} {productLength}
              </Link>

              <button
                onClick={en}
                className="text-white bg-black hover:bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
              >
                {currentLange}
              </button>
            </div>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)} // Toggle menu on button click
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded={isMenuOpen ? "true" : "false"}
            >
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>

          <div
            className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isMenuOpen ? 'block' : 'hidden'}`}
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium  rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
              <li>
                <Link
                  to="/"
                  className="block py-2 text-black-500"
                  onClick={() => setIsMenuOpen(false)} // Close menu on click
                >
                  {text.home}
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="block py-2 text-black"
                  onClick={() => setIsMenuOpen(false)} // Close menu on click
                >
                  {text.Products}
                </Link>
              </li>
              <li>
                <Link
                  to="/categories"
                  className="block py-2 text-black"
                  onClick={() => setIsMenuOpen(false)} // Close menu on click
                >
                  {text.Categories}
                </Link>
              </li>
              <li>
                <Link
                  to="/Brands"
                  className="block py-2 text-black"
                  onClick={() => setIsMenuOpen(false)} // Close menu on click
                >
                  {text.Brands}
                </Link>
              </li>
              {isAdmin && (
                <li>
                  <Link
                    to="/admin"
                    className="block py-2 text-black"
                    onClick={() => setIsMenuOpen(false)} // Close menu on click
                  >
                    {text.Admin}
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {isLogin && (
            <Link to="/cart" className="cart md:order-3 relative">
              <i className="text-black hover:text-black text-2xl mt-2 fa-solid fa-cart-shopping"></i>
            </Link>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;


