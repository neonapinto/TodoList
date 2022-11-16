import GameGrid from "./GameGrid.js";
import Player from "./Player.js";
import Game from "./Gameloop.js";

(async () =>{
    //0 1 2
    //3 4 5
    //6 7 8
    let p1 = new Player(0, 'SAM', 'X');
    let p2 = new Player(0, 'TOM', 'O');

    let grid = new GameGrid();
    await grid.drawGrid();


    let g = new Game(p1, p2, grid);
    document.getElementById('play-btn').addEventListener('click', async (e)=>{
        let move = document.getElementById('move').value;
        await g.gameloop(move);
    });

})();
