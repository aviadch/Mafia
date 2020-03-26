import React from "react";
import Button from '@material-ui/core/Button';

class WelcomeMenu extends React.Component {
  render() {
    return (
      <div className="welcome-menu">
        <h1>Hey - Welcome to Mafia Game</h1>
        <Button onClick={this.props.newGameHandler} variant="contained">Start a New Game</Button>
        <br/>
        <Button variant="contained">Join an Existing Game by ID</Button>
      </div>
    );
  }
}

export default WelcomeMenu;
