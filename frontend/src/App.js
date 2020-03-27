import React from "react";
import WelcomeMenu from "./WelcomeMenu";
import WaitingRoom from "./WaitingRoom";
const PHASE = {
  START: 0,
  WAITING_ROOM: 1,
  IN_GAME: 2
};
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      phase: PHASE.START
    };
  }

  onNewGame = () => {
    this.setState({ phase: PHASE.WAITING_ROOM });
  };

  componentChoser = () => {
    let retComp = null;
    switch (this.state.phase) {
      case PHASE.START:
        retComp = <WelcomeMenu newGameHandler={this.onNewGame} />;
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
    const curComp = this.componentChoser();
    return <div className="App">{curComp}</div>;
  }
}

export default App;
