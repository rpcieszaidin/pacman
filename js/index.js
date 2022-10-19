let board = new pacman.Board();
board.addEntity(pacman.PLAYER);
board.addEntity(pacman.ENEMY);
board.drawBoard();
//No funciona
board.moveEntity(pacman.PLAYER, 1, 0);
board.drawBoard();