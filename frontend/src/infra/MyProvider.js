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
import { createSocketAndListen as createRoomSocket } from "./socketUtils.js";

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
    roomSocket: null,
    roomSocketPort: null,
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
        const {
          roomID,
          a,
          creationDate,
          socketPort: roomSocketPort,
        } = res.data;
        const roomSocket = createRoomSocket(
          roomSocketPort,
          "NewPlayer",
          (data) => {
            this.setState({
              roomPlayersList: data.roomPlayers,
            });
          }
        );
        this.setState({
          roomSocketPort,
          roomSocket,
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
        console.log(res.data);
        const {
          joinDate,
          roomPlayers,
          error,
          errorMessage,
          roomSocketPort,
        } = res.data;
        let roomSocket = null;
        console.log(this.state.roomSocketPort, this.state.roomSocket);
        if (!this.state.roomSocketPort) {
          console.log(`create new socket`);
          roomSocket = createRoomSocket(roomSocketPort, "NewPlayer", (data) => {
            this.setState({
              roomPlayersList: data.roomPlayers,
            });
          });
        }
        if (error) {
          console.log(errorMessage);
        } else {
          this.setState({
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
