class Player {
  constructor(id) {
    this.id = id;

    this.role = null;

    this.activity = null;
  }

  static ROLES = {
    YET_DECIDED: 0,
    MURDERER: 1,
    DOCTOR: 2
  };
}
