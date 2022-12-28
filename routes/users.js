const express = require("express");
const authenticate = require("../config/authenticate");
const router = express.Router();
const userController = require("../controllers/usersController");

router.route("/getuser").post(authenticate, userController.getUser);
router.route("/updateuser").post(authenticate, userController.updateUser);
router.route("/addrelation").post(authenticate, userController.addRelations);
router.route("/getrelation").post(authenticate, userController.getRelations);
router
  .route("/deleterelation")
  .post(authenticate, userController.deleteRelations);
router.route("/getfriends").post(authenticate, userController.getFriends);

module.exports = router;
