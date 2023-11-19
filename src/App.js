import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartProvider } from "./components/ContextReducer";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Cart from "./screens/Cart";
import MyOrder from "./screens/MyOrder";
import Contact from "./screens/Contact";
import config from "./config";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div>
          <Routes>
            <Route
              exact
              path="/"
              element={<Home backendUrl={config.backendUrl} />}
            />
            <Route
              exact
              path="/login"
              element={<Login backendUrl={config.backendUrl} />}
            />
            <Route
              exact
              path="/createuser"
              element={<Signup backendUrl={config.backendUrl} />}
            />
            <Route
              exact
              path="/contact"
              element={<Contact backendUrl={config.backendUrl} />}
            />
          </Routes>
          <ToastContainer />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
