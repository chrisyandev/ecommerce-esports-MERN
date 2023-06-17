const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "please provide product name"],
      maxlength: [100, "name cannot exceed 100 characters"],
    },
    price: {
      type: Number,
      required: [true, "please provide product price"],
    },
    description: {
      type: String,
      required: [true, "please provide product description"],
      maxlength: [1000, "description cannot exceed 1000 characters"],
    },
    image: {
      type: String,
      trim: true,
      default: "/uploads/placeholder.png",
    },
    category: {
      type: String,
      trim: true,
      required: [true, "please provide product category"],
      enum: {
        values: ["office", "kitchen", "bedroom"],
        message: "{VALUE} is not valid",
      },
    },
    company: {
      type: String,
      trim: true,
      required: [true, "please provide product company"],
      enum: ["ikea", "liddy", "marcos"],
    },
    colors: {
      type: [String],
      default: undefined,
      required: [true, "please provide product colors"],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    freeShipping: {
      type: Boolean,
      default: false,
    },
    stock: {
      type: Number,
      required: [true, "please provide product stock"],
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

ProductSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "productId",
  justOne: false,
});

ProductSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function () {
    await this.model("Review").deleteMany({ productId: this._id });
  }
);

module.exports = mongoose.model("Product", ProductSchema);
