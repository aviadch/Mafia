const express = require("express");
const { socket } = require("./socket.js");

let roomRouter = express.Router();

// Mockups
let roomCreated = false;
let roomPlayers = [];

// middleware that is specific to this router
roomRouter.use((req, res, next) => {
  res.date = Date.now();
  console.log("Time: ", Date.now());
  next();
});

roomRouter.post("/create", (req, res) => {
  const { creatorID } = req.body;
  roomCreated = true;
  res.send({ roomID: 1, creatorID, creationDate: res.date });
});

roomRouter.get("/join", (req, res) => {
  const { userID, roomID, playerName } = req.query;
  const playerToAdd = { id: userID, name: playerName };
  console.log(`roomID:${roomID}`);
  if (Number(roomID) === 1 && roomCreated) {
    roomPlayers.push(playerToAdd);
    socket.emit("NewPlayer", {
      message: "A new user has joined the room",
      roomPlayers,
    });
    res.send({ joinDate: res.date, roomPlayers });
  } else {
    res.send({ error: true, errorMessage: `room ${roomID} does not exists` });
  }
});

module.exports = roomRouter;
