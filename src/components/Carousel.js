import React from "react";
import Carousel from "react-bootstrap/Carousel";

function CarouselFadeExample() {
  return (
    <div style={{ maxHeight: "80vh", maxWidth: "100vw", overflow: "hidden" }}>
      <Carousel fade style={{ height: "100%", width: "100%" }}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://source.unsplash.com/random/900x600/?produce"
            alt="Fresh Produce"
            style={{ objectFit: "cover", height: "100%" }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://source.unsplash.com/random/900x600/?dairy"
            alt="Dairy Products"
            style={{ objectFit: "cover", height: "100%" }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://source.unsplash.com/random/900x600/?bakery"
            alt="Bakery Items"
            style={{ objectFit: "cover", height: "100%" }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://source.unsplash.com/random/900x600/?snacks"
            alt="Snack Selection"
            style={{ objectFit: "cover", height: "100%" }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://source.unsplash.com/random/900x600/?meat,seafood"
            alt="Meat and Seafood"
            style={{ objectFit: "cover", height: "100%" }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://source.unsplash.com/random/900x600/?household"
            alt="Household Essentials"
            style={{ objectFit: "cover", height: "100%" }}
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default CarouselFadeExample;
