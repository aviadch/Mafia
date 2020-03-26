import React from "react";
import WelcomeMenu from "./WelcomeMenu";
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

  render() {
    return (
      <div className="App">
        <WelcomeMenu />
      </div>
    );
  }
}

export default App;
