import React, { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import { useCart, useDispatchCart } from "../components/ContextReducer";
import { toast } from "react-toastify";
import "./Cart.css"; // Add your CSS file for styling (if needed)

export default function Cart() {
  const [name, setName] = useState("");
  const [selectedRating, setSelectedRating] = useState(0); // State for selected rating
  const data = useCart();
  const dispatch = useDispatchCart();

  const handleCheckOut = async () => {
    if (!name) {
      alert("Please enter your name before checking out.");
      return;
    }

    let userEmail = localStorage.getItem("userEmail");
    let response = await fetch("http://localhost:3001/api/orderData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
      }),
    });

    if (response.status === 200) {
      dispatch({ type: "CLEAR_CART" });

      // Show the Thank You toast
      showCheckoutSuccessToast();

      // Show the Feedback toast with selected rating
      showFeedbackToast(selectedRating);

      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  };

  const showCheckoutSuccessToast = () => {
    toast.success(`Thank you for ordering, ${name}! See you soon.`, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const showFeedbackToast = (rating) => {
    toast.info(
      `🌟 Thank you for your feedback! You gave us a ${rating}-star rating. 🌟`,
      {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleStarClick = (rating) => {
    setSelectedRating(rating);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`star ${selectedRating >= i ? "selected" : ""}`}
          onClick={() => handleStarClick(i)}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  const totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <div>
      <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md">
        {data.length === 0 ? (
          <div className="text-center fs-3">Cart is empty</div>
        ) : (
          <div>
            <table className="table table-hover">
              <thead className="text-success fs-4">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Amount</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {data.map((food, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{food.name}</td>
                    <td>{food.price}</td>
                    <td>
                      <button
                        type="button"
                        className="btn p-0"
                        onClick={() => dispatch({ type: "REMOVE", index })}
                      >
                        <DeleteIcon />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-3">
              <h1 className="fs-2">Total Price: {totalPrice || 0}/-</h1>
            </div>

            <div className="mt-5">
              <label htmlFor="signature">Signature:</label>
              <div className="input-group">
                <input
                  type="text"
                  id="signature"
                  name="signature"
                  className="form-control col-1"
                  placeholder="Enter your name"
                  value={name}
                  onChange={handleNameChange}
                />
              </div>
            </div>

            <div className="mt-3">
              <div className="star-container">{renderStars()}</div>
            </div>

            <div className="mt-3">
              <button
                className="btn bg-success mt-3"
                onClick={handleCheckOut}
                disabled={!name}
              >
                Check Out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}