const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentsController");

router.route("/addcomment").post(commentController.addComment);

module.exports = router;
