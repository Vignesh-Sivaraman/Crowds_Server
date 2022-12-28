const express = require("express");
const authenticate = require("../config/authenticate");
const router = express.Router();
const likeController = require("../controllers/likesController");

router.route("/addlike").post(authenticate, likeController.addLike);
router.route("/getlike").post(authenticate, likeController.getLikes);
router.route("/deletelike").post(authenticate, likeController.deleteLike);

module.exports = router;
