import React from "react";
import WelcomeMenu from "./WelcomeMenu";
import WaitingRoom from "./WaitingRoom";
import { MyContext } from "./MyContext";
import MyProvider from "./MyContext.js";

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
   
    return (
      <MyProvider>
        <div className="App">
          <MyContext.Consumer>
            {context => {
              const curComp = this.componentChoser(context.state.phase);
              return <React.Fragment>{curComp}</React.Fragment>;
            }}
          </MyContext.Consumer>
        </div>
      </MyProvider>
    );
  }
}

export default App;
