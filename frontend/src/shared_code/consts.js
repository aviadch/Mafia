export const SERVER_ADDRESS = 'http://localhost';
export const SERVER_PORT = '8080';
export const ROOM_ROUTES = 'room';

export const PLAYER_ACTIONS = {
  generateUniqueID: { type: 'generateUniqueID' },
};

export const ROOM_ACTIONS = {
  initRoom: (id, creationDate, socketPort, playersList) => ({
    type: 'initRoom',
    data: {
      id,
      creationDate,
      socketPort,
      playersList,
    },
  }),
  updatePlayerList: (playersList) => ({
    type: 'updatePlayerList',
    data: {
      playersList,
    },
  }),
  setRoomID: (id) => ({
    type: 'setRoomId',
    data: { id },
  }),
};
