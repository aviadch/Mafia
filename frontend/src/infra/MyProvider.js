import React, { Component } from "react";
import { MyContext } from "./MyContext";
import { PHASE,SERVER_ADDRESS } from "../shared_code/consts";
import axios from "axios"


class MyProvider extends Component {
  state = {
    phase: PHASE.WELCOME_SCREEN,
    currentRoom: {},
    isUserEntered: false,
    playerName: "",
    playerList: []
  };

  onNewGame = () => {
    return this.setState({
      phase: PHASE.WAITING_ROOM
    });
  };

  onNameEnteredHandle = name => {
    axios.post(SERVER_ADDRESS+"/create",{message:"hi"})
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
          onNameEnteredHandle: this.onNameEnteredHandle,
          setName: this.setName
        }}
      >
        {this.props.children}
      </MyContext.Provider>
    );
  }
}

export default MyProvider;
