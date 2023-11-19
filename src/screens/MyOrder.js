import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MyOrder() {
  const [orderData, setOrderData] = useState({}); // Define the orderData state

  useEffect(() => {
    const fetchMyOrder = async () => {
      const userEmail = localStorage.getItem("userEmail");
      if (userEmail) {
        try {
          const response = await fetch(
            "http://localhost:3001/api/myOrderData",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: userEmail,
              }),
            }
          );

          if (response.status === 200) {
            const data = await response.json();
            console.log("Data received from the API:", data); // Add this line for debugging

            if (data && data.orderData) {
              setOrderData(data.orderData);
            }
          }
        } catch (error) {
          console.error("Error fetching order data:", error);
        }
      }
    };

    fetchMyOrder();
  }, []);

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="container">
        <div className="row">
          {orderData && orderData.order_data ? (
            orderData.order_data
              .slice(0)
              .reverse()
              .map((item, index) => (
                <div key={index} className="col-12 col-md-6 col-lg-3">
                  <div
                    className="card mt-3"
                    style={{ width: "16rem", maxHeight: "360px" }}
                  >
                    <img
                      src={item.img}
                      className="card-img-top"
                      alt="..."
                      style={{ height: "120px", objectFit: "fill" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{item.name}</h5>
                      <div
                        className="container w-100 p-0"
                        style={{ height: "38px" }}
                      >
                        <span className="m-1">{item.qty}</span>
                        <span className="m-1">{item.size}</span>
                        <span className="m-1">{item.Order_date}</span>
                        <div className="d-inline ms-2 h-100 w-20 fs-5">
                          ₹{item.price}/-
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
          ) : (
            <h2>
              <br></br>No orders found.
            </h2>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
