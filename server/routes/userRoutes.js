const express = require("express");
const router = express.Router();

const { authenticateUser } = require("../middleware/authentication");
const { authorizePermissions } = require("../middleware/authorization");
const {
  getAllUsersNotAdmin,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require("../controllers/userController");

router
  .route("/")
  .get(authenticateUser, authorizePermissions("admin"), getAllUsersNotAdmin);

router.route("/showMe").get(authenticateUser, showCurrentUser);

// must be below other GET requests with route "/<something>"
router.route("/:id").get(authenticateUser, getSingleUser);

router.route("/updateUser").patch(updateUser);

router.route("/updateUserPassword").patch(authenticateUser, updateUserPassword);

module.exports = router;
