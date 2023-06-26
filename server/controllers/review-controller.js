const Review = require("../models/Review");
const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { checkPermissions } = require("../utils");

const createReview = async (req, res) => {
  const { productId } = req.body;
  const { user } = req;

  const product = await Product.findOne({ _id: productId });

  if (!product) {
    throw new CustomError.NotFoundError(`no product with id: ${productId}`);
  }

  const review = await Review.findOne({
    productId: productId,
    userId: user.id,
  });

  if (review) {
    throw new CustomError.BadRequestError(
      "already submitted review for this product"
    );
  }

  req.body.userId = user.id;
  const newReview = await Review.create(req.body);

  res.status(StatusCodes.CREATED).json({ review: newReview });
};

const getAllReviews = async (req, res) => {
  const reviews = await Review.find({})
    .populate({
      path: "productId",
      select: "name company price",
    })
    .populate({
      path: "userId",
      select: "name",
    });

  res.status(StatusCodes.OK).json({ reviews: reviews, count: reviews.length });
};

const getSingleReview = async (req, res) => {
  const { reviewId } = req.params;

  const review = await Review.findOne({ _id: reviewId })
    .populate({
      path: "productId",
      select: "name company price",
    })
    .populate({
      path: "userId",
      select: "name",
    });

  if (!review) {
    throw new CustomError.NotFoundError(`no review with id ${reviewId}`);
  }

  res.status(StatusCodes.OK).json({ review: review });
};

const updateReview = async (req, res) => {
  const { reviewId } = req.params;
  const { rating, title, comment } = req.body;

  const review = await Review.findOne({ _id: reviewId });

  if (!review) {
    throw new CustomError.NotFoundError(`no review with id ${reviewId}`);
  }

  checkPermissions(req.user, review.userId);

  review.rating = rating;
  review.title = title;
  review.comment = comment;
  await review.save();

  res.status(StatusCodes.OK).json({ review: review });
};

const deleteReview = async (req, res) => {
  const { reviewId } = req.params;

  const review = await Review.findOne({ _id: reviewId });

  if (!review) {
    throw new CustomError.NotFoundError(`no review with id ${reviewId}`);
  }

  checkPermissions(req.user, review.userId);
  await review.deleteOne();

  res.status(StatusCodes.OK).json({ msg: "review removed" });
};

module.exports = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
};
