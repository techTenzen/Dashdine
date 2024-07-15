import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Footer from "../components/Footer";
import { CartProvider } from "../components/ContextReducer";

export default function Home() {
  const [search, setSearch] = useState("");
  const [foodCat, setFoodCat] = useState([]);
  const [foodItems, setFoodItems] = useState([]);

  const loadData = async () => {
    try {
      const response = await fetch(
        "https://dashdine-fy97.onrender.com/api/foodData",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setFoodCat(data[1]);
      setFoodItems(data[0]);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <CartProvider>
      <div>
        <Navbar />
        <div className="position-relative">
          <div
            id="carouselExampleFade"
            className="carousel slide carousel-fade w-100"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src="https://source.unsplash.com/random/900x700/?bakery"
                  className="d-block w-100"
                  style={{ height: "700px", filter: "brightness(50%)" }}
                  alt="..."
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://source.unsplash.com/random/600x700/?icecream"
                  className="d-block w-100"
                  style={{ height: "700px", filter: "brightness(50%)" }}
                  alt="..."
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://source.unsplash.com/random/900x700/?snacks"
                  className="d-block w-100"
                  style={{ height: "700px", filter: "brightness(50%)" }}
                  alt="..."
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://source.unsplash.com/random/900x700/?household"
                  className="d-block w-100"
                  style={{ height: "700px", filter: "brightness(50%)" }}
                  alt="..."
                />
              </div>
            </div>
          </div>
          <div
            className="position-absolute bottom-0 start-50 translate-middle-x p-4"
            style={{ zIndex: 10, width: "80%" }}
          >
            <div className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        <div className="container">
          {foodCat.length > 0 ? (
            <div>
              {foodCat.map((category) => (
                <div key={category._id}>
                  <h2>{category.CategoryName}</h2>
                  <div className="row">
                    {foodItems
                      .filter(
                        (dish) =>
                          dish.CategoryName === category.CategoryName &&
                          dish.name.toLowerCase().includes(search.toLowerCase())
                      )
                      .map((dish, index) => (
                        <div
                          className="col-12 col-md-6 col-lg-4 mb-3"
                          key={index}
                        >
                          <Card foodItems={[dish]} />
                        </div>
                      ))}
                  </div>
                  <hr />
                </div>
              ))}
            </div>
          ) : (
            <div>No categories available</div>
          )}
        </div>
        <Footer />
      </div>
    </CartProvider>
  );
}
