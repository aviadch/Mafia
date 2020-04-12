import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import EnterName from "../components/EnterName";
import WaitingPlayers from "../components/WaitingPlayers";
import Button from "@material-ui/core/Button";
import { MyContext } from "../infra/MyContext.js";

const MOCK_playerList = ["Elisha", "Lahav", "Aviad"];

const WaitingRoom = () => {
  const [state, setState] = useState({
    isUserEnteredName: false,
    playerList: MOCK_playerList,
  });

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
                  <EnterName />
                </>
              ) : (
                <></>
              )}

              <Button variant="contained" color="primary">
                Start the game
              </Button>
              <h2>game id</h2>

              <WaitingPlayers />
            </div>
          );
        }}
      </MyContext.Consumer>
    </div>
  );
};

export default WaitingRoom;
