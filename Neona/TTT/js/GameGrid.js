export default class GameGrid{
    #grid;

    constructor(){
        this.#grid = new Array(9).fill(null);
    }

    drawGrid(){
        return new Promise((resolve, reject) =>{
            let inputs = document.querySelectorAll('.wrapper > div');
            for(let i=0; i<this.#grid.length; i++){
                inputs[i].innerText = this.#grid[i];
            }
            window.requestAnimationFrame(() => {
                window.requestAnimationFrame(resolve);
            });
        })
    }

    getGrid(){
        return this.#grid;
    }

    updateGrid(move, type){
        return new Promise((resolve, reject) =>{
            if(this.#grid[move] == null){
                this.#grid[move] = type;
            }
            resolve(this.drawGrid());
        })
    }

    async resetGrid(){
        this.#grid = new Array(9).fill(null);
        this.drawGrid();
    }

    validateGrid(n1, n2, n3){
        return (this.#grid[n1] === 'X' && this.#grid[n2] === 'X' && this.#grid[n3] === 'X') || (this.#grid[n1] === 'O' && this.#grid[n2] === 'O' && this.#grid[n3] === 'O');
    }
}