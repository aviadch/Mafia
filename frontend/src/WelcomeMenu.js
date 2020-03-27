import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import "./WelcomeMenu.css";
import { MyContext } from "./MyContext";

class WelcomeMenu extends React.Component {
  render() {
    return (
      <div className="welcome-menu">
        <Typography variant="h1" component="h2">
          Hey - Welcome to Mafia Game
        </Typography>

        <div className="buttonContainer">
          <MyContext.Consumer>
            {context => (
              <React.Fragment>
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
                  <Button variant="contained" color="primary">
                    Join an Existing Game by ID
                  </Button>
                </div>
              </React.Fragment>
            )}
          </MyContext.Consumer>
        </div>
      </div>
    );
  }
}

export default WelcomeMenu;
