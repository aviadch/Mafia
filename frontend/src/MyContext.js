import React from "react";
//import PHASE from "./App";
//import WaitingRoom from "./WaitingRoom";
//import WelcomeMenu from "./WelcomeMenu";
export const MyContext = React.createContext();

export const PHASE = {
  WELCOME_SCREEN: 0,
  WAITING_ROOM: 1,
  IN_GAME: 2
};

class MyProvider extends React.Component {
  state = {
    phase: PHASE.WELCOME_SCREEN
  };

  onNewGame = () => {
    return this.setState({
      phase: PHASE.WAITING_ROOM
    });
  };

  render() {
    return (
      <MyContext.Provider
        value={{
          state: this.state,
          onNewGame: this.onNewGame
        }}
      >
        {this.props.children}
      </MyContext.Provider>
    );
  }
}

export default MyProvider;
