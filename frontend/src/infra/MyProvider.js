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
import Shortid from 'shortid';
import { playerReducer, playerInitialState } from './PlayerReducer';
import { roomInitialState, roomReducer } from './RoomReducer';
import { createRoomFromServer } from '../APIUtils';

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

  const generatePlayerId = () => {
    const id = Shortid.generate();
    playerDispatch({ type: 'setPlayerID', id });
    return id;
  };

  useEffect(() => {
    if (room.socket) {
      verifySocketListen(room.socket, 'PlayerRegisteredRoom', updatePlayerList);
    }
  }, [room.socket]);

  let history = useHistory();

  const onRoomCreated = async () => {
    history.push(`/${ROOM_ROUTES}`);
    const roomCreatorID = generatePlayerId();
    createRoomFromServer(roomDispatch, roomCreatorID);
  };

  const joinExistingRoom = (roomId) => {
    playerDispatch({ type: 'generateUniqueID' });
    roomDispatch({ type: 'setRoomId', data: { id: roomId } });
    history.push(`/${ROOM_ROUTES}`);
  };

  const onPlayerRegisterToRoom = async (name) => {
    playerDispatch({ type: 'registerToRoom', name });
    try {
      const res = await axios.get(
        `${SERVER_ADDRESS}:${SERVER_PORT}/${ROOM_ROUTES}/register`,
        {
          params: {
            playerID: player.id,
            playerName: name,
            roomID: room.id,
          },
        }
      );
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
    } catch (err) {
      console.log(`An error occured:${err}`);
    }
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
