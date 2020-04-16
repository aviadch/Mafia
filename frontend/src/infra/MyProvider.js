import React, { useReducer, useEffect } from 'react';
import { MyContext } from './MyContext';
import {
  SERVER_ADDRESS,
  SERVER_PORT,
  ROOM_ROUTES,
} from '../shared_code/consts';
import { verifySocketListen } from '../socketUtils';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import { playerReducer, playerInitialState } from './PlayerReducer';
import { roomInitialState, roomReducer } from './RoomReducer';

const MyProvider = (props) => {
  const [player, playerDispatch] = useReducer(
    playerReducer,
    playerInitialState
  );

  const [room, roomDispatch] = useReducer(roomReducer, roomInitialState);

  const updatePlayerList = (data) => {
    roomDispatch({
      type: 'updatePlayerList',
      data: {
        playersList: data.roomPlayersList,
      },
    });
  };

  useEffect(() => {
    if (room.socket) {
      verifySocketListen(room.socket, 'PlayerRegisteredRoom', updatePlayerList);
    }
  }, [room.socket]);

  let history = useHistory();

  const onRoomCreated = () => {
    history.push(`/${ROOM_ROUTES}`);
    playerDispatch({ type: 'generateUniqueID' });
    const req = { creatorID: player.id };
    axios
      .post(`${SERVER_ADDRESS}:${SERVER_PORT}/${ROOM_ROUTES}/create`, req)
      .then((res) => {
        roomDispatch({
          type: 'initRoom',
          data: {
            id: res.data.roomID,
            creationDate: res.data.creationDate,
            socketPort: res.data.roomSocketPort,
          },
        });
      })
      .catch((err) => {
        window.alert(`Server giving us something wrong! ${err}`);
      });
  };

  const joinExistingRoom = (roomId) => {
    playerDispatch({ type: 'generateUniqueID' });
    roomDispatch({ type: 'setRoomId', data: { id: roomId } });
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
          roomDispatch({
            type: 'initRoom',
            data: {
              creationDate: res.data.creationDate,
              playersList: res.data.roomPlayersList,
              socketPort: res.data.roomSocketPort,
            },
          });
        }
      });
  };

  return (
    <div>
      <MyContext.Provider
        value={{
          player,
          room,
          onRoomCreated: onRoomCreated,
          onPlayerRegisterToRoom: onPlayerRegisterToRoom,
          joinExistingRoom: joinExistingRoom,
        }}
      >
        {props.children}
      </MyContext.Provider>
    </div>
  );
};

export default MyProvider;
