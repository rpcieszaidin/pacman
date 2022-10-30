let board = new pacman.Board();
board.addEntity(pacman.PLAYER);
board.addEntity(pacman.ENEMY);
board.addEntity(pacman.STAIR);
board.drawBoard();
let player = new pacman.Entity(0, 0, 0, pacman.PLAYER);
board.movePlayer(player);
let enemy = new pacman.Entity(4, 5, 0, pacman.ENEMY);
board.moveEnemy(enemy);

