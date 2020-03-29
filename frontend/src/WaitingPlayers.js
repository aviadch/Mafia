import React, { Component } from "react";
import Player from "./Player";
import { MyContext } from "./MyContext.js";

class WaitingPlayers extends Component {
  render() {
    
    return (
      <MyContext.Consumer>
        {context => {
          return (
            <div className="waiting-players">
              <h1>SB players</h1>
              {
              context.state.playerList.map(player => (<Player name={player} key={player} />))
              }
            </div>
          );
        }}
      </MyContext.Consumer>
    );
  }
}

export default WaitingPlayers;
