import React, { useContext } from "react";
import Typography from "@material-ui/core/Typography";
import EnterName from "../components/EnterName";
import WaitingPlayers from "../components/WaitingPlayers";
import Button from "@material-ui/core/Button";
import { MyContext } from "../infra/MyContext.js";

const WaitingRoom = () => {
  const context = useContext(MyContext);

  return (
    <div className="waiting-room">
      <div>
        <Typography variant="h1" component="h2" gutterBottom>
          Waiting Room - RoomId: {context.state.currentRoom}
        </Typography>
        {!context.state.isUserEnteredName ? <EnterName /> : null}

        <Button variant="contained" color="primary">
          Start the game
        </Button>
        <h2>game id</h2>

        <WaitingPlayers />
      </div>
    </div>
  );
};

export default WaitingRoom;
