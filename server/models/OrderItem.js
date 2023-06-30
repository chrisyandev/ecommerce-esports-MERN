const mongoose = require("mongoose");
const ImageSchema = require("./Image");

const OrderItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: ImageSchema,
    default: {
      url: "/uploads/example.jpg",
      altText: "Example Image",
    },
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  productId: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
    required: true,
  },
});

module.exports = OrderItemSchema;
