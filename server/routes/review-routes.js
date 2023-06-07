const express = require("express");
const router = express.Router();

const { authenticateUser } = require("../middleware/authentication");
const {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
} = require("../controllers/review-controller");

router.route("/").get(getAllReviews).post(authenticateUser, createReview);

router
  .route("/:reviewId")
  .get(getSingleReview)
  .patch(authenticateUser, updateReview)
  .delete(authenticateUser, deleteReview);

module.exports = router;
