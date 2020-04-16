import { SERVER_ADDRESS, SERVER_PORT, ROOM_ROUTES } from './shared_code/consts';
import axios from 'axios';

export const createRoomFromServer = async (roomDispatch, creatorID) => {
  const req = { creatorID };
  try {
    const res = await axios.post(
      `${SERVER_ADDRESS}:${SERVER_PORT}/${ROOM_ROUTES}/create`,
      req
    );
    roomDispatch({
      type: 'initRoom',
      data: {
        id: res.data.roomID,
        creationDate: res.data.creationDate,
        socketPort: res.data.roomSocketPort,
      },
    });
  } catch (err) {
    window.alert(`Server giving us something wrong! ${err}`);
  }
};
