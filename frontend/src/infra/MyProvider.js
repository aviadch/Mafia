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
    currentRoomID: '',
    isUserEnteredName: false,
    roomPlayersList: [],
    joinDate: '',
    roomCreationDate: '',
    roomSocket: null,
    roomSocketPort: null,
  });

  const [playerName, setPlayerName] = useState('');
  const [playerId, setPlayerId] = useState('');

  let history = useHistory();

  const onRoomCreated = () => {
    history.push(`/${ROOM_ROUTES}`);
    setPlayerId(Shortid.generate());

    const req = { creatorID: playerId };

    axios
      .post(`${SERVER_ADDRESS}:${SERVER_PORT}/${ROOM_ROUTES}/create`, req)
      .then((res) => {
        const { roomID, creationDate, roomSocketPort } = res.data;
        const roomSocket = createRoomSocket(
          roomSocketPort,
          'PlayerJoinedRoom',
          (data) => {
            setState((prevState) => {
              return {
                ...prevState,
                roomPlayersList: data.roomPlayers,
              };
            });
          }
        );
        setState((prevState) => {
          return {
            ...prevState,
            roomSocketPort,
            roomSocket,
            currentRoomID: roomID,
            roomCreationDate: creationDate,
          };
        });

        console.log(state);
      })
      .catch((err) => {
        window.alert(`Server giving us something wrong! ${err}`);
      });

    console.log(state);
  };
  const joinExistingRoom = (roomId) => {
    setPlayerId(Shortid.generate());

    setState({
      ...state,
      currentRoomID: roomId,
    });
    history.push(`/${ROOM_ROUTES}`);
  };

  const onPlayerRegisterToRoom = (name) => {
    const joinReqParams = {
      params: {
        userID: playerId,
        roomID: state.currentRoomID,
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
          setPlayerName(name);
          setState({
            ...state,
            isUserEnteredName: true,
            joinDate: joinDate,
            roomPlayersList: [...roomPlayers],
            roomSocket,
            roomSocketPort,
          });
        }
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
        }}
      >
        {props.children}
      </MyContext.Provider>
    </div>
  );
};

export default MyProvider;
