const db = require("../config/connect.js");
const moment = require("moment");

const addComment = (req, res) => {
  try {
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

const getComment = (req, res) => {
  try {
    const getComment =
      "SELECT c.*, idusers,userName, profilePic FROM comments AS c JOIN users AS u ON (u.idusers = c.commentUserId) WHERE c.commentPostId = ? ORDER BY c.createdAt DESC";

    db.query(getComment, [req.body.commentPostId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  } catch (err) {
    res.status(500).json({ message: `something went wrong; ${err}` });
  }
};

module.exports = {
  addComment,
  getComment,
};
