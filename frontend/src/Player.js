import React, { Component } from "react";

class Player extends Component {
  render() {
    return (
      <span className="Player">
        <img
          src={require("./player1.jpg")}
          alt={this.props.name}
          height="200"
          width="200"
        />
      </span>
    );
  }
}

export default Player;
