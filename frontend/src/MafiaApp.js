import React, { useContext } from "react";

import WelcomeScreen from "./screens/WelcomeScreen";
import WaitingRoom from "./screens/WaitingRoom";
import { MyContext } from "./infra/MyContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import { PHASE } from "./shared_code/consts.js";

const MafiaApp = () => {
  const context = useContext(MyContext);
  return (
    <div className="MafiaApp">
      <Switch>
        <Route path="/room" component={WaitingRoom}></Route>
        <Route path="/" component={WelcomeScreen}></Route>
      </Switch>
    </div>
  );
};

export default MafiaApp;
