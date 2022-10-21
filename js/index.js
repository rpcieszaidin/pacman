let board = new pacman.Board();
board.addEntity(pacman.PLAYER);
board.addEntity(pacman.ENEMY);
board.drawBoard();
let player = new pacman.Entity(0, 0, 0, pacman.PLAYER);
board.move(player);
let enemy = new pacman.Entity();