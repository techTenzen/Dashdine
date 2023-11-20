import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Modal from "../Modal";
import Cart from "../screens/Cart";
import { useCart } from "../components/ContextReducer";

const Navbar = () => {
  const [cartView, setCartView] = useState(false);
  const navigate = useNavigate();
  const items = useCart(); // Get the cart items

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const loadCart = () => {
    setCartView(true);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark position-sticky">
      <div className="container-fluid">
        <Link className="navbar-brand fs-1 text-warning" to="/">
          DashDine
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className="active btn btn-outline-warning mx-3 mt-2"
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
          </ul>
          <form className="d-flex">
            <Link
              className="btn btn-outline-warning mx-1 mt-0 active"
              to="/contact"
            >
              Contact Us
            </Link>
          </form>
          {!localStorage.getItem("authToken") ? (
            <form className="d-flex">
              <Link className="btn btn-outline-warning mx-1" to="/login">
                Login
              </Link>
              <Link className="btn btn-outline-warning mx-1" to="/createuser">
                Signup
              </Link>
            </form>
          ) : (
            <div className="d-flex align-items-center">
              <div
                className="btn btn-outline-warning mx-2 position-relative"
                onClick={loadCart}
              >
                <Badge
                  color="secondary"
                  badgeContent={items.length}
                  overlap="circular"
                >
                  <ShoppingCartIcon />
                </Badge>
                <span className="ms-1">Cart</span>
              </div>
              {cartView ? (
                <Modal onClose={() => setCartView(false)}>
                  <Cart />
                </Modal>
              ) : (
                ""
              )}
              <button
                onClick={handleLogout}
                className="btn btn-outline-warning ms-2"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
