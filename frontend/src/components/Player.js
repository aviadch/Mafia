import React from "react";

const Player = (name) => {
  return (
    <span className="Player">
      <h2>{name}</h2>
      <img src={require("./player1.jpg")} alt={name} height="100" width="100" />
    </span>
  );
};

export default Player;
