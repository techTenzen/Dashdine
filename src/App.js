import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartProvider } from "./components/ContextReducer";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import ScrollToTop from "./components/ScrollToTop";
import Contact from "./screens/Contact";
import "./App.css"; // Import the CSS file
import About from "./components/About";
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
            <Route exact path="/about" element={<About />}/>
          </Routes>
          <ToastContainer />
          <ScrollToTop />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
