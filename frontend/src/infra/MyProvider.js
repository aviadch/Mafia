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
    joinDate: "",
    roomCreationDate: "",
  };

  onNewGame = () => {
    const playerId = Shortid.generate();
    this.setState({
      phase: PHASE.WAITING_ROOM,
      playerId: playerId,
    });
    const req = { creatorID: playerId };
    axios.post(`${SERVER_ADDRESS}/room/create`, req).then((res) => {
      const { roomID, a, creationDate } = res.data;
      this.setState({
        currentRoom: roomID,
        roomCreationDate: creationDate,
      });
    });
  };

  onNameEntered = (name) => {
    axios
      .get(
        `${SERVER_ADDRESS}/room/join?userID=${this.state.playerId}&roomID=${this.state.currentRoom}`
      )
      .then((res) => {
        const { joinDate, roomPlayers, error, errorMessage } = res.data;
        if (error) {
          console.log(errorMessage);
        } else {
          this.setState({
            isUserEntered: true,
            playerName: name,
            joinDate: joinDate,
            playerList: [...roomPlayers],
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
          onNameEntered: this.onNameEntered,
          setName: this.setName,
        }}
      >
        {this.props.children}
      </MyContext.Provider>
    );
  }
}

export default MyProvider;
