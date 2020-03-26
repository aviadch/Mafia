
class Game {
  constructor(id) {
    this.id = id;

    this.playerList = {};

    
    this.phase = Game.PHASES.WAITING_FOR_PLAYERS
  }

  static PHASES ={
    WAITING_FOR_PLAYERS : 0
  }

  addPlayer(player) {
    this.playerList[player.id] = player;
  }


}
