const express = require("express");
const router = express.Router();

const { authenticateUser } = require("../middleware/authentication");
const { authorizePermissions } = require("../middleware/authorization");
const {
  createOrder,
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  updateOrder,
  createPaymentIntent,
} = require("../controllers/order-controller");

router
  .route("/")
  .get(authenticateUser, authorizePermissions("admin"), getAllOrders)
  .post(authenticateUser, createOrder);

router.route("/my-orders").get(authenticateUser, getCurrentUserOrders);

router
  .route("/:orderId")
  .get(authenticateUser, getSingleOrder)
  .patch(authenticateUser, updateOrder);

router.route("/create-payment-intent").post(createPaymentIntent);

module.exports = router;
