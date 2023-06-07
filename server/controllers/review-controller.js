const Review = require("../models/Review");
const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { checkPermissions } = require("../utils");

const createReview = async (req, res) => {
  const { productId } = req.body;

  const product = await Product.findOne({ _id: productId });

  if (!product) {
    throw new CustomError.NotFoundError(`no product with id: ${productId}`);
  }

  const review = await Review.findOne({
    product: productId,
    user: req.user.userId,
  });

  if (review) {
    throw new CustomError.BadRequestError(
      "already submitted review for this product"
    );
  }

  req.body.userId = req.user.userId;
  const newReview = await Review.create(req.body);

  res.status(StatusCodes.CREATED).json({ review: newReview });
};

const getAllReviews = async (req, res) => {
  res.send("get all reviews");
};

const getSingleReview = async (req, res) => {
  res.send("get single review");
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
