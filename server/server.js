// imports
require("dotenv").config();
require("express-async-errors");
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const fileUploader = require("express-fileupload");
const mongoSanitizer = require("express-mongo-sanitize");
const rateLimiter = require("express-rate-limit");
const xssCleaner = require("xss-clean");
const helmet = require("helmet");
const cors = require("cors");

// local imports
const noRouteHandler = require("./middleware/no-route-handler");
const errorHandler = require("./middleware/error-handler");
const authRouter = require("./routes/auth-routes");
const userRouter = require("./routes/user-routes");
const productRouter = require("./routes/product-routes");
const reviewRouter = require("./routes/review-routes");
const orderRouter = require("./routes/order-routes");
const connectToDB = require("./db/connect");

// express
const app = express();
app.set("trust proxy", 1);
const port = process.env.PORT || 5000;

// middleware
app.use(mongoSanitizer());
app.use(rateLimiter({ windowMs: 600000, max: 50 }));
app.use(xssCleaner());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      connectSrc: ["'self'", "https://checkout.stripe.com"],
      frameSrc: ["'self'", "https://checkout.stripe.com"],
      scriptSrc: ["'self'", "https://checkout.stripe.com"],
      imgSrc: ["'self'", "https://*.stripe.com"],
    },
  })
);
app.use(cors());
app.use(express.static("./public"));
app.use(express.json());
app.use(morgan("tiny"));
app.use(cookieParser(process.env.JWT_SECRET));
app.use(fileUploader());

// routes
app.get("/", (req, res) => {
  res.send("e-commerce api");
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
    await connectToDB(process.env.MONGO_URL, process.env.DB_NAME);
    app.listen(port, () => {
      console.log(`listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
