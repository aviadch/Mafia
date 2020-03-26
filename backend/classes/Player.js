class Player{
    constructor(id){
        this.id = id;

        //what role he play in the game - Murderer, Doctor, Detective or null if not yet decided
        this.role = null;

        //what is he currently doing - playing, waiting, outside of the game etc..
        this.activity = null;
    }

    static ROLES ={
        YET_DECIDED: 0,
        MURDERER: 1,
        DOCTOR: 2,
    }



}