import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import "./WelcomeScreen.css";
import { MyContext } from "../infra/MyContext";
import TextField from "@material-ui/core/TextField";

class WelcomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      roomToJoin: ""
    };
  }
  onChange = event => {
    const value = event.target.value;
    console.log(this.state.roomToJoin);
    this.setState({ roomToJoin: value });
  };
  render() {
    return (
      <div className="welcome-screen">
        <Typography variant="h1" component="h2">
          Hey - Welcome to Mafia Game
        </Typography>

        <div className="buttonContainer">
          <MyContext.Consumer>
            {context => (
              <>
                <div>
                  <Button
                    onClick={context.onNewGame}
                    variant="contained"
                    color="primary"
                  >
                    Start a New Game
                  </Button>
                </div>
                <div>
                  <TextField
                    onChange={this.onChange}
                    id="standard-basic"
                    label="RoomId"
                  />
                  <Button
                    onClick={() => context.joinGame(this.state.roomToJoin)}
                    variant="contained"
                    color="primary"
                  >
                    Join Game
                  </Button>
                </div>
              </>
            )}
          </MyContext.Consumer>
        </div>
      </div>
    );
  }
}

export default WelcomeScreen;
