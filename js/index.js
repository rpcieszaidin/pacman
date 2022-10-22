let board = new pacman.Board();
let entity = board.addEntity(pacman.PLAYER);
board.drawBoard();
entity.addListenerMove();
