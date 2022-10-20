let board = new pacman.Board();
board.addEntity(pacman.PLAYER);
board.addEntity(pacman.GHOST);
board.drawBoard();
let player = new pacman.Pacman(0,0,0, pacman.PLAYER);
board.moveEntity(player, 0, 1);
board.moveEntity(player, 1, 1);