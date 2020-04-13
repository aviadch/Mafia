import React, { useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import "./WelcomeScreen.css";
import { MyContext } from "../infra/MyContext";
import TextField from "@material-ui/core/TextField";

const WelcomeScreen = () => {
  const context = useContext(MyContext);
  console.log(context.state.phase);
  const [roomIDToJoin, setRoom] = useState("");

  const onRoomInputChange = (event) => {
    setRoom(event.target.value);
    console.log(roomIDToJoin);
  };

  return (
    <div className="welcome-screen">
      <Typography variant="h1" component="h2">
        Hey - Welcome to Mafia Game
      </Typography>

      <div className="buttonContainer">
        <div>
          <Button
            onClick={context.onNewGame}
            variant="contained"
            color="primary"
          >
            Start a New Game
          </Button>
        </div>
        <div>
          <TextField
            onChange={onRoomInputChange}
            id="standard-basic"
            label="RoomId"
          />
          <Button
            onClick={() => context.joinGame(roomIDToJoin)}
            variant="contained"
            color="primary"
          >
            Join Game
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
