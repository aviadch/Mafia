
class Game {
  constructor(id) {
    this.id = id;

    this.playerList = {};

    //Phase mean what is currently happen in the game - waiting for players, murderer Input? etc
    this.phase = Game.PHASES.WAITING_FOR_PLAYERS
  }

  static PHASES ={
    WAITING_FOR_PLAYERS : 0
  }

  addPlayer(player) {
    this.playerList[player.id] = player;
  }


}
