import axios from 'axios';
import {
  SERVER_ADDRESS,
  SERVER_PORT,
  ROOM_ROUTES,
  ROOM_ACTIONS,
} from './shared_code/consts';

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
    throw new Error(`Server giving us something wrong! ${err}`);
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
      throw new Error(errorMessage);
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
    throw new Error(`An error occured:${err}`);
  }
};
