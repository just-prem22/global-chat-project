const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(__dirname));

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("chat-message", (data) => {
    io.emit("chat-message", data);
  });

  socket.on("reaction", (data) => {
    io.emit("reaction", data);
  });
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
