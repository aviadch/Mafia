import React, { useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import InputName from '../components/InputName';
import WaitingPlayers from '../components/WaitingPlayers';
import Button from '@material-ui/core/Button';
import { MyContext } from '../infra/MyContext.js';
const WaitingRoom = () => {
  const context = useContext(MyContext);

  return (
    <div className="waiting-room">
      <Typography variant="h1" component="h2" gutterBottom>
        Waiting Room - RoomId: {context.currentRoomID}
      </Typography>
      <>
        {!context.state.isUserEnteredName && (
          <InputName
            label="Enter Your Name"
            onSubmit={context.onPlayerRegisterToRoom}
          />
        )}
      </>
      <Button variant="contained" color="primary">
        Start the game
      </Button>
      <h2>game id</h2>

      <WaitingPlayers />
    </div>
  );
};

export default WaitingRoom;
