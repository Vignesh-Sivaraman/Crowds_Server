const db = require("../config/connect.js");
const moment = require("moment");

const addComment = (req, res) => {
  try {
    console.log(req.body);
    const { commentDesc, commentUserId, commentPostId } = req.body;
    const addPost =
      "INSERT INTO comments(`commentDesc`,`createdAt`,`commentUserId`,`commentPostId`) VALUES(?)";

    const values = [
      commentDesc,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      commentUserId,
      commentPostId,
    ];
    db.query(addPost, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Comment has been created.");
    });
  } catch (err) {
    res.status(500).json({ message: `something went wrong; ${err}` });
  }
};

module.exports = {
  addComment,
};
