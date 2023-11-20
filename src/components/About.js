import React from "react";
import Footer from "../components/Footer";
import "./About.css"; // Make sure to import your CSS file

export default function About() {
  return (
    <div className="about-page">
      <div className="container mt-5">
        <h1 className="mb-4">About DashDines</h1>
        <p>
          DashDines is your gateway to a world of culinary delights. We believe
          that food is not just a necessity but an experience that should be
          savored and celebrated. Our platform was born out of a passion for
          bringing together diverse cuisines, talented chefs, and food
          enthusiasts like you.
        </p>
        <p>
          Established in 2023, DashDines has rapidly evolved into a community
          that explores the boundaries of flavor, supports local culinary
          talents, and redefines the way people experience food. We are
          dedicated to making your gastronomic journey unforgettable by
          providing a seamless and delightful food discovery and delivery
          experience.
        </p>
        <p>
          What sets DashDines apart is our commitment to variety. From
          mouth-watering street food to exquisite fine dining, we curate a
          diverse selection of dishes to cater to every palate. Our platform
          empowers both seasoned chefs and emerging talents, creating a space
          where creativity thrives and culinary boundaries are pushed.
        </p>
        <p>
          Join us on this flavorful adventure, where every dish tells a story
          and every bite is a celebration. DashDines is not just a service; it's
          a journey, a community, and a feast for the senses. Let your taste
          buds explore, and let DashDines be your companion in this exciting
          culinary expedition!
        </p>
      </div>
      
      <Footer />
    </div>
  );
}
