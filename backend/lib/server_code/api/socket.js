const socketIo = require("socket.io");
const http = require("http");

const { app } = require("../../../api_server");

const createNewSocket = async () => {
  const server = http.createServer(app);
  const socket = socketIo(server);
  let socketPort = null;

  const waitingForSocketSetUp = new Promise((resolve, reject) => {
    server.listen(0, () => {
      socketPort = server.address().port;
      console.log(`Socket Listening on port ${socketPort}`);
      resolve([socket, socketPort]);
    });
  });
  return await waitingForSocketSetUp;
};
//const SOCKET_PORT = process.env.PORT || 4001;

/*socket.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("event", (data) => {
    console.log("hey sap ", data);
  });
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});*/

module.exports = { createNewSocket };
