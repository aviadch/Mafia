import React from 'react';
import PropTypes from 'prop-types';

const playerImage = require('./player1.jpg');

const PlayerCard = (props) => {
  const { name } = props;
  return (
    <span className="Player">
      <h2>{name}</h2>
      <img src={playerImage} alt={name} height="100" width="100" />
    </span>
  );
};

PlayerCard.propTypes = {
  name: PropTypes.string.isRequired,
};

export default PlayerCard;
