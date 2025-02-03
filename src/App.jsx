import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home";
import "aos/dist/aos.css";
import AuthContextProvider from "./Contexts/AuthContext";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import { ToastContainer } from "react-toastify";
import Cart from "./Components/Cart/Cart";
import ProductDetails from "./Pages/ProductDetails";
import WatchList from "./Pages/watchlist";
import Categories from "./Categories/Categories";
import CategoryProducts from "./Categories/CategoryProducts"; // Import the new component

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
          <Route path="/Product/:id" element={<ProductDetails />} />
          <Route path="/watchlist" element={<WatchList />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/:categoryId/:categoryName" element={<CategoryProducts />} /> {/* Add this route */}
        </Routes>
      </Router>
      <ToastContainer />
    </AuthContextProvider>
  );
}

export default App;

