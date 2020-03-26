const PHASES = {
  WAITING_FOR_PLAYERS: 0
};

class Game {
  constructor(id) {
    this.id = id;

    this.playerList = {};

    this.phase = PHASES.WAITING_FOR_PLAYERS;
  }

  addPlayer(player) {
    this.playerList[player.id] = player;
  }
}
