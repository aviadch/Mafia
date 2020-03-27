import React from "react";
import PHASE from "./App";
import WaitingRoom from "./WaitingRoom"
import WelcomeMenu from "./WelcomeMenu"
export const MyContext = React.createContext();

class MyProvider extends React.Component {
  state = {
    phase: PHASE.START
  };

  componentChoser = () => {
    let retComp = null;
    switch (this.state.phase) {
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
      <MyContext.Provider
        value={{
          state: this.state,
          onNewGame: () =>
            this.setState({
              phase: PHASE.WAITING_ROOM
            })
        }}
      >
        {this.props.children}
      </MyContext.Provider>
    );
  }
}

export default MyProvider;
