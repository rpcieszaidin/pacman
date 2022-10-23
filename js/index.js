let board = new pacman.Board();
let player = board.addEntity(0, 0, 0, pacman.PLAYER);
let enemy = board.addEntity(4, 5, 0, pacman.ENEMY);
let timer = new pacman.Timer(enemy);
board.drawBoard();
player.addListenerMove();
timer.init();
board.setTimer(timer);
