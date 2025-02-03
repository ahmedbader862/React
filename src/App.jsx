import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home";
import "aos/dist/aos.css";
import AuthContextProvider from "./Contexts/AuthContext";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
// import AuthContextProvider from "./Contexts/AuthContext";
import { ToastContainer } from "react-toastify";
import Cart from "./Components/Cart/Cart";
import WatchList from "./Pages/watchlist";

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
          <Route path="/watchlist" element={< WatchList/>} />

        </Routes>
      </Router>
      <ToastContainer />


    </AuthContextProvider>

  );
}

export default App;
