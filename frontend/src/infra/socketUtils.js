import { SERVER_ADDRESS } from '../shared_code/consts';
import socketIOClient from 'socket.io-client';
let socket = null;

export const createSocket = (socketPort) => {
  return socketIOClient(`${SERVER_ADDRESS}:${socketPort}`);
};

export const verifySocketListen = (socket, evnetStr, callback) => {
  if (!socket._callbacks[evnetStr]) {
    socket.on(evnetStr, callback);
  }
};

export const createSocketAndListen = (socketPort, event, callback) => {
  socket = socketIOClient(`${SERVER_ADDRESS}:${socketPort}`);
  socket.on(event, callback);
  return socket;
};
