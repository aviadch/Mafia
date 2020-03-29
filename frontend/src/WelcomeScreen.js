import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import "./WelcomeScreen.css";

class WelcomeScreen extends Component {
  render() {
    return (
      <div className="welcome-screen">
        <Typography variant="h1" component="h2">
          Hey - Welcome to Mafia Game
        </Typography>
        <div>
          <Button
            onClick={this.props.newGameHandler}
            variant="contained"
            color="primary"
          >
            Start a New Game
          </Button>
        </div>
        <div>
          <Button variant="contained" color="primary">
            Join an Existing Game by ID
          </Button>
        </div>
      </div>
    );
  }
}

export default WelcomeScreen;
