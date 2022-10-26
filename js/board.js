var pacman = pacman || {};

pacman.PLAYER = 96;
pacman.ENEMY = 69;
pacman.WALL = 1;
pacman.ROAD = 0;
pacman.actualMap = 0;
pacman.map = null;

pacman.Board = class {
    constructor() {
        this.maps = [
            [
                [pacman.ROAD, pacman.ROAD, pacman.WALL, pacman.ROAD, pacman.ROAD, pacman.ROAD], 
                [pacman.ROAD, pacman.ROAD, pacman.WALL, pacman.ROAD, pacman.ROAD, pacman.WALL], 
                [pacman.ROAD, pacman.ROAD, pacman.ROAD, pacman.ROAD, pacman.ROAD, pacman.ROAD], 
                [pacman.WALL, pacman.WALL, pacman.ROAD, pacman.WALL, pacman.ROAD, pacman.ROAD], 
                [pacman.ROAD, pacman.ROAD, pacman.ROAD, pacman.WALL, pacman.ROAD, pacman.ROAD]
            ]
        ];
        pacman.map = this.maps[pacman.actualMap];
        this.entities = [];
    }

    drawBoard() {
        let mapHTML = document.getElementById("board");
        mapHTML.textContent = "";

        for (let i = 0; i < pacman.map.length; i++) {
            for(let j = 0; j < pacman.map[i].length; j++) {
                if (typeof pacman.map[i][j] == 'object'){
                    if (pacman.map[i][j].type === pacman.PLAYER) {
                        mapHTML.innerHTML += 'X ';
                    } else {
                        mapHTML.innerHTML += 'A ';
                    }
                } else {
                    mapHTML.innerHTML += pacman.map[i][j] + " ";
                }
            }
            mapHTML.innerHTML += '<br/>';
        }
    }

    addEntity(type) {
        let entity = null;
        if (type === pacman.PLAYER) {
            // PACMAN
            entity = new pacman.Pacman(0, 0, 0, pacman.PLAYER, this);
            pacman.actualMap = entity.z;
        } else {
            // GHOST
            entity = new pacman.Ghost(pacman.actualMap, 5, 0, pacman.ENEMY, this, this.entities[0]);
        }
        pacman.map[entity.y][entity.x] = entity;
        this.entities.push(entity);
    }

    moveEntity(entity, x, y) {
        if (y >= 0 && y < pacman.map.length && x >= 0 && x < pacman.map[y].length) {
            if (pacman.map[y][x] != 1 && pacman.map[y][x].type != pacman.ENEMY) {
                pacman.map[entity.y][entity.x] = pacman.ROAD;
                pacman.map[y][x] = entity;
                entity.x = x;
                entity.y = y;
            }
            this.drawBoard();
        }
    }
}