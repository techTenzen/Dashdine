import React from "react";
import Carousel from "react-bootstrap/Carousel";

function CarouselFadeExample() {
  return (
    <CarouselContainer>
      <Carousel fade>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://source.unsplash.com/random/900x400/?burger"
            alt="Burger"
            style={{ height: "300px", filter: "brightness(50%)" }}
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://source.unsplash.com/random/900x400/?icecream"
            alt="Ice Cream"
            style={{ height: "300px", filter: "brightness(50%)" }}
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://source.unsplash.com/random/900x400/?candy"
            alt="Candy"
            style={{ height: "300px", filter: "brightness(50%)" }}
          />
        </Carousel.Item>
      </Carousel>
    </CarouselContainer>
  );
}

export default CarouselFadeExample;