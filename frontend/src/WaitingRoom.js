import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";

class WaitingRoom extends Component {
  render() {
    return (
      <div className="waiting-room">
        <Typography variant="h1" component="h2" gutterBottom>
          Waiting Room
        </Typography>
      </div>
    );
  }
}

export default WaitingRoom;
