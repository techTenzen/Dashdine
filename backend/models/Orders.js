const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderScheme = new Schema({
  user: { type: String, required: true, unique: true },
  order_data: { type: Array, required: true },
});

module.exports = mongoose.model("order", OrderScheme);
