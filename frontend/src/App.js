import React from "react";
import WelcomeMenu from "./WelcomeMenu";
import WaitingRoom from "./WaitingRoom";
import { MyContext } from "./MyContext";
import MyProvider from "./MyContext.js";
import { PHASE } from "./MyContext.js";

class App extends React.Component {
  componentChoser = phase => {
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
              return <>{curComp}</>;
            }}
          </MyContext.Consumer>
        </div>
      </MyProvider>
    );
  }
}

export default App;
