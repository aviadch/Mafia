import React, { Component } from "react";
import { MyContext } from "./MyContext";
import {PHASE} from "./consts"

class MyProvider extends Component {
  state = {
    phase: PHASE.WELCOME_SCREEN
  };

  onNewGame = () => {
    return this.setState({
      phase: PHASE.WAITING_ROOM
    });
  };

  render() {
    return (
      <MyContext.Provider
        value={{
          state: this.state,
          onNewGame: this.onNewGame
        }}
      >
        {this.props.children}
      </MyContext.Provider>
    );
  }
}

export default MyProvider;
