import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import EnterName from "./EnterName";
import WaitingPlayers from "./WaitingPlayers";
import Button from "@material-ui/core/Button";
import { MyContext } from "./MyContext.js";

const MOCK_playerList = ["Elisha", "Lahav", "Aviad"];
class WaitingRoom extends Component {
  constructor() {
    super();
    this.state = {
      isUserEntered: false,
      playerList: MOCK_playerList
    };
  }

  render() {
    return (
      <div className="waiting-room">
        <Typography variant="h1" component="h2" gutterBottom>
          Waiting Room
        </Typography>
        <MyContext.Consumer>
          {context => {
            console.log(context)
            if (!context.state.isUserEntered) {
              return (
                <>
                  <EnterName />
                </>
              );
            
            }
            else{
              return(<></>)
            }
          }}
        </MyContext.Consumer>
        <Button variant="contained" color="primary">
          Start the game
        </Button>
        <h2>game id</h2>

        <WaitingPlayers playerList={this.state.playerList} />
      </div>
    );
  }
}

export default WaitingRoom;
