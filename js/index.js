let board = new pacman.Board();
board.addEntity(pacman.PLAYER);
board.addEntity(pacman.ENEMY);
let player = new pacman.Entity(0, 0, 0, pacman.PLAYER);
let enemy = new pacman.Entity(5, 4, 0, pacman.ENEMY);
board.drawBoard();

board.move(player);
board.moveGhost(enemy);