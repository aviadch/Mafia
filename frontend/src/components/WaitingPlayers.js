import React from "react";
import Player from "./Player";
import { MyContext } from "../infra/MyContext.js";

const WaitingPlayers = () => {
  return (
    <MyContext.Consumer>
      {(context) => {
        return (
          <span className="waiting-players">
            <h1>Waiting Players</h1>
            {context.state.playerList.map((player) => (
              <Player name={player["name"]} key={player["id"]} />
            ))}
          </span>
        );
      }}
    </MyContext.Consumer>
  );
};

export default WaitingPlayers;
