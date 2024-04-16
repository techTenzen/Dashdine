import React, { useState } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";

const containerStyle = {
  paddingLeft: 0,
  paddingRight: 0,
  marginLeft: 0,
  marginRight: 0,
};
const cardStyle = {
  maxWidth: "22rem",
  height: "auto", // Set a fixed height or adjust as needed
  display: "inline-block", // Ensure cards are displayed in a row
};

const selectStyle = {
  margin: "5px",
  height: "40px",
  width: "60%",
  fontSize: "1.1em",
  backgroundColor: "lightgray",
};

export default function Card({ foodItems }) {
  const [selectedOption, setSelectedOption] = useState(
    Object.keys(foodItems[0].options[0])[0]
  );

  const [quantity, setQuantity] = useState(1);

  const handleChangeOption = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleChangeQuantity = (event) => {
    setQuantity(event.target.value);
  };

  const getTotalPrice = (dish) => {
    return dish.options[0][selectedOption] * quantity;
  };

  const dispatchCart = useDispatchCart();
  const cart = useCart();

  /*const handleAddToCart = async () => {
   let itemToAdd = [];

   for (const item of foodItems) {
     if (item.id === foodItems._id) {
       itemToAdd = {
         name: item.name,
         price: getTotalPrice(foodItems[0]),
         qty: item.qty, // Replace with the appropriate property for quantity
         options: item.options, // Replace with the appropriate property for options
       };

       break;
     }
   }
*/
  const handleAddToCart = async () => {
    let itemToAdd = [];

    for (const item of foodItems) {
      if (item.id === foodItems[0].id) {
        // Compare with the appropriate ID property
        itemToAdd = {
          name: item.name,
          price: getTotalPrice(item),
          qty: item.qty, // Replace with the appropriate property for quantity
          options: item.options, // Replace with the appropriate property for options
        };

        break;
      }
    }

    dispatchCart({
      type: "ADD_TO_CART",
      payload: itemToAdd,
    });

    // Log the cart state to check if the item was added
    console.log("Cart state after adding item:", cart);
  };

  return (
    <div>
      {foodItems.map((dish, index) => (
        <div className="card mt-3" style={containerStyle} key={index}>
          <img
            src={dish.img}
            className="card-img-top"
            alt={dish.name}
            style={{
              width: "100%",
              maxHeight: "280px",
              height: "240px",
              objectFit: "fill",
            }}
          />
          <div className="card-body">
            <h5 className="card-title fs-4 mb-3">{dish.name}</h5>
            <div className="container w-100">
              <div className="d-flex align-items ">
                <select
                  className="h-100 bg-dark"
                  value={selectedOption}
                  onChange={handleChangeOption}
                  style={selectStyle}
                >
                  {Object.keys(dish.options[0]).map((option, i) => (
                    <option key={i} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <select
                  className="h-100 bg-dark"
                  value={quantity}
                  onChange={handleChangeQuantity}
                  style={selectStyle}
                >
                  {Array.from({ length: 15 }, (_, i) => i + 1).map((num, i) => (
                    <option key={i} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>
              <div className=" fs-5">
                Total Price: {getTotalPrice(dish)} INR
              </div>
            </div>
            <hr />
            <button className="btn btn-dark  ms-2" onClick={handleAddToCart}>
              Add To Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
