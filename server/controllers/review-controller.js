const Review = require("../models/Review");
const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { checkPermissions } = require("../utils");

const createReview = async (req, res) => {
  const { productId } = req.body;
  const { userId } = req.user;

  const product = await Product.findOne({ _id: productId });

  if (!product) {
    throw new CustomError.NotFoundError(`no product with id: ${productId}`);
  }

  const review = await Review.findOne({
    productId: productId,
    userId: userId,
  });

  if (review) {
    throw new CustomError.BadRequestError(
      "already submitted review for this product"
    );
  }

  req.body.userId = userId;
  const newReview = await Review.create(req.body);

  res.status(StatusCodes.CREATED).json({ review: newReview });
};

const getAllReviews = async (req, res) => {
  const reviews = await Review.find({});

  res.status(StatusCodes.OK).json({ reviews: reviews, count: reviews.length });
};

const getSingleReview = async (req, res) => {
  const { reviewId } = req.params;
  const review = await Review.findOne({ _id: reviewId });

  if (!review) {
    throw new CustomError.NotFoundError(`no review with id ${reviewId}`);
  }

  res.status(StatusCodes.OK).json({ review });
};

const updateReview = async (req, res) => {
  res.send("update review");
};

const deleteReview = async (req, res) => {
  res.send("delete review");
};

module.exports = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
};
