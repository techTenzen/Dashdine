import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div>
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <div className="col-md-5">
          <p className="mb-md-0 text-muted">
            Welcome to 24/7 Marts - Your Culinary Journey Begins Here!
          </p>
        </div>
        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li className="ms-3">
            <Link className="text-muted" to="/">
              Home
            </Link>
          </li>
          <li className="ms-3">
            <Link className="text-muted" to="/about">
              About Us
            </Link>
          </li>
          <li className="ms-3">
            <Link className="text-muted" to="/contact">
              Contact
            </Link>
          </li>
        </ul>
      </footer>
    </div>
  );
}
