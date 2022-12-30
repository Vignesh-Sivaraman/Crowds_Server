const Message = require("../models/MessageModel");

const addMessage = async (req, res) => {
  try {
    const { chatId, senderId, text } = req.body;
    const message = await Message.create({
      chatId,
      senderId,
      text,
    });

    res.status(200).json(message);
  } catch (err) {
    res.status(500).json({ message: `something went wrong; ${err}` });
  }
};

const getmessages = async (req, res) => {
  try {
    const { chatId } = req.body;
    const message = await Message.find({ chatId });
    res.status(200).json(message);
  } catch (err) {
    res.status(500).json({ message: `something went wrong; ${err}` });
  }
};

module.exports = { addMessage, getmessages };
