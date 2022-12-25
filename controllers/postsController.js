const db = require("../config/connect.js");
const moment = require("moment");

const getposts = (req, res) => {
  try {
    const postfilter = `SELECT p.*, idusers,userName,profilePic  FROM posts AS p JOIN users AS u ON (u.idusers = p.postUserId) LEFT JOIN relations AS r ON(p.postUserId = r.followedUserId) WHERE r.followerUserId = ? OR p.postUserId = ? ORDER BY p.createdAt DESC`;

    db.query(postfilter, [req.body.userId, req.body.userId], (err, data) => {
      if (err)
        return res.status(500).json({ message: `something wrong ${err}` });
      return res.status(200).json(data);
    });
  } catch (err) {
    res.status(500).json({ message: `something went wrong; ${err}` });
  }
};

const addposts = (req, res) => {
  try {
    const insertPost =
      "INSERT INTO posts (`postDesc`,`postImg`, `createdAt`, `postUserId`) values(?)";
    const { postDesc, postImg, userId } = req.body;
    const values = [
      postDesc,
      postImg,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userId,
    ];
    db.query(insertPost, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json({ message: "Post has been created." });
    });
  } catch (err) {
    res.status(500).json({ message: `something went wrong; ${err}` });
  }
};

module.exports = {
  getposts,
  addposts,
};
