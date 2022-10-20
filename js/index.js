let board = new pacman.Board();
board.addEntity(pacman.PLAYER);
board.addEntity(pacman.ENEMY);
board.drawBoard();

board.moveEntity(board.entities[1], 4, 4)