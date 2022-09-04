export default class Player {
    #score=0;
    #name;
    #type;
    constructor(name, type) {
        this.#name=name;
        this.#type=type;
        this.#SetScoreText();
    }
    GetType() {
        return this.#type;
    }
    GetSpot() {
        let spot = prompt(`${this.#name}, which spot do you want? Pick 0 to 8. Choose 9 to exit.`);
        if (spot && spot.match(/^[0-9]$/)) {
            return parseInt(spot, 10);
        }
    }
    IncrementScore() {
        this.#score++;
        this.#SetScoreText();
    }
    #SetScoreText() {
        document.getElementById(this.#type).innerHTML = this.#name + " (" + this.#type + "): " + this.#score;
    }
    GetName() {
        return this.#name;
    }
}