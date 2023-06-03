const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middleware/authentication");
const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require("../controllers/userController");

router.route("/").get(
  (req, res, next) => {
    authenticateUser(req, res, next);
  },
  (req, res) => {
    getAllUsers(req, res);
  }
);

router.route("/showMe").get((req, res) => {
  showCurrentUser(req, res);
});

// must be below other GET requests with route "/<something>"
router.route("/:id").get(
  (req, res, next) => {
    authenticateUser(req, res, next);
  },
  (req, res) => {
    getSingleUser(req, res);
  }
);

router.route("/updateUser").patch((req, res) => {
  updateUser(req, res);
});

router.route("/updateUserPassword").patch((req, res) => {
  updateUserPassword(req, res);
});

module.exports = router;
