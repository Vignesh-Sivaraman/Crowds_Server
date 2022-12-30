const db = require("../config/connect.js");

const getLikes = (req, res) => {
  const getlikes = "SELECT likeUserId FROM likes WHERE likePostId = ? ";
  db.query(getlikes, [req.body.postId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data.map((like) => like.likeUserId));
  });
};

const addLike = (req, res) => {
  const addlike = "INSERT INTO likes (`likeUserId`,`likePostId`) VALUES(?)";
  const values = [req.body.likeUserId, req.body.likePostId];
  db.query(addlike, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Post has been liked.");
  });
};

const deleteLike = (req, res) => {
  const deletelike = `DELETE FROM likes WHERE likeUserId = ${req.body.likeUserId} AND likePostId = ${req.body.likePostId} `;
  //   const values = [req.body.likeUserId, req.body.likePostId];
  db.query(deletelike, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Post has been disliked.");
  });
};

module.exports = {
  getLikes,
  addLike,
  deleteLike,
};
