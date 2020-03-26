import React from "react";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import "./WelcomeMenu.css"

class WelcomeMenu extends React.Component {
  render() {
    return (
      <div className="welcome-menu">
        <Typography variant="h1" component="h2">Hey - Welcome to Mafia Game</Typography>
        <Button onClick={this.props.newGameHandler} variant="contained" color="primary">Start a New Game</Button>
        
        <Button variant="contained" color="primary">Join an Existing Game by ID</Button>
      </div>
    );
  }
}

export default WelcomeMenu;
