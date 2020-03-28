import React, { Component } from "react";

import WelcomeScreen from "./WelcomeScreen";
import WaitingRoom from "./WaitingRoom";
const PHASE = {
  START: 0,
  WAITING_ROOM: 1,
  IN_GAME: 2
};
class App extends Component {
  constructor() {
    super();
    this.state = {
      phase: PHASE.START
    };
  }

  onNewGame = () => {
    this.setState({ phase: PHASE.WAITING_ROOM });
  };

  screenChoser = () => {
    let retComp = null;
    switch (this.state.phase) {
      case PHASE.START:
        retComp = <WelcomeScreen newGameHandler={this.onNewGame} />;
        break;

      case PHASE.WAITING_ROOM:
        retComp = <WaitingRoom />;
        break;

      default:
        retComp = null;
    }
    return retComp;
  };

  render() {
    const curComp = this.screenChoser();
    return <div className="App">{curComp}</div>;
  }
}

export default App;
