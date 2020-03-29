import React, { Component } from "react";

import WelcomeScreen from "./WelcomeScreen";
import WaitingRoom from "./WaitingRoom";
import { MyContext } from "./MyContext";
import MyProvider from "./MyProvider.js";
import { PHASE } from "./consts.js";

class App extends Component {
  screenChooser = phase => {
    let screen = null;
    switch (phase) {
      case PHASE.WELCOME_SCREEN:
        screen = <WelcomeScreen />;
        break;

      case PHASE.WAITING_ROOM:
        screen = <WaitingRoom />;
        break;

      default:
        screen = null;
    }
    return screen;
  };

  render() {
    return (
      <MyProvider>
        <div className="App">
          <MyContext.Consumer>
            {context => {
              const screen = this.screenChooser(context.state.phase);
              return <>{screen}</>;
            }}
          </MyContext.Consumer>
        </div>
      </MyProvider>
    );
  }
}

export default App;
