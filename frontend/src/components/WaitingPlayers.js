import React, { useContext } from 'react';
import PlayerCard from './PlayerCard';
import { MyContext } from '../infra/MyContext';

const WaitingPlayers = () => {
  const context = useContext(MyContext);
  const { room } = context;
  return (
    <span className="waiting-players">
      <h1>Waiting Players</h1>
      {room.playersList.map((player) => (
        <PlayerCard name={player.name} key={player.id} />
      ))}
    </span>
  );
};

export default WaitingPlayers;
