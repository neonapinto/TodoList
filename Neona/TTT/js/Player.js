export default class Player{
    #name;
    #score;
    #type;

    constructor(score, name, type){
        this.#score = score;
        this.#name = name;
        this.#type = type;
    }

    getName(){
        return this.#name;
    }

    getScore(){
        return this.#score;
    }

    getType(){
        return this.#type;
    }

    setScore(score){
        this.#score = score;
    }

}