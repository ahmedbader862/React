import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home";
import AOS from "aos";
import "aos/dist/aos.css";

import "aos/dist/aos.css";
import AuthContextProvider from "./Contexts/AuthContext";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import { ToastContainer } from "react-toastify";
import Cart from "./Components/Cart/Cart";
<<<<<<< HEAD
import ProductDetails from "./Pages/ProductDetails";

=======
import WatchList from "./Pages/watchlist";
>>>>>>> redux

function App() {
  return (


    <AuthContextProvider>


      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
<<<<<<< HEAD
          <Route path="/Product/:id" element={<ProductDetails />} />
=======
          <Route path="/watchlist" element={< WatchList/>} />
>>>>>>> redux

        </Routes>
      </Router>
      <ToastContainer />


    </AuthContextProvider>

  );
}

export default App;
