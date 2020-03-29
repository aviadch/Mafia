import React, { Component } from "react";
import { MyContext } from "./MyContext";
import {PHASE} from "./consts"

class MyProvider extends Component {
  state = {
    phase: PHASE.WELCOME_SCREEN,
    isUserEntered: false,
    playerList: []
  };

  onNewGame = () => {
    return this.setState({
      phase: PHASE.WAITING_ROOM
    });
  };

  onNameEnteredHandle = (name) => {
    this.setState({
      isUserEntered: true,
      playerList: [...this.state.playerList, name]
    });
  }


  render() {
    return (
      <MyContext.Provider
        value={{
          state: this.state,
          onNewGame: this.onNewGame,
          onNameEnteredHandle:this.onNameEnteredHandle
        }}
      >
        {this.props.children}
      </MyContext.Provider>
    );
  }
}

export default MyProvider;
