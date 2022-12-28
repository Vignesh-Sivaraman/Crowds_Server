const express = require("express");
const authenticate = require("../config/authenticate");
const router = express.Router();
const commentController = require("../controllers/commentsController");

router.route("/addcomment").post(authenticate, commentController.addComment);
router.route("/getcomment").post(authenticate, commentController.getComment);
module.exports = router;
