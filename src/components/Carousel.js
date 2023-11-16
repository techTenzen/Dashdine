import React from "react";

export default function Carousel() {
  return (
    <div className="position-relative">
      <div className="carousel-container" style={{ maxHeight: "100px" }}>
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade w-100"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="https://source.unsplash.com/random/900x700/?burger"
                className="d-block w-100"
                style={{ maxHeight: "300px", filter: "brightness(50%)" }}
                alt="Burger"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900x700/?icecream"
                className="d-block w-100"
                style={{ maxHeight: "300px", filter: "brightness(50%)" }}
                alt="Ice Cream"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900x700/?candy"
                className="d-block w-100"
                style={{ maxHeight: "300px", filter: "brightness(50%)" }}
                alt="Candy"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className="position-absolute bottom-0 start-50 translate-middle-x p-4"
        style={{ zIndex: 10, width: "80%" }}
      >
        <form className="d-flex">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleFade"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleFade"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
