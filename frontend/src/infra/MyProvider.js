import React, { Component } from "react";
import { MyContext } from "./MyContext";
import {
  PHASE,
  SERVER_ADDRESS,
  SERVER_PORT,
  ROOM_ROUTES,
} from "../shared_code/consts";
import Shortid from "shortid";
import axios from "axios";
import { createSocketAndListen } from "./socketUtils.js";

class MyProvider extends Component {
  constructor() {
    super();
  }

  state = {
    phase: PHASE.WELCOME_SCREEN,
    currentRoom: "",
    isUserEnteredName: false,
    playerName: "",
    playerId: "",
    roomPlayersList: [],
    joinDate: "",
    roomCreationDate: "",
  };

  onNewGame = () => {
    const playerId = Shortid.generate();
    this.setState({
      phase: PHASE.WAITING_ROOM,
      playerId,
    });
    const req = { creatorID: playerId };
    axios
      .post(`${SERVER_ADDRESS}:${SERVER_PORT}${ROOM_ROUTES}/create`, req)
      .then((res) => {
        console.log(res.data);
        const { roomID, a, creationDate, socketPort } = res.data;
        createSocketAndListen(socketPort, "NewPlayer", (data) => {
          this.setState({
            roomPlayersList: data.roomPlayers,
          });
        });
        this.setState({
          currentRoom: roomID,
          roomCreationDate: creationDate,
        });
      });
  };
  joinGame = (roomId) => {
    const playerId = Shortid.generate();
    this.setState({
      phase: PHASE.WAITING_ROOM,
      currentRoom: roomId,
      playerId,
    });
  };

  onPlayerRegisterToRoom = (name) => {
    const joinReqParams = {
      params: {
        userID: this.state.playerId,
        roomID: this.state.currentRoom,
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
          this.setState({
            roomPlayersList: data.roomPlayers,
          });
        });
        if (error) {
          console.log(errorMessage);
        } else {
          this.setState({
            isUserEnteredName: true,
            playerName: name,
            joinDate: joinDate,
            roomPlayersList: [...roomPlayers],
          });
        }
      });
  };

  setName = (name) => {
    this.setState({
      playerName: name,
    });
  };

  render() {
    return (
      <MyContext.Provider
        value={{
          state: this.state,
          onNewGame: this.onNewGame,
          onPlayerRegisterToRoom: this.onPlayerRegisterToRoom,
          joinGame: this.joinGame,
          setName: this.setName,
        }}
      >
        {this.props.children}
      </MyContext.Provider>
    );
  }
}

export default MyProvider;
