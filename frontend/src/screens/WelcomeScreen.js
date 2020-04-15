import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './WelcomeScreen.css';
import { MyContext } from '../infra/MyContext';
import TextField from '@material-ui/core/TextField';
const WelcomeScreen = () => {
  const context = useContext(MyContext);
  const [roomIDToJoin, setRoom] = useState('');
  const onRoomInputChange = (event) => {
    setRoom(event.target.value);
  };
  return (
    <div className="welcome-screen">
      <Typography variant="h1" component="h2">
        Welcome to Mafia Game
      </Typography>

      <div className="buttonContainer">
        <div>
          <Button
            onClick={context.onRoomCreated}
            variant="contained"
            color="primary"
          >
            Create a New Room
          </Button>
        </div>
        <div>
          <TextField
            onChange={onRoomInputChange}
            id="standard-basic"
            label="RoomId"
          />
          <Button
            onClick={() => context.joinExistingRoom(roomIDToJoin)}
            variant="contained"
            color="primary"
          >
            Join Room
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
