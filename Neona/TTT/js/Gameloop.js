import GameGrid from "./GameGrid.js";
import Player from "./Player.js";

export default class Game{
    #winner;
    #endgame;
    #grid;
    #player1;
    #player2;
    #turn;

    constructor(p1, p2, grid){
        this.#player1 = p1;
        this.#player2 = p2;
        this.#grid = grid;
        this.#turn = p1;
        this.togglePlayer();
    }

    async gameloop(move){
        let type = this.#turn.getType();
        await this.#grid.updateGrid(move, type);
        if(this.checkIfWon(this.#turn, this.#grid)){
            await this.restartGame();
        }
        else{
            this.togglePlayer();
        }
    }


    setWinner(winner){
        this.#winner = winner;
    }

    async restartGame(){
        this.#endgame = true;
        alert("The winner is " + this.#turn.getName());
        await this.#grid.resetGrid();
    }

    getTurn(){
        return this.#turn;
    }

    togglePlayer(){
        if(this.#turn === this.#player1){
            this.#turn = this.#player2;
        }
        else{
            this.#turn = this.#player1;
        }         
    }

    calculateScore(player){
        let score = player.getScore();
        score += 100;
        player.setScore(score);
    }

    checkIfWon(player, grid){
        let winner = false;
        if(grid.validateGrid(0,1,2) || grid.validateGrid(3,4,5) || grid.validateGrid(6,7,8) || grid.validateGrid(0,4,8) || grid.validateGrid(2,4,6) || grid.validateGrid(0,3,6) || grid.validateGrid(1,4,7) || grid.validateGrid(2,5,8)){
            winner = true;
        }
        else{
            winner = false;
        }
        if(winner){
            this.setWinner(player);
            this.calculateScore(player);
            document.getElementById('player_1').innerText= `${this.#player1.getName()} - ${this.#player1.getType()} score ${this.#player1.getScore()}`;
            document.getElementById('player_2').innerText= `${this.#player2.getName()} - ${this.#player2.getType()} score ${this.#player2.getScore()}`;
        }
        return winner;
    }
}

