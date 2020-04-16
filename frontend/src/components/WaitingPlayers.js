import React, { useContext } from 'react';
import PlayerCard from './PlayerCard';
import { MyContext } from '../infra/MyContext.js';

const WaitingPlayers = () => {
  const context = useContext(MyContext);
  return (
    <span className="waiting-players">
      <h1>Waiting Players</h1>
      {context.room.playersList.map((player) => {
        return <PlayerCard name={player.name} key={player.id} />;
      })}
    </span>
  );
};

export default WaitingPlayers;
