const express = require("express");
const authenticate = require("../config/authenticate");
const chatController = require("../controllers/chatController");
const router = express.Router();

router.route("/createchat").post(authenticate, chatController.createChat);
router.route("/getchat").post(authenticate, chatController.getChat);
router.route("/findchat").post(authenticate, chatController.findChat);

module.exports = router;
