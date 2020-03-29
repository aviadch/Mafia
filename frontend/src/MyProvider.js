import React, { Component } from "react";
import { MyContext } from "./MyContext";
import { PHASE } from "./consts";

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
