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
} = require("../controllers/user-controller");

router
  .route("/")
  .get(authenticateUser, authorizePermissions("admin"), getAllUsersNotAdmin);

router.route("/show-me").get(authenticateUser, showCurrentUser);

// must be below other GET requests with route "/<something>"
router.route("/:id").get(authenticateUser, getSingleUser);

router.route("/update-user").patch(authenticateUser, updateUser);

router
  .route("/update-user-password")
  .patch(authenticateUser, updateUserPassword);

module.exports = router;
