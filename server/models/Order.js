const mongoose = require("mongoose");
const { OrderItem: OrderItem, OrderItemSchema } = require("./OrderItem");

const OrderSchema = new mongoose.Schema({
  tax: {
    type: Number,
    required: true,
  },
  shippingFee: {
    type: Number,
    required: true,
  },
  subtotal: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  orderItems: [OrderItemSchema],
  status: {
    type: String,
    enum: ["pending", "failed", "paid", "delivered", "canceled"],
    default: "pending",
  },
  clientSecret: {
    type: String,
    required: true,
  },
  paymentIntentId: {
    type: String,
    default: undefined,
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Order", OrderSchema);
