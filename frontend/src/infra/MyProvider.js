import React, { useState } from "react";
import { MyContext } from "./MyContext";
import {
  SERVER_ADDRESS,
  SERVER_PORT,
  ROOM_ROUTES,
} from "../shared_code/consts";
import Shortid from "shortid";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { createSocketAndListen } from "./socketUtils.js";

const MyProvider = (props) => {
  const [state, setState] = useState({
    currentRoom: "",
    isUserEnteredName: false,
    playerName: "",
    playerId: "",
    roomPlayersList: [],
    joinDate: "",
    roomCreationDate: "",
  });
  let history = useHistory();

  const onNewRoom = () => {
    console.log("onNewRoom Pressed");
    history.push("/room");
    const playerId = Shortid.generate();
    setState({
      ...state,
      playerId,
    });
    const req = { creatorID: playerId };

    axios
      .post(`${SERVER_ADDRESS}:${SERVER_PORT}${ROOM_ROUTES}/create`, req)
      .then((res) => {
        const { roomID, creationDate, socketPort } = res.data;
        console.log(`roomID:${roomID}`);
        createSocketAndListen(socketPort, "NewPlayer", (data) => {
          setState({
            ...state,
            roomPlayersList: data.roomPlayers,
          });
        });

        setState({
          ...state,
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

  const joinRoom = (roomId) => {
    const playerId = Shortid.generate();

    setState({
      ...state,
      currentRoom: roomId,
      playerId,
    });
    history.push("/room");
  };
  const onPlayerRegisterToRoom = (name) => {
    const joinReqParams = {
      params: {
        userID: state.playerId,
        roomID: state.currentRoom,
      },
    };
    axios
      .get(`${SERVER_ADDRESS}:${SERVER_PORT}${ROOM_ROUTES}/join`, joinReqParams)
      .then((res) => {
        const {
          joinDate,
          roomPlayers,
          error,
          errorMessage,
          socketPort,
        } = res.data;
        createSocketAndListen(socketPort, "NewPlayer", (data) => {
          setState({
            ...state,
            roomPlayersList: data.roomPlayers,
          });
        });
        if (error) {
          console.log(errorMessage);
        } else {
          setState({
            ...state,
            isUserEnteredName: true,
            playerName: name,
            joinDate: joinDate,
            roomPlayersList: [...roomPlayers],
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
          onNewRoom: onNewRoom,
          onPlayerRegisterToRoom: onPlayerRegisterToRoom,
          joinRoom: joinRoom,
          setName: setName,
        }}
      >
        {props.children}
      </MyContext.Provider>
    </div>
  );
};

export default MyProvider;
