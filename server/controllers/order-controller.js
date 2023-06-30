const Order = require("../models/Order");
const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { checkPermissions } = require("../utils");

// This is your test secret API key.
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

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

  // Note: frontend must provide id and quantity for each cart item

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
      quantity: item.quantity,
      productId: product._id,
    });
    subtotal += item.quantity * product.price;
  }

  const total = subtotal + tax + shippingFee;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "cad",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  // save order to DB
  const order = await Order.create({
    tax: tax,
    shippingFee: shippingFee,
    subtotal: subtotal,
    total: total,
    orderItems: orderItems,
    userId: req.user.id,
  });

  res.status(StatusCodes.CREATED).json({
    order: order,
    clientSecret: paymentIntent.client_secret,
  });
};

const getAllOrders = async (req, res) => {
  const orders = await Order.find({});

  res.status(StatusCodes.OK).json({ orders: orders, count: orders.length });
};

const getSingleOrder = async (req, res) => {
  const { orderId } = req.params;

  const order = await Order.findOne({ _id: orderId });

  if (!order) {
    throw new CustomError.NotFoundError(`no order with id: ${orderId}`);
  }

  checkPermissions(req.user, order.userId);

  res.status(StatusCodes.OK).json({ order: order });
};

const getCurrentUserOrders = async (req, res) => {
  const orders = await Order.find({ userId: req.user.id });

  res.status(StatusCodes.OK).json({ orders: orders, count: orders.length });
};

const updateOrder = async (req, res) => {
  const { orderId } = req.params;
  const { paymentIntentId } = req.body;

  const order = await Order.findOne({ _id: orderId });

  if (!order) {
    throw new CustomError.NotFoundError(`no order with id: ${orderId}`);
  }

  // mock Stripe API call
  const paymentIntent = await stripe.retrievePaymentIntent(paymentIntentId);

  if (!paymentIntent || paymentIntent.status != "succeeded") {
    throw new CustomError.BadRequestError(`payment failed`);
  }

  checkPermissions(req.user, order.userId);

  order.status = "paid";
  await order.save();

  res.status(StatusCodes.OK).json({ order: order });
};

module.exports = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  updateOrder,
};
