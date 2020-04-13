import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import InputName from "../components/InputName";
import WaitingPlayers from "../components/WaitingPlayers";
import Button from "@material-ui/core/Button";
import { MyContext } from "../infra/MyContext.js";

const MOCK_playerList = ["Elisha", "Lahav", "Aviad"];
class WaitingRoom extends Component {
  constructor() {
    super();
    this.state = {
      isUserEntered: false,
      playerList: MOCK_playerList,
    };
  }

  render() {
    return (
      <div className="waiting-room">
        <MyContext.Consumer>
          {(context) => {
            return (
              <div>
                <Typography variant="h1" component="h2" gutterBottom>
                  Waiting Room - RoomId: {context.state.currentRoom}
                </Typography>
                {!context.state.isUserEnteredName ? (
                  <>
                    <InputName />
                  </>
                ) : (
                  <></>
                )}

                <Button variant="contained" color="primary">
                  Start
                </Button>
                <h2>game id</h2>

                <WaitingPlayers />
              </div>
            );
          }}
        </MyContext.Consumer>
      </div>
    );
  }
}

export default WaitingRoom;
