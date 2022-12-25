const express = require("express");
const router = express.Router();
const postController = require("../controllers/postsController");
const authenticate = require("../config/authenticate");

router.route("/getposts").post(authenticate, postController.getposts);
router.route("/addposts").post(authenticate, postController.addposts);

module.exports = router;
