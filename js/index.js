let board = new pacman.Board();
board.addEntity(pacman.PLAYER, 0, 0, 0);
board.addEntity(pacman.ENEMY, 0, 2, 0);
board.addEntity(pacman.ENEMY, 8, 4, 0);
board.drawBoard();
