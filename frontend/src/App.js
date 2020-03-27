import React from "react";
import WelcomeMenu from "./WelcomeMenu";
import WaitingRoom from "./WaitingRoom";

import MyProvider from "./MyContext.js"
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

  componentChoser = (phase) => {
    let retComp = null;
    switch (phase) {
      case PHASE.START:
        retComp = <WelcomeMenu />;
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
    return (
      <MyProvider>
      <div className="App">
        <p>Will be deleted</p>
        {curComp}
      </div>
      </MyProvider>
    );
  }
}

export default App;
