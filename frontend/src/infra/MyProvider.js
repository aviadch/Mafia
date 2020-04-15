import React, { useState } from 'react';
import { MyContext } from './MyContext';
import {
  SERVER_ADDRESS,
  SERVER_PORT,
  ROOM_ROUTES,
} from '../shared_code/consts';
import Shortid from 'shortid';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { createSocketAndListen as createRoomSocket } from './socketUtils.js';

const MyProvider = (props) => {
  const [state, setState] = useState({
    currentRoom: '',
    isUserEnteredName: false,
    playerName: '',
    playerId: '',
    roomPlayersList: [],
    joinDate: '',
    roomCreationDate: '',
    roomSocket: null,
    roomSocketPort: null,
  });
  let history = useHistory();

  const onRoomCreated = () => {
    history.push(`/${ROOM_ROUTES}`);
    const playerId = Shortid.generate();
    setState({
      ...state,
      playerId,
    });
    const req = { creatorID: playerId };

    axios
      .post(`${SERVER_ADDRESS}:${SERVER_PORT}/${ROOM_ROUTES}/create`, req)
      .then((res) => {
        const { roomID, creationDate, roomSocketPort } = res.data;
        const roomSocket = createRoomSocket(
          roomSocketPort,
          'PlayerJoinedRoom',
          (data) => {
            setState({
              ...state,
              roomPlayersList: data.roomPlayers,
            });
          }
        );
        setState({
          ...state,
          roomSocketPort,
          roomSocket,
          playerId: playerId,
          currentRoom: roomID,
          roomCreationDate: creationDate,
        });

        console.log(state);
      })
      .catch((err) => {
        window.alert(`Server giving us something wrong! ${err}`);
      });

    console.log(state);
  };
  const joinExistingRoom = (roomId) => {
    const playerId = Shortid.generate();

    setState({
      ...state,
      currentRoom: roomId,
      playerId,
    });
    history.push(`/${ROOM_ROUTES}`);
  };

  const onPlayerRegisterToRoom = (name) => {
    const joinReqParams = {
      params: {
        userID: state.playerId,
        roomID: state.currentRoom,
      },
    };
    axios
      .get(
        `${SERVER_ADDRESS}:${SERVER_PORT}/${ROOM_ROUTES}/join`,
        joinReqParams
      )
      .then((res) => {
        const {
          joinDate,
          roomPlayers,
          error,
          errorMessage,
          roomSocketPort,
        } = res.data;
        let roomSocket = null;
        if (!state.roomSocketPort) {
          roomSocket = createRoomSocket(
            roomSocketPort,
            'PlayerJoinedRoom',
            (data) => {
              setState({
                ...state,
                roomPlayersList: data.roomPlayers,
              });
            }
          );
        }
        if (error) {
          console.log(errorMessage);
        } else {
          setState({
            ...state,
            isUserEnteredName: true,
            playerName: name,
            joinDate: joinDate,
            roomPlayersList: [...roomPlayers],
            roomSocket,
            roomSocketPort,
          });
        }
      });
  };

  const setName = (name) => {
    setState({
      ...state,
      playerName: name,
    });
  };

  return (
    <div>
      <MyContext.Provider
        value={{
          state: state,
          onRoomCreated: onRoomCreated,
          onPlayerRegisterToRoom: onPlayerRegisterToRoom,
          joinExistingRoom: joinExistingRoom,
          setName: setName,
        }}
      >
        {props.children}
      </MyContext.Provider>
    </div>
  );
};

export default MyProvider;
