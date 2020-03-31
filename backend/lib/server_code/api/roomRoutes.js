const express = require("express");

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
  console.log(req.body);
  const { creatorID } = req.query;
  roomPlayers.push(creatorID);
  roomCreated = true;
  res.send({ roomID: 1, creatorID, creationDate: res.date });
});

roomRouter.get("/join", (req, res) => {
  const { userID, roomID } = req.query;
  if (Number(roomID) === 1 && roomCreated) {
    roomPlayers.push(userID);
    res.send({ joinDate: res.date, roomPlayers });
  } else {
    res.send({ error: true, errorMessage: `room ${roomID} does not exists` });
  }
});

module.exports = roomRouter;
