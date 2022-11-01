let board = new pacman.Board();
board.addEntity(pacman.PLAYER, 0, 0, 0);
board.addEntity(pacman.ENEMY, 0, 5, 0);
board.addEntity(pacman.ENEMY, 1, 0, 0);
board.drawBoard();