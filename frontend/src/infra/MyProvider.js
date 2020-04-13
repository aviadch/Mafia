import React, { useState } from "react";
import { MyContext } from "./MyContext";
import { PHASE, SERVER_ADDRESS, SERVER_PORT } from "../shared_code/consts";
import Shortid from "shortid";
import axios from "axios";
import { createSocketAndListen } from "./socketUtils.js";

const MyProvider = (props) => {
  const [state, setState] = useState({
    phase: PHASE.WELCOME_SCREEN,
    currentRoom: "",
    isUserEnteredName: false,
    playerName: "",
    playerId: "",
    playerList: [],
    joinDate: "",
    roomCreationDate: "",
  });

  const onNewRoom = () => {
    console.log("onNewRoom Pressed");
    const playerId = Shortid.generate();
    const req = { creatorID: playerId };

    axios
      .post(`${SERVER_ADDRESS}:${SERVER_PORT}/room/create`, req)
      .then((res) => {
        const { roomID, creationDate, socketPort } = res.data;
        console.log(`roomID:${roomID}`);
        createSocketAndListen(socketPort, "NewPlayer", (data) => {
          setState({
            ...state,
            playerList: data.roomPlayers,
          });
        });
        setState({
          ...state,
          phase: PHASE.WAITING_ROOM,
          playerId: playerId,
          currentRoom: roomID,
          roomCreationDate: creationDate,
        });
        console.log(state);
      });

    console.log(state);
  };

  const joinRoom = (roomId) => {
    const playerId = Shortid.generate();
    setState({
      ...state,
      phase: PHASE.WAITING_ROOM,
      currentRoom: roomId,
      playerId: playerId,
    });
  };
  const onNameEntered = (name) => {
    axios
      .get(
        `${SERVER_ADDRESS}:${SERVER_PORT}/room/join?userID=${state.playerId}&roomID=${state.currentRoom}&playerName=${name}`
      )
      .then((res) => {
        const {
          joinDate,
          roomPlayers,
          error,
          errorMessage,
          socketPort,
        } = res.data;
        createSocketAndListen(socketPort, "NewPlayer", (data) => {
          this.setState({
            playerList: data.roomPlayers,
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
            playerList: [...roomPlayers],
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
          onNameEntered: onNameEntered,
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
