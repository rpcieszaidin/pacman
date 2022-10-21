let board = new pacman.Board();
board.addEntity(pacman.PLAYER);
board.addEntity(pacman.ENEMY);
board.drawBoard();

document.addEventListener('keydown', (event) => {
    let entity = board.entities.find(element => element.type == pacman.PLAYER);
    switch(event.key) {
        case 'w':
            board.moveEntity(entity, entity.x - 1, entity.y);
            break;
        case 'a':
            board.moveEntity(entity, entity.x, entity.y - 1);
            break;
        case 'd':
            board.moveEntity(entity, entity.x, entity.y + 1);
            break;
        case 's':
            board.moveEntity(entity, entity.x + 1, entity.y);
            break;
    }
    document.getElementById('board').remove();
    board.drawBoard();
});

//board.enemyMovements();