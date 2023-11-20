import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartProvider } from "./components/ContextReducer";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Signup from "./screens/Signup";

import Contact from "./screens/Contact";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div>
          <Routes>
            <Route
              exact
              path="/"
              element={<Home />}
            />
            <Route
              exact
              path="/login"
              element={<Login  />}
            />
            <Route
              exact
              path="/createuser"
              element={<Signup  />}
            />
            <Route
              exact
              path="/contact"
              element={<Contact  />}
            />
          </Routes>
          <ToastContainer />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
