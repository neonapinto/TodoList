import Board from "./board.js";
import Player from "./player.js";

export default class Game {
    #current_player;
    #board;
    #players;
    constructor() {
        this.#current_player = 0;
        var p1 = new Player("Player 1", "X");
        var p2 = new Player("Player 2", "O");
        this.#players = [p1, p2];
        this.#board = new Board();   
        this.GameLoop();
    }
    async GameLoop() {
        await this.#board.draw();

        while (true) {
            let spot = this.#players[this.#current_player].GetSpot();
            if (spot != null) {
                if (spot === 9) {
                    alert("Thanks for playing.");
                    break;
                }
                let worked = this.#board.placeTypeOnBoard(this.#players[this.#current_player], spot);
                if (worked) {
                    let user_won = this.#board.ifWon();
                    if (user_won) {
                        user_won.IncrementScore();
                        this.#current_player = 0;
                        await this.#board.draw();
                        alert(`Congrats, ${user_won.GetName()} won!`);
                        this.#board.reset();
                    } else {
                        this.#current_player = 1 - this.#current_player; 
                    }
                    await this.#board.draw();
                } else {
                    alert("Spot is already filled! Pick another.");
                }
            } else {
                alert("Invalid spot! Try again.");
            }
        }
    }
}