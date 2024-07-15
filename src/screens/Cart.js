import React, { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import { useCart, useDispatchCart } from "../components/ContextReducer";
import { toast } from "react-toastify";
import "./Cart.css";

export default function Cart() {
  const [name, setName] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);
  const [serviceRating, setServiceRating] = useState(0);
  const [address, setAddress] = useState("");
  const data = useCart();
  const dispatch = useDispatchCart();

  const handleCheckOut = async () => {
    if (!name || !address) {
      alert("Please enter your name and address before checking out.");
      return;
    }

    let userEmail = localStorage.getItem("userEmail");
    let response = await fetch(
      "https://dashdine-fy97.onrender.com/api/orderData",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order_data: data,
          email: userEmail,
          serviceRating: serviceRating,
          address: address,
        }),
      }
    );

    if (response.status === 200) {
      dispatch({ type: "CLEAR_CART" });

      showCheckoutSuccessToast();

      showFeedbackToast(selectedRating, serviceRating);

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

  const showFeedbackToast = (foodRating, serviceRating) => {
    toast.info(
      `🌟 Thank you for your feedback! You gave us a ${serviceRating}-star rating for service. 🌟`,
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

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleStarClick = (rating, isServiceRating) => {
    if (isServiceRating) {
      setServiceRating(rating);
    } else {
      setSelectedRating(rating);
    }
  };

  const renderStars = (isServiceRating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`star ${
            isServiceRating
              ? serviceRating >= i
                ? "selected"
                : ""
              : selectedRating >= i
              ? "selected"
              : ""
          }`}
          onClick={() => handleStarClick(i, isServiceRating)}
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
              <thead className="text-success fs-5">
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
              <h1 className="fs-4">Total Price: {totalPrice || 0}/-</h1>
            </div>

            <div className="mt-5">
              <label htmlFor="signature" className="label signature-label fs-5">
                Signature:
              </label>
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
              <label htmlFor="address" className="label address-label fs-5">
                Delivery Address:
              </label>
              <div className="input-group">
                <input
                  type="text"
                  id="address"
                  name="address"
                  className="form-control col-1"
                  placeholder="Enter your delivery address"
                  value={address}
                  onChange={handleAddressChange}
                />
              </div>
            </div>

            <div className="mt-3">
              <label
                className="label checkout-label fs-5"
                htmlFor="serviceRating"
              >
                Rate Our Service:
              </label>
              <div className="star-container">{renderStars(true)}</div>
            </div>

            <div className="mt-3">
              <button
                className="btn btn-outline-warning mx-0 mt-2"
                onClick={handleCheckOut}
                disabled={!name || !address}
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
