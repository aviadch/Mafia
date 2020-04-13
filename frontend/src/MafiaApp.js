import React, { useContext } from "react";

import WelcomeScreen from "./screens/WelcomeScreen";
import WaitingRoom from "./screens/WaitingRoom";
import { MyContext } from "./infra/MyContext";
import { PHASE } from "./shared_code/consts.js";

const MafiaApp = () => {
  const context = useContext(MyContext);
  const screenChooser = (phase) => {
    let screen = null;
    switch (phase) {
      case PHASE.WELCOME_SCREEN:
        console.log(phase);
        screen = <WelcomeScreen />;
        break;

      case PHASE.WAITING_ROOM:
        console.log(phase);
        screen = <WaitingRoom />;
        break;

      default:
        screen = null;
    }
    return screen;
  };

  let screen = screenChooser(context.state.phase);
  return <>{screen}</>;
};

export default MafiaApp;
