const express = require("express");
const router = express.Router();

const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");

const {
  getAllUsersNotAdmin,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require("../controllers/userController");

router
  .route("/")
  .get(authenticateUser, authorizePermissions, getAllUsersNotAdmin);

router.route("/showMe").get(showCurrentUser);

// must be below other GET requests with route "/<something>"
router.route("/:id").get(authenticateUser, getSingleUser);

router.route("/updateUser").patch(updateUser);

router.route("/updateUserPassword").patch(updateUserPassword);

module.exports = router;
