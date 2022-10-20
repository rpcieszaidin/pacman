let board = new pacman.Board();
board.addEntity(pacman.PLAYER);
board.addEntity(pacman.ENEMY);

board.drawBoard();
// board.moveEntity(board.entities[0], 1, 0);
// board.drawBoard();
// console.log(board.moveEntity(board.entities[0], 1, 1), board.entities[0]);
console.log(board.moveEntity(board.entities[1], 4, 5), board.entities[1]);
// board.drawBoard();