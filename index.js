const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/mongoConnect");

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());

// Server check
connectDB();
// connect to mongodb

app.get("/", (req, res) => {
  res.json({ message: "Reporting for duty" });
});

// user route

app.use("/auth", require("./routes/auth"));
app.use("/posts", require("./routes/posts"));
app.use("/comments", require("./routes/comments"));
app.use("/likes", require("./routes/likes"));
app.use("/users", require("./routes/users"));
app.use("/chat", require("./routes/chat"));

// port listen
app.listen(process.env.PORT || 3005, () => {
  console.log("I am listening");
});
