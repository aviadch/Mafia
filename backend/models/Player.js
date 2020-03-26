const ROLE = {
  YET_DECIDED: 0,
  MURDERER: 1,
  DOCTOR: 2
};

const ACTIVITY ={
  BEFORE_GAME:0,
  PLAY:1,
  DEAD:2
}

class Player {
  constructor(id) {
    this.id = id;

    this.role = null;

    this.activity = ACTIVITY.BEFORE_GAME;
  }
}
