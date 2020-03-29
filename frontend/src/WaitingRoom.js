
import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import EnterName from "./EnterName";
import WaitingPlayers from "./WaitingPlayers";

const MOCK_playerList = ["Elisha", "Lahav", "Aviad"];
class WaitingRoom extends Component {
  constructor() {
    super();
    this.state = {
      isUserEntered: false,
      playerList: MOCK_playerList
    };
    this.onNameEnteredHandle = this.onNameEnteredHandle.bind(this);
  }

  onNameEnteredHandle(name) {
    this.setState(prevState => ({
        isUserEntered:true,
        playerList: [...prevState.playerList, name]
    }));
  }

  render() {
    return (
      <div className="waiting-room">
        <Typography variant="h1" component="h2" gutterBottom>
          Waiting Room
        </Typography>
        {this.state.isUserEntered ? null : (
          <EnterName handler={this.onNameEnteredHandle} />
        )}
        <button>Start the game</button>
        <h2>game id</h2>

        <WaitingPlayers playerList={this.state.playerList} />


      </div>
    );
  }
}

export default WaitingRoom;
