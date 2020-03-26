import React from "react";
class WelcomeMenu extends React.Component {
  render() {
    return (
      <div className="welcome-menu">
        <h1>Hey - Welcome to Mafia Game</h1>
        <button onClick={this.props.newGameHandler}>Start a New Game</button>
        <br/>
        <button>Join an Existing Game by ID</button>
      </div>
    );
  }
}

export default WelcomeMenu;
