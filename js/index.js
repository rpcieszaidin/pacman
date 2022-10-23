let board = new pacman.Board();
let player = board.addEntity(0, 0, 0, pacman.PLAYER);
let enemy = board.addEntity(5, 4, 0, pacman.ENEMY);
board.drawBoard();
player.addListenerMove();
