let board = new pacman.Board();
board.createBoard();
board.addEntity(pacman.PLAYER);
//board.addEntity(pacman.ENEMY);
board.movePlayers(6, board.entities[0]);
board.drawBoard();
