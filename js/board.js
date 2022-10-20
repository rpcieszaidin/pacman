var pacman = pacman || {};

pacman.PLAYER = 98;
pacman.ENEMY = 1;

pacman.Board = class {
    constructor() {
        this.maps = [
            [
                [0, 0, 1, 0, 0, 0],
                [0, 0, 1, 0, 0, 1],
                [0, 0, 0, 0, 0, 0],
                [1, 1, 0, 1, 0, 0],
                [0, 0, 0, 1, 0, 0]
            ]
        ];
        this.entities = [];
    }

    addEntity(type) {
        if (type === pacman.PLAYER) {
            // implementar metodo posicion correcta
            let player = new pacman.Entity(0, 0, 0, pacman.PLAYER);
            this.maps[0][0][0] = player;
            this.entities.push(player);
        } else {
            // implementar metodo posicion correcta
            let enemy = new pacman.Entity(0, 4, 5, pacman.ENEMY);
            this.maps[0][4][5] = enemy;
            this.entities.push(enemy);   
        }
    }

    drawBoard() {
        let table = document.createElement("table");
        table.setAttribute("id", "board");
        let map = this.maps[0];
        for (let i = 0; i < map.length; i++) {
            let tr = document.createElement("tr");
            for(let j = 0; j < map[i].length; j++) {
                tr.appendChild(document.createElement("th"));
                if (typeof map[i][j] == 'object'){
                    if (map[i][j].type === pacman.PLAYER) {
                        tr.cells[j].appendChild(document.createTextNode('P'));
                    } else {
                        tr.cells[j].appendChild(document.createTextNode('F'));
                    }
                } else {
                    tr.cells[j].appendChild(document.createTextNode(map[i][j]));
                }
                table.appendChild(tr);
            }
        }
        document.body.appendChild(table);
    }

    moveEntity(entity, x, y) {
        let map = this.maps[entity.z];
        if (x >= 0 && x < map[y].length && y >= 0 && y < map.length) {
            if (map[y][x] == 0) {
                map[entity.y][entity.x] = 0;
                map[y][x] = entity;
                entity.x = y;
                entity.y = x;
            } else if (map[y][x] != 1) {
                
            }
        }
    }

    enemyMovements() {
        this.interval = setInterval(() => {
            let entity = board.entities.find(element => element.type == pacman.ENEMY);
            switch(Math.floor(Math.random() * 4)) {
                case 0:
                    board.moveEntity(entity, entity.x - 1, entity.y);
                    break;
                case 1:
                    board.moveEntity(entity, entity.x, entity.y - 1);
                    break;
                case 2:
                    board.moveEntity(entity, entity.x, entity.y + 1);
                    break;
                case 3:
                    board.moveEntity(entity, entity.x + 1, entity.y);
                    break;
            }
            document.getElementById("board").remove();
            board.drawBoard();
        }, 500);
    }

}