var pacman = pacman || {};

pacman.PLAYER = 98;
pacman.ENEMY = 1;
pacman.actualMap = 0;

pacman.Board = class {
    constructor() {
        this.maps = [
            [
                [0, 0, 1, 0, 0, 0], [0, 0, 1, 0, 0, 1], [0, 0, 0, 0, 0, 0], [1, 1, 0, 1, 0, 0], [0, 0, 0, 1, 0, 0]
            ]
        ];
        this.entities = [];
    }

    addEntity(type) {
        if (type === pacman.PLAYER) {
            // implementar metodo posicion correcta
            let player = new pacman.Pacman(0, 0, 0, pacman.PLAYER);
            player.createEventPlayer();
            pacman.actualMap = player.z;
            this.maps[pacman.actualMap][0][0] = player;
            this.entities.push(player);
        } else {
            let ghost1 = new pacman.Ghost(pacman.actualMap, 0, 0, pacman.ENEMY);
            this.maps[pacman.actualMap][4][0] = ghost1;
            this.entities.push(ghost1);

            let ghost2 = new pacman.Ghost(pacman.actualMap, 0, 0, pacman.ENEMY);
            this.maps[pacman.actualMap][0][5] = ghost2;
            this.entities.push(ghost2);
        }
    }

    drawBoard() {
        let mapHTML = document.getElementById("game");
        mapHTML.textContent = "";

        let map = this.maps[pacman.actualMap];
        for (let i = 0; i < map.length; i++) {
            for(let j = 0; j < map[i].length; j++) {
                if (typeof map[i][j] == 'object'){
                    if (map[i][j].type === pacman.PLAYER) {
                        mapHTML.innerHTML += 'X';
                    } else {
                        mapHTML.innerHTML += 'A';
                    }
                } else {
                    mapHTML.innerHTML += map[i][j];
                }
            }
            mapHTML.innerHTML += '<br/>';
        }
    }

    moveEntity(entity, x, y) {
        let map = this.maps[pacman.actualMap];
        if (y >= 0 && y < map.length && x >= 0 && x < map[y].length) {
            if (map[y][x] != 1 && map[y][x].type != pacman.ENEMY) {
                map[entity.y][entity.x] = 0;
                map[y][x] = entity;
                if (entity.type == pacman.PLAYER) {
                    this.entities[0].x = x;
                    this.entities[0].y = y;
                } else {
                    this.entities[1].move(this.entities[0].x, this.entities[0].y);
                }
            }
            this.drawBoard();
        }
    }

    initMovements() {
        this.interval = setInterval(this.entities[1].move(this.entities[0].x, this.entities[0].y), 300);  
    }
    stopMovements() {
        clearInterval(this.interval);
    }
}