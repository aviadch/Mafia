import { SERVER_ADDRESS } from "../shared_code/consts";
import socketIOClient from "socket.io-client";
let socket = null;
export const createSocketAndListen = (socketPort, event, callback) => {
  socket = socketIOClient(`${SERVER_ADDRESS}:${socketPort}`);
  socket.on(event, callback);
};
