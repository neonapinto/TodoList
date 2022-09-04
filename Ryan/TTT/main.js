import Player from "./player.js";
import Game from "./game.js";

(async () => {
    var p1 = new Player("Player 1", "X");
    var p2 = new Player("Player 2", "O");
    var game = new Game([p1, p2]);
    game.GameLoop();
})();