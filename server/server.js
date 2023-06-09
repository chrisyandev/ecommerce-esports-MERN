// imports
require("dotenv").config();
require("express-async-errors");
const express = require("express");
const noRouteHandler = require("./middleware/no-route-handler");
const errorHandler = require("./middleware/error-handler");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const authRouter = require("./routes/auth-routes");
const userRouter = require("./routes/user-routes");
const productRouter = require("./routes/product-routes");
const reviewRouter = require("./routes/review-routes");
const orderRouter = require("./routes/order-routes");

// express
const app = express();
const port = process.env.PORT || 5000;

//database
const connectDB = require("./db/connect");

// middleware
app.use(express.static("./public/"));
app.use(express.json());
app.use(morgan("tiny"));
app.use(cookieParser(process.env.JWT_SECRET));
app.use(fileUpload());

// routes
app.get("/", (req, res) => {
  res.send("e-commerce api");
});
app.get("/api/v1", (req, res) => {
  console.log(req.signedCookies);
  res.send("cookie test");
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/orders", orderRouter);

// error middleware
app.use(noRouteHandler);
app.use(errorHandler);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
