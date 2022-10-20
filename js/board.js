var pacman = pacman || {};

pacman.PLAYER = 98;
pacman.ENEMY = 1;

pacman.Board = class {
    constructor() {
        this.maps = [
            [
                [0, 0, 0, 0, 0, 0], [0, 0, 1, 0, 0, 1], [0, 0, 0, 0, 0, 0], [1, 1, 0, 1, 0, 0], [0, 0, 0, 1, 0, 0]
            ]
        ];
        this.entities = []
    }

    addEntity(type, x, y, z) {
        let entity;
        switch (type) {
            case pacman.PLAYER:
                entity = new pacman.Pacman(x, y, z, pacman.PLAYER);
                break;
            case pacman.ENEMY:
                entity = new pacman.Ghost(x, y, z, pacman.ENEMY);
                break;
        }
        this.maps[z][y][x] = entity;
        this.entities.push(entity);
    }

    drawBoard() {
        let board = document.getElementById("board");
        board.innerHTML = "";
        let map = this.maps[0];
        map.forEach(row => {
            row.forEach(line => {
                if (typeof line == 'object'){
                    if (line.type === pacman.PLAYER) {
                        board.innerHTML += "P";
                    }else if (line.type === pacman.ENEMY) {
                        board.innerHTML += "E";
                    } 
                } else {
                    board.innerHTML += line;
                }
            });
            board.innerHTML += "<br>";
        });


        
    }

    moveEntity(entity, x, y) {
        let map = this.maps[entity.z];
        
        if (y >= 0 && y < map.length && x >= 0 && x < map[y].length) {
            if(map[y][x].type == pacman.PLAYER || map[y][x].type == pacman.ENEMY){
                if(entity.type === pacman.PLAYER){
                    map[entity.y][entity.x] = 0;
                }else if(entity.type === pacman.ENEMY){
                    map[y][x] = 0;
                }
                this.lose()
            }
            if(map[y][x] == 0){
                map[entity.y][entity.x] = 0;
                entity.x = x;
                entity.y = y;
                map[entity.y][entity.x] = entity
            }
        }
        this.drawBoard();
    }

    lose(){
        for (let entity of this.entities) {
            if(entity.type === pacman.PLAYER){
                entity.lose();
            }else{
                entity.stopMoving();
            }
        }
    }

}