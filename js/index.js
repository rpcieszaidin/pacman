let board = new pacman.Board();
board.addEntity(pacman.PLAYER, 0, 0, 0);
board.addEntity(pacman.ENEMY, 17, 0, 0);
board.addEntity(pacman.ENEMY, 17, 8, 0);
board.addEntity(pacman.ENEMY, 5, 4, 0);
board.drawBoard();
