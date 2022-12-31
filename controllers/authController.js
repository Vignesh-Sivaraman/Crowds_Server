const db = require("../config/connect.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = (req, res) => {
  try {
    // check for existing user
    const { name, email, password, city, profilePic, coverPic } = req.body;
    const checkUser = "SELECT * FROM users WHERE userName = ?";

    db.query(checkUser, [name], (err, data) => {
      if (err)
        return res.status(500).json({ message: `something wrong ${err}` });
      if (data.length)
        return res.status(409).json({ message: `user already exists` });

      // creating new user if not exists

      let salt = bcrypt.genSaltSync(Number(process.env.SALT));
      let hashedPassword = bcrypt.hashSync(password, salt);

      const createUser =
        "INSERT INTO users (`userName`, `email`, `password`,`city`, `profilePic`, `coverPic`) value(?)";

      const userValues = [
        name,
        email,
        hashedPassword,
        city,
        profilePic,
        coverPic,
      ];

      db.query(createUser, [userValues], (err, data) => {
        if (err)
          return res.status(500).json({ message: `something wrong ${err}` });
        return res.status(200).json({ message: "user added successfully" });
      });
    });
  } catch (err) {
    res.status(500).json({ message: `something went wrong; ${err}` });
  }
};

const login = (req, res) => {
  try {
    // const { email, password } = req.body;
    const checkUser = "SELECT * FROM users WHERE email = ?";

    db.query(checkUser, [req.body.email], (err, data) => {
      if (err)
        return res.status(500).json({ message: `something wrong ${err}` });
      if (data.length === 0)
        return res.status(409).json({ message: `User not found!` });

      const checkPassword = bcrypt.compareSync(
        req.body.password,
        data[0].password
      );

      if (!checkPassword)
        return res.status(400).json({ message: "Wrong Password" });

      const token = jwt.sign({ _id: data[0].email }, process.env.SECRET, {
        expiresIn: "30 days",
      });
      const { password, ...details } = data[0];

      return res.status(200).json({ details, token });
    });
  } catch (err) {
    res.status(500).json({ message: `something went wrong; ${err}` });
  }
};

module.exports = {
  register,
  login,
};
