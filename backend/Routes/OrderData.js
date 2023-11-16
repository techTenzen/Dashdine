const express = require("express");
const router = express.Router();
const Order = require("../models/Orders");

router.post("/orderData", async (req, res) => {
  try {
    const data = req.body.order_data;
    const order_date = new Date(); // Get the current date and time
    const user = req.body.email; // Provide the user information

    // Insert the order date into the data
    data.unshift({ Order_date: order_date });

    let order = await Order.findOne({ user: user });

    if (!order) {
      order = new Order({
        user,
        order_data: [data],
      });

      await order.save();
    } else {
      order.order_data.push(data);
      await order.save();
    }

    res.json({ success: true });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error: " + error.message });
  }
});

router.post("/myOrderData", async (req, res) => {
  try {
    const userEmail = req.body.email;
    const orderData = await Order.find({ user: userEmail });
    res.json({ orderData });
  } catch (error) {
    res.status(500).json({ message: "Server Error: " + error.message });
  }
});

module.exports = router;
