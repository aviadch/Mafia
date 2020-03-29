import React, { Component } from "react";

import WelcomeScreen from "./WelcomeScreen";
import WaitingRoom from "./WaitingRoom";
import { MyContext } from "./MyContext";
import MyProvider from "./MyContext.js";
import { PHASE } from "./consts.js";

class App extends Component {
  componentChoser = phase => {
    let retComp = null;
    switch (phase) {
      case PHASE.WELCOME_SCREEN:
        retComp = <WelcomeScreen />;
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
    return (
      <MyProvider>
        <div className="App">
          <MyContext.Consumer>
            {context => {
              const curComp = this.componentChoser(context.state.phase);
              return <>{curComp}</>;
            }}
          </MyContext.Consumer>
        </div>
      </MyProvider>
    );
  }
}

export default App;
