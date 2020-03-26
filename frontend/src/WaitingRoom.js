import React from "react";
import EnterName from "./EnterName";

class WaitingRoom extends React.Component {
  constructor() {
    super();
    this.state = {
      isUserEntered: false
    };
    this.onNameEnteredHandle = this.onNameEnteredHandle.bind(this);
  }

  onNameEnteredHandle() {
    this.setState({ isUserEntered: true });
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
      </div>
    );
  }
}

export default WaitingRoom;
