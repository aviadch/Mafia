import React, { useState, useEffect } from "react";
import { MyContext } from "./MyContext";
import {
  PHASE,
  SERVER_ADDRESS,
  SERVER_PORT,
  ROOM_ROUTES,
} from "../shared_code/consts";
import Shortid from "shortid";
import axios from "axios";
import { createSocketAndListen as createRoomSocket } from "./socketUtils.js";

const MyProvider = (props) => {
  const [state, setState] = useState({
    phase: PHASE.WELCOME_SCREEN,
    currentRoom: "",
    isUserEnteredName: false,
    playerName: "",
    playerId: "",
    roomPlayersList: [],
    joinDate: "",
    roomCreationDate: "",
    roomSocket: null,
    roomSocketPort: null,
  });

  const onNewRoom = () => {
    console.log("onNewRoom Pressed");
    const playerId = Shortid.generate();
    setState({
      ...state,
      phase: PHASE.WAITING_ROOM,
      playerId,
    });
    const req = { creatorID: playerId };

    axios
      .post(`${SERVER_ADDRESS}:${SERVER_PORT}${ROOM_ROUTES}/create`, req)
      .then((res) => {
        console.log(res.data);
        const { roomID, creationDate, socketPort: roomSocketPort } = res.data;
        console.log(`roomID:${roomID}`);
        const roomSocket = createRoomSocket(
          roomSocketPort,
          "NewPlayer",
          (data) => {
            setState({
              ...state,
              phase: PHASE.WAITING_ROOM,
              roomPlayersList: data.roomPlayers,
            });
          }
        );
        setState({
          ...state,
          roomSocketPort,
          roomSocket,
          phase: PHASE.WAITING_ROOM,
          playerId: playerId,
          currentRoom: roomID,
          roomCreationDate: creationDate,
        });
      });

    console.log(state);
  };

  const joinRoom = (roomId) => {
    const playerId = Shortid.generate();

    setState({
      ...state,
      phase: PHASE.WAITING_ROOM,
      currentRoom: roomId,
      playerId,
    });
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
        console.log(res.data);
        const {
          joinDate,
          roomPlayers,
          error,
          errorMessage,
          socketPort: roomSocketPort,
        } = res.data;
        let roomSocket = null;
        console.log(this.state.roomSocketPort, this.state.roomSocket);
        if (!this.state.roomSocketPort) {
          console.log(`create new socket`);
          roomSocket = createRoomSocket(roomSocketPort, "NewPlayer", (data) => {
            setState({
              ...state,
              roomPlayersList: data.roomPlayers,
            });
          });
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
