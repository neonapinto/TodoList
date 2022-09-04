export default class Board {
    #board;
    constructor() {
        this.reset();
    }
    reset() {
        this.#board = new Array(9).fill(null);
    }
    draw() {
        return new Promise((resolve, reject) => {
            for(let i=0; i<this.#board.length; i++) {
                document.querySelectorAll("#board > div")[i].innerHTML = this.#board[i] ? this.#board[i].GetType() : "";
            }
            window.requestAnimationFrame(() => {
                window.requestAnimationFrame(resolve);
            });
        });
    }
    placeTypeOnBoard(player,i) {
        if (!this.#board[i]) {
            this.#board[i]=player;
            return true;
        }
    }
    #CheckLine(x, y, z) {
        if (this.#board[x] && this.#board[y] && this.#board[z] && this.#board[x].GetType() === this.#board[y].GetType() && this.#board[y].GetType() === this.#board[z].GetType()) {
            return this.#board[x];
        }
    }
    ifWon() {
        var lines = [
            this.#CheckLine(0,1,2),
            this.#CheckLine(3,4,5),
            this.#CheckLine(6,7,8),
            this.#CheckLine(0,3,6),
            this.#CheckLine(1,4,7),
            this.#CheckLine(2,5,8),
            this.#CheckLine(0,4,8),
            this.#CheckLine(6,4,2)
        ];
        return lines.find(x => x);
    }
}