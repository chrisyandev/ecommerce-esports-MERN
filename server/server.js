// imports
const express = require("express");
require("express-async-errors");
require("dotenv").config();
const noRouteHandler = require("./middleware/no-route-handler");
const errorHandler = require("./middleware/error-handler");
const morgan = require("morgan");

// express
const app = express();
const port = process.env.PORT || 5000;

//database
const connectDB = require("./db/connect");

// middleware
app.use(morgan("tiny"));
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send("e-commerce api");
});

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
