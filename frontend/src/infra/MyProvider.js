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
    isUserRegisteredToRoom: false,
    roomCreationDate: '',
    roomSocket: null,
    roomSocketPort: null,
  });

  const [playerName, setPlayerName] = useState('');
  const [playerId, setPlayerId] = useState('');
  const [currentRoomID, setcurrentRoomID] = useState('');
  const [roomPlayersList, setRoomPlayersList] = useState([]);
  const [joinDate, setJoinDate] = useState('');
  const [roomCreationDate, setRoomCreationDate] = useState('');

  let history = useHistory();

  const onRoomCreated = () => {
    history.push(`/${ROOM_ROUTES}`);
    setPlayerId(Shortid.generate());

    const req = { creatorID: playerId };

    axios
      .post(`${SERVER_ADDRESS}:${SERVER_PORT}/${ROOM_ROUTES}/create`, req)
      .then((res) => {
        const { roomSocketPort } = res.data;
        const roomSocket = createRoomSocket(
          roomSocketPort,
          'PlayerJoinedRoom',
          (data) => {
            setRoomPlayersList(data.roomPlayersList);
          }
        );
        setcurrentRoomID(res.data.roomID);
        setRoomCreationDate(res.data.creationDate);
        setState((prevState) => {
          return {
            ...prevState,
            roomSocketPort,
            roomSocket,
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
    setcurrentRoomID(roomId);
    history.push(`/${ROOM_ROUTES}`);
  };

  const onPlayerRegisterToRoom = (name) => {
    const joinReqParams = {
      params: {
        userID: playerId,
        roomID: currentRoomID,
      },
    };
    axios
      .get(
        `${SERVER_ADDRESS}:${SERVER_PORT}/${ROOM_ROUTES}/join`,
        joinReqParams
      )
      .then((res) => {
        const { error, errorMessage, roomSocketPort } = res.data;
        let roomSocket = null;
        if (!state.roomSocketPort) {
          roomSocket = createRoomSocket(
            roomSocketPort,
            'PlayerJoinedRoom',
            (data) => {
              setRoomPlayersList(data.roomPlayersList);
            }
          );
        }
        if (error) {
          console.log(errorMessage);
        } else {
          setPlayerName(name);
          setRoomPlayersList(res.data.roomPlayersList);
          setJoinDate(res.data.joinDate);
          setState({
            ...state,
            isUserRegisteredToRoom: true,
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
          playerName,
          playerId,
          currentRoomID,
          roomPlayersList,
          joinDate,
          roomCreationDate,
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
