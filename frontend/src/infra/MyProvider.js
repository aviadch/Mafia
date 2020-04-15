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
  const [playerName, setPlayerName] = useState('');
  const [playerId, setPlayerId] = useState('');
  const [currentRoomID, setcurrentRoomID] = useState('');
  const [roomPlayersList, setRoomPlayersList] = useState([]);
  const [joinDate, setJoinDate] = useState('');
  const [roomCreationDate, setRoomCreationDate] = useState('');
  const [isPlayerRegisteredToRoom, registerPlayer] = useState(false);
  const [roomSocketPort, setRoomSocketPort] = useState(null);
  const [roomSocket, setRoomSocket] = useState(null);

  let history = useHistory();

  const onRoomCreated = () => {
    history.push(`/${ROOM_ROUTES}`);
    setPlayerId(Shortid.generate());

    const req = { creatorID: playerId };

    axios
      .post(`${SERVER_ADDRESS}:${SERVER_PORT}/${ROOM_ROUTES}/create`, req)
      .then((res) => {
        setcurrentRoomID(res.data.roomID);
        setRoomCreationDate(res.data.creationDate);
        setRoomSocketPort(res.data.roomSocketPort);
        setRoomSocket(
          createRoomSocket(roomSocketPort, 'PlayerJoinedRoom', (data) => {
            setRoomPlayersList(data.roomPlayersList);
          })
        );
      })
      .catch((err) => {
        window.alert(`Server giving us something wrong! ${err}`);
      });
  };

  const joinExistingRoom = (roomId) => {
    setPlayerId(Shortid.generate());
    setcurrentRoomID(roomId);
    history.push(`/${ROOM_ROUTES}`);
  };

  const onPlayerRegisterToRoom = (name) => {
    registerPlayer(true);

    axios
      .get(`${SERVER_ADDRESS}:${SERVER_PORT}/${ROOM_ROUTES}/join`, {
        params: {
          userID: playerId,
          roomID: currentRoomID,
        },
      })
      .then((res) => {
        const { error, errorMessage } = res.data;
        if (error) {
          console.log(errorMessage);
        } else {
          setPlayerName(name);
          setRoomPlayersList(res.data.roomPlayersList);
          setJoinDate(res.data.joinDate);
          setRoomSocketPort(res.data.roomSocketPort);
          if (!roomSocket) {
            setRoomSocket(
              createRoomSocket(roomSocketPort, 'PlayerJoinedRoom', (data) => {
                setRoomPlayersList(data.roomPlayersList);
              })
            );
          }
        }
      });
  };

  return (
    <div>
      <MyContext.Provider
        value={{
          playerName,
          playerId,
          currentRoomID,
          roomPlayersList,
          joinDate,
          roomCreationDate,
          isPlayerRegisteredToRoom,
          roomSocket,
          roomSocketPort,
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
