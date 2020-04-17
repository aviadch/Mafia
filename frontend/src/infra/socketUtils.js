import socketIOClient from 'socket.io-client';
import { SERVER_ADDRESS } from '../shared_code/consts';

export const createSocket = (socketPort) =>
  socketIOClient(`${SERVER_ADDRESS}:${socketPort}`);

export const verifySocketListen = (socket, evnetStr, callback) => {
  if (!socket._callbacks[evnetStr]) {
    socket.on(evnetStr, callback);
  }
};
