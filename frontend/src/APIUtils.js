import {
  SERVER_ADDRESS,
  SERVER_PORT,
  ROOM_ROUTES,
  ROOM_ACTIONS,
} from './shared_code/consts';
import axios from 'axios';

export const createRoom = async (roomDispatch, creatorID) => {
  const req = { creatorID };
  try {
    const res = await axios.post(
      `${SERVER_ADDRESS}:${SERVER_PORT}/${ROOM_ROUTES}/create`,
      req,
    );
    roomDispatch(
      ROOM_ACTIONS.initRoom(
        res.data.roomID,
        res.data.creationDate,
        res.data.roomSocketPort,
        [],
      ),
    );
  } catch (err) {
    window.alert(`Server giving us something wrong! ${err}`);
  }
};

export const registerToRoom = async (
  playerID,
  playerName,
  roomID,
  roomDispatch,
) => {
  try {
    const res = await axios.get(
      `${SERVER_ADDRESS}:${SERVER_PORT}/${ROOM_ROUTES}/register`,
      {
        params: {
          playerID,
          playerName,
          roomID,
        },
      },
    );
    const { error, errorMessage } = res.data;
    if (error) {
      console.log(errorMessage);
    } else {
      roomDispatch(
        ROOM_ACTIONS.initRoom(
          roomID,
          res.data.creationDate,
          res.data.roomSocketPort,
          res.data.roomPlayersList,
        ),
      );
    }
  } catch (err) {
    console.log(`An error occured:${err}`);
  }
};
