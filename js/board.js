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
            let player = new pacman.Pacman(0, 0, 0, pacman.PLAYER);
            this.maps[0][0][0] = player;
            this.entities.push(player);
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
        if (x >= 0 && x < map.length && y >= 0 && y < map[map.length-1].length) {
            if (map[x][y] == 0) {
                map[entity.x][entity.y] = 0;
                map[x][y] = entity;
                entity.x = x;
                entity.y = y;
            } else if (map[x][y] != 1) {
                
            }
        }
    }
}