const express = require('express');
const { createNewSocket: createNewRoomSocket } = require('./socket.js');

const roomsSockets = {};

let roomRouter = express.Router();

// Mockups
let roomCreated = false;
const roomPlayersList = [];
const roomIDGenerator = () => {
  return '1';
};

// middleware that is specific to this router
roomRouter.use((req, res, next) => {
  res.date = Date.now();
  console.log('Time: ', Date.now());
  next();
});

roomRouter.post('/create', async (req, res) => {
  const { creatorID } = req.body;
  const roomID = roomIDGenerator();
  roomCreated = true;
  try {
    const [roomSocket, roomSocketPort] = await createNewRoomSocket();
    console.log(`socket port got from function:${roomSocketPort}`);
    roomsSockets[roomID] = [roomSocket, roomSocketPort];
    res.send({
      roomID,
      creatorID,
      creationDate: res.date,
      roomSocketPort,
    });
  } catch (e) {
    console.log(`An error occured while getting socket: ${e}`);
  }
});

roomRouter.get('/register', (req, res) => {
  console.log(req.query);
  const { playerID, roomID, playerName } = req.query;
  const playerToAdd = { id: playerID, name: playerName };
  console.log(playerToAdd);
  console.log(`roomID:${roomID}`);
  if (Number(roomID) === 1 && roomCreated) {
    roomPlayersList.push(playerToAdd);
    const [roomSocket, roomSocketPort] = roomsSockets[roomID];
    roomSocket.emit('PlayerRegisteredRoom', {
      message: 'A new player has registered to the room',
      roomPlayersList,
    });
    res.send({ registerDate: res.date, roomPlayersList, roomSocketPort });
  } else {
    res.send({ error: true, errorMessage: `room ${roomID} does not exists` });
  }
});

module.exports = roomRouter;
