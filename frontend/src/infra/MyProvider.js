import React, { useReducer, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { MyContext } from './MyContext';
import { verifySocketListen } from '../socketUtils';
import { playerReducer, playerInitialState } from './PlayerReducer';
import { roomInitialState, roomReducer } from './RoomReducer';
import { createRoom, registerToRoom } from '../APIUtils';
import Shortid from 'shortid';
import {
  ROOM_ROUTES,
  ROOM_ACTIONS,
  PLAYER_ACTIONS,
} from '../shared_code/consts';

const MyProvider = (props) => {
  const [player, playerDispatch] = useReducer(
    playerReducer,
    playerInitialState,
  );

  const [room, roomDispatch] = useReducer(roomReducer, roomInitialState);

  const updatePlayerList = (data) => {
    roomDispatch(ROOM_ACTIONS.updatePlayerList(data.roomPlayersList));
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
  const history = useHistory();
  const onRoomCreated = async () => {
    history.push(`/${ROOM_ROUTES}`);
    const roomCreatorID = generatePlayerId();
    createRoom(roomDispatch, roomCreatorID);
  };
  const joinExistingRoom = (roomId) => {
    playerDispatch(PLAYER_ACTIONS.generateUniqueID);
    roomDispatch(ROOM_ACTIONS.setRoomID(roomId));
    history.push(`/${ROOM_ROUTES}`);
  };

  const onPlayerRegisterToRoom = async (name) => {
    playerDispatch({ type: 'registerToRoom', name });
    registerToRoom(player.id, name, room.id, roomDispatch);
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
