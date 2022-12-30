const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/mongoConnect");
const { Server } = require("socket.io");

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
app.use("/message", require("./routes/message"));

// port listen
const server = app.listen(process.env.PORT || 3005, () => {
  console.log("I am listening");
});

const io = new Server(server, {
  cors: {
    origin: true,
  },
});

let activeUsers = [];

io.on("connection", (socket) => {
  // add user
  socket.on("new-user-add", (newUserId) => {
    // if user is not added previously
    if (!activeUsers.some((user) => user.userId === newUserId)) {
      activeUsers.push({ userId: newUserId, socketId: socket.id });
      console.log("New User Connected", activeUsers);
    }
    // send all active users to new user
    io.emit("get-users", activeUsers);
  });

  // user disconnect
  socket.on("disconnect", () => {
    // remove user from active users
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    console.log("User Disconnected", activeUsers);
    // send all active users to all users
    io.emit("get-users", activeUsers);
  });

  // send message to specific user

  socket.on("send-message", (data) => {
    console.log(data, activeUsers);
    const { receiverId } = data;
    const user = activeUsers.find(
      (user) => user.userId.toString() === receiverId.toString()
    );
    console.log(user);
    console.log("Sending from socket to :", receiverId);
    console.log("Data: ", data);
    if (user) {
      io.to(user.socketId).emit("receive-message", data);
    }
  });
});
