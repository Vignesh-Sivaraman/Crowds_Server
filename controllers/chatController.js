const Chat = require("../models/ChatModel");

const createChat = async (req, res) => {
  try {
    const chat = await Chat.create({
      members: [req.body.senderId, req.body.receiverId],
    });

    res.status(200).json(chat);
  } catch (err) {
    res.status(500).json({ message: `something went wrong; ${err}` });
  }
};

const userChat = async (req, res) => {
  try {
    const chat = await Chat.find({ members: { $in: [req.body.userId] } });
    res.status(200).json(chat);
  } catch (err) {
    res.status(500).json({ message: `something went wrong; ${err}` });
  }
};

const findChat = async (req, res) => {
  try {
    const chat = await Chat.findOne({
      members: { $all: [req.body.firstId, req.body.secondId] },
    });
    res.status(200).json(chat);
  } catch (err) {
    res.status(500).json({ message: `something went wrong; ${err}` });
  }
};

module.exports = { createChat, userChat, findChat };
