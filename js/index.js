let board = new pacman.Board();
board.addEntity(pacman.PLAYER, 0, 0, 0);
board.addEntity(pacman.ENEMY, 5, 4, 0);
board.addEntity(pacman.ENEMY, 0, 0, 1);
board.addEntity(pacman.ENEMY, 5, 4, 2);
board.startEnemiesMovementOnLayer(board.layer)
board.drawBoard();