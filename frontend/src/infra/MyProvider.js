import React, { useReducer, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import { MyContext } from './MyContext';
import {
  SERVER_ADDRESS,
  SERVER_PORT,
  ROOM_ROUTES,
  PLAYER_ACTIONS,
  ROOM_ACTIONS,
} from '../shared_code/consts';
import { verifySocketListen } from './socketUtils';

import { playerReducer, playerInitialState } from './PlayerReducer';
import { roomInitialState, roomReducer } from './RoomReducer';

const MyProvider = (props) => {
  const [player, playerDispatch] = useReducer(
    playerReducer,
    playerInitialState,
  );

  const [room, roomDispatch] = useReducer(roomReducer, roomInitialState);

  const updatePlayerList = (data) => {
    roomDispatch(ROOM_ACTIONS.updatePlayerList(data.roomPlayersList));
  };

  useEffect(() => {
    if (room.socket) {
      verifySocketListen(room.socket, 'PlayerRegisteredRoom', updatePlayerList);
    }
  }, [room.socket]);

  const history = useHistory();

  const onRoomCreated = () => {
    history.push(`/${ROOM_ROUTES}`);
    playerDispatch(PLAYER_ACTIONS.generateUniqueID);
    const req = { creatorID: player.id };
    axios
      .post(`${SERVER_ADDRESS}:${SERVER_PORT}/${ROOM_ROUTES}/create`, req)
      .then((res) => {
        roomDispatch(
          ROOM_ACTIONS.initRoom(
            res.data.roomID,
            res.data.creationDate,
            res.data.roomSocketPort,
            [],
          ),
        );
      })
      .catch((err) => {
        window.alert(`Server giving us something wrong! ${err}`);
      });
  };

  const joinExistingRoom = (roomId) => {
    playerDispatch(PLAYER_ACTIONS.generateUniqueID);
    roomDispatch(ROOM_ACTIONS.setRoomID(roomId));
    history.push(`/${ROOM_ROUTES}`);
  };

  const onPlayerRegisterToRoom = (name) => {
    playerDispatch({ type: 'registerToRoom', name });

    axios
      .get(`${SERVER_ADDRESS}:${SERVER_PORT}/${ROOM_ROUTES}/register`, {
        params: {
          playerID: player.id,
          playerName: name,
          roomID: room.id,
        },
      })
      .then((res) => {
        const { error, errorMessage } = res.data;
        if (error) {
          console.log(errorMessage);
        } else {
          roomDispatch(
            ROOM_ACTIONS.initRoom(
              room.id,
              res.data.creationDate,
              res.data.roomSocketPort,
              res.data.roomPlayersList,
            ),
          );
        }
      });
  };

  return (
    <div>
      <MyContext.Provider
        value={{
          player,
          room,
          onRoomCreated,
          onPlayerRegisterToRoom,
          joinExistingRoom,
        }}
      >
        {props.children}
      </MyContext.Provider>
    </div>
  );
};

export default MyProvider;
