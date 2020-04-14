const express = require("express");
const { createNewSocket } = require("./socket.js");

const roomSockets = {};

let roomRouter = express.Router();

// Mockups
let roomCreated = false;
let roomPlayers = [];
const roomIDGenerator = () => {
  return "1";
};

// middleware that is specific to this router
roomRouter.use((req, res, next) => {
  res.date = Date.now();
  console.log("Time: ", Date.now());
  next();
});

roomRouter.post("/create", async (req, res) => {
  const { creatorID } = req.body;
  const roomID = roomIDGenerator();
  roomCreated = true;
  try {
    const [socket, socketPort] = await createNewSocket();
    console.log(`socket port got from function:${socketPort}`);
    roomSockets[roomID] = [socket, socketPort];
    res.send({
      roomID: roomID,
      creatorID,
      creationDate: res.date,
      socketPort: socketPort,
    });
  } catch (e) {
    console.log(`An error occured while getting socket: ${e}`);
  }
});

roomRouter.get("/join", (req, res) => {
  const { userID, roomID, playerName } = req.query;
  const playerToAdd = { id: userID, name: playerName };
  console.log(`roomID:${roomID}`);
  if (Number(roomID) === 1 && roomCreated) {
    roomPlayers.push(playerToAdd);
    const [roomSocket, roomSocketPort] = roomSockets[roomID];
    roomSocket.emit("NewPlayer", {
      message: "A new user has joined the room",
      roomPlayers,
    });
    res.send({ joinDate: res.date, roomPlayers, roomSocketPort });
  } else {
    res.send({ error: true, errorMessage: `room ${roomID} does not exists` });
  }
});

module.exports = roomRouter;
