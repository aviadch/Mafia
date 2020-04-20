import React, { useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import InputName from '../components/InputName';
import WaitingPlayers from '../components/WaitingPlayers';
import MyContext from '../infra/MyContext';

const WaitingRoom = () => {
  const { room, player, onPlayerRegisterToRoom } = useContext(MyContext);
  return (
    <div className="waiting-room">
      <Typography variant="h1" component="h2" gutterBottom>
        {`Waiting Room - RoomId: ${room.id}`}
      </Typography>
      <>
        {!player.isRegistered && (
          <InputName
            label="Enter Your Name"
            onSubmit={onPlayerRegisterToRoom}
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
