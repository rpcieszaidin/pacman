let board = new pacman.Board();
board.addEntity(pacman.PLAYER);
board.drawBoard();
let player = new pacman.Pacman(0, 0, 0, pacman.PLAYER);
board.moveEntity(player,0,1);