import React, { Component } from "react";
import Player from "./Player";

class WaitingPlayers extends Component {
  render() {
    let playerListComp = this.props.playerList.map(player => (
      <Player name={player} key={player} />
    ));
    return (
      <div className="waiting-players">
        <h1>waiting players</h1>
        {playerListComp}
      </div>
    );
  }
}

export default WaitingPlayers;
