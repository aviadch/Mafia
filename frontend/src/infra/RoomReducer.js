import { createSocket } from './socketUtils';

export const roomInitialState = {
  id: '',
  playersList: [],
  creationDate: '',
  socket: null,
  socketPort: null,
};

export const roomReducer = (room, action) => {
  switch (action.type) {
    case 'initRoom': {
      let socket = null;
      if (!room.socket) {
        socket = createSocket(action.data.socketPort);
      }
      return { ...room, ...action.data, socket };
    }
    case 'setSocket':
    case 'updatePlayerList':
    case 'setRoomId':
      return { ...room, ...action.data };

    default:
      throw new Error('unvalid action in room reducer');
  }
};
