import React, { Component } from "react";
import { MyContext } from "./MyContext";
import { PHASE, SERVER_ADDRESS } from "../shared_code/consts";
import Shortid from "shortid";
import axios from "axios";

class MyProvider extends Component {
  state = {
    phase: PHASE.WELCOME_SCREEN,
    currentRoom: "",
    isUserEntered: false,
    playerName: "",
    playerId: "",
    playerList: [],
    roomCreationDate: ""
  };

  onNewGame = () => {
    const playerId = Shortid.generate();
    this.setState({
      phase: PHASE.WAITING_ROOM,
      playerId: playerId
    });
    const req = { creatorID: playerId };
    axios.post(SERVER_ADDRESS + "/room/create", req).then(res => {
      const { roomID, a, creationDate } = res.data;
      this.setState({
        currentRoom: roomID,
        roomCreationDate: creationDate
      });
      console.log("state has change to:", this.state);
    });
  };

  onNameEntered = name => {
    this.setState({
      isUserEntered: true,
      playerName: name,
      playerList: [...this.state.playerList, name]
    });
  };

  setName = name => {
    this.setState({
      playerName: name
    });
  };

  render() {
    return (
      <MyContext.Provider
        value={{
          state: this.state,
          onNewGame: this.onNewGame,
          onNameEntered: this.onNameEntered,
          setName: this.setName
        }}
      >
        {this.props.children}
      </MyContext.Provider>
    );
  }
}

export default MyProvider;
