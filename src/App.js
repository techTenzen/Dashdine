import "./App.css";
import Home from "./screens/Home";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./screens/Login";
import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
/* eslint-disable */
import "bootstrap-dark-5/dist/css/bootstrap-dark.min.css";

import Signup from "./screens/Signup";
import Cart from "./screens/Cart";
import { CartProvider } from "./components/ContextReducer";
import MyOrder from "./screens/MyOrder";
import Contact from "./screens/Contact.js";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/createuser" element={<Signup />} />
            <Route exact path="/contact" element={<Contact />} />
          </Routes>
          <ToastContainer />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
