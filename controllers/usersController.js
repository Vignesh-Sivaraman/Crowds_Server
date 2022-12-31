const db = require("../config/connect.js");

const getUser = (req, res) => {
  const getuser = "SELECT * FROM users WHERE idusers = ?";
  db.query(getuser, [req.body.userId], (err, data) => {
    if (err) return res.status(500).json(err);
    const { password, ...info } = data[0];
    return res.status(200).json(info);
  });
};

const updateUser = (req, res) => {
  const updateUser =
    "UPDATE users SET `userName` =?,`city` =?,`profilePic` =?,`coverPic` =? WHERE idusers =? ";
  db.query(
    updateUser,
    [
      req.body.name,
      req.body.city,
      req.body.profilePic,
      req.body.coverPic,
      req.body.userId,
    ],
    (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows > 0) {
        const getuser = "SELECT * FROM users WHERE idusers = ?";
        db.query(getuser, [req.body.userId], (err, data) => {
          if (err) return res.status(500).json(err);
          const { password, ...info } = data[0];
          return res.status(200).json(info);
        });
      }
    }
  );
};

const addRelations = (req, res) => {
  const addrelation =
    "INSERT INTO relations (`followerUserId`,`followedUserId`) VALUES (?)";
  const { followerId, followedId } = req.body;
  const values = [followerId, followedId];
  db.query(addrelation, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Following");
  });
};

const getRelations = (req, res) => {
  const getRelations =
    "SELECT followerUserId FROM relations WHERE followedUserId = ?";

  db.query(getRelations, [req.body.followedId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res
      .status(200)
      .json(data.map((relationship) => relationship.followerUserId));
  });
};

const deleteRelations = (req, res) => {
  const deleteRelations =
    "DELETE FROM relations WHERE `followerUserId` = ? AND `followedUserId` = ?";

  db.query(
    deleteRelations,
    [req.body.followerId, req.body.followedId],
    (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Unfollow");
    }
  );
};

const getFriends = (req, res) => {
  const getRelations =
    "SELECT idusers,userName,profilePic FROM relations as r JOIN users AS u ON (u.idusers = r.followedUserId) WHERE followerUserId = ?";

  db.query(getRelations, [req.body.followerId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

const getSuggestions = (req, res) => {
  const suggestions =
    "SELECT followedUserId FROM relations WHERE followerUserId = ?";
  db.query(suggestions, [req.body.followerId], (err, friendsdata) => {
    if (err) return res.status(500).json(err);
    friendsdata = friendsdata.map((e) => e.followedUserId);

    // return res.status(200).json(data);

    db.query(
      "SELECT idusers,userName,profilePic FROM users WHERE idusers != ?",
      [req.body.followerId],
      (err, userdata) => {
        if (err) return res.status(500).json(err);
        // return res.status(200).json(data);

        userdata = userdata.filter((id) => {
          return !friendsdata.includes(id.idusers);
        });
        return res.status(200).json(userdata);
      }
    );
  });
};

module.exports = {
  getUser,
  updateUser,
  addRelations,
  getRelations,
  deleteRelations,
  getFriends,
  getSuggestions,
};
