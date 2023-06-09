const Order = require("../models/Order");
const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { checkPermissions } = require("../utils");

const createOrder = async (req, res) => {
  const { cartItems, tax, shippingFee } = req.body;

  if (!cartItems || cartItems.length == 0) {
    throw new CustomError.BadRequestError("no cart items");
  }

  if (!tax || !shippingFee) {
    throw new CustomError.BadRequestError(
      "please provide tax and shipping fee"
    );
  }

  let orderItems = [];
  let subtotal = 0; // in cents

  // Note: frontend must provide id and count for each cart item

  for (const item of cartItems) {
    const product = await Product.findOne({ _id: item.productId });

    if (!product) {
      throw new CustomError.NotFoundError(
        `no product with id: ${item.productId}`
      );
    }

    orderItems.push({
      name: product.name,
      image: product.image,
      price: product.price,
      count: item.count,
      productId: product._id,
    });

    subtotal += item.count * product.price;
  }

  const total = subtotal + tax + shippingFee;

  // mock Stripe API call
  const paymentIntent = await fakeStripeAPI({
    amount: total,
    currency: "usd",
  });

  // save order to DB
  const order = await Order.create({
    tax: tax,
    shippingFee: shippingFee,
    subtotal: subtotal,
    total: total,
    orderItems: orderItems,
    clientSecret: paymentIntent.clientSecret,
    userId: req.user.userId,
  });

  res.status(StatusCodes.CREATED).json({
    order: order,
    clientSecret: paymentIntent.clientSecret,
  });
};

const fakeStripeAPI = async ({ amount, currency }) => {
  // do something with amount and currency

  return {
    clientSecret: "mocksecret",
    amount: amount,
    currency: currency,
  };
};

const getAllOrders = async (req, res) => {
  res.send("get all orders");
};

const getSingleOrder = async (req, res) => {
  res.send("get single order");
};

const getCurrentUserOrders = async (req, res) => {
  res.send("get current user orders");
};

const updateOrder = async (req, res) => {
  res.send("update order");
};

module.exports = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  updateOrder,
};
