let board = new pacman.Board();
board.addEntity(pacman.PLAYER);
board.addEntity(pacman.ENEMY);
board.drawBoard();
// board.moveEntity(pacman.ENTITY, 0, 1);
let mov = new entity.Character();
mov.move(pacman.ENTITY);
