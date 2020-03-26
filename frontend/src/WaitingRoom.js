import React from "react";
import EnterName from "./EnterName";
import WaitingPlayers from "./WaitingPlayers";

const MOCK_playerList = ["Elisha", "Lahav", "Aviad"];
class WaitingRoom extends React.Component {
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
        <h1>Waiting Room</h1>
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
