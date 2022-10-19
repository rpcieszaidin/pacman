let board = new pacman.Board();
board.addEntity(pacman.PLAYER);
board.drawBoard();
board.moveEntity(board.entities[0], 1, 0);
board.drawBoard();
console.log(board.moveEntity(board.entities[0], 1, 1), board.entities[0]);
board.drawBoard();