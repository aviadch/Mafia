import React from 'react';

const PlayerCard = (props) => {
  return (
    <span className="Player">
      <h2>{props.name}</h2>
      <img
        src={require('./player1.jpg')}
        alt={props.name}
        height="100"
        width="100"
      />
    </span>
  );
};

export default PlayerCard;
