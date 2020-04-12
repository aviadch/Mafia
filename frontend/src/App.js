import React from "react";

import WelcomeScreen from "./screens/WelcomeScreen";
import WaitingRoom from "./screens/WaitingRoom";
import { MyContext } from "./infra/MyContext";
import MyProvider from "./infra/MyProvider.js";
import { PHASE } from "./shared_code/consts.js";

const App = () => {
  const screenChooser = (phase) => {
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

  return (
    <MyProvider>
      <div className="App">
        <MyContext.Consumer>
          {(context) => {
            const screen = screenChooser(context.state.phase);
            return <>{screen}</>;
          }}
        </MyContext.Consumer>
      </div>
    </MyProvider>
  );
};

export default App;
