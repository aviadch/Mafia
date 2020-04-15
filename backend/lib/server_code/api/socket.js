const socketIo = require("socket.io");
const http = require("http");

const { app } = require("../../../api_server");

const createNewSocket = async () => {
  const server = http.createServer(app);
  const socket = socketIo(server);
  let socketPort = null;

  const socketSetUp = new Promise((resolve) => {
    server.listen(0, () => {
      socketPort = server.address().port;
      console.log(`Socket Listening on port ${socketPort}`);
      resolve([socket, socketPort]);
    });
  });

  return await socketSetUp;
};

module.exports = { createNewSocket };
