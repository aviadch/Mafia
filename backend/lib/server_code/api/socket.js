const socketIo = require("socket.io");
const http = require("http");
const { app } = require("../../../api_server");

const SOCKET_PORT = process.env.PORT || 4001;

const server = http.createServer(app);
const socket = socketIo(server);

socket.on("connection", socket => {
  console.log("New client connected");
  socket.on("event", data => {
    console.log("hey sap ", data);
  });
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});
server.listen(SOCKET_PORT, () =>
  console.log(`Socket Listening on port ${SOCKET_PORT}`)
);

module.exports = { socket };
