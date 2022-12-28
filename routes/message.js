const express = require("express");
const authenticate = require("../config/authenticate");
const messageController = require("../controllers/messageController");
const router = express.Router();

router.route("/addmessage").post(authenticate, messageController.addMessage);
router.route("/getmessage").get(authenticate, messageController.getmessages);
