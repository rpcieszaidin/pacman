var pacman = pacman || {};

pacman.PLAYER = 99;
pacman.ENEMY = 98;

pacman.Board = class {
    constructor() {
        this.maps = [ [ [0, 0, 1, 0, 0, 0], [0, 0, 1, 0, 0, 1], [0, 0, 0, 0, 0, 0], [1, 1, 0, 1, 0, 0], [0, 0, 0, 1, 0, 0] ] ];
        this.entities = [];
    }

    addEntity(type) {
        if (type === pacman.PLAYER) {
            // implementar metodo posicion correcta
            let player = new pacman.Pacman(0, 0, 0, pacman.PLAYER);
            this.maps[0][0][0] = player;
            this.entities.push(player);
        } else if (type === pacman.ENEMY) {
            let enemy = new pacman.Ghost(1, 0, 0, pacman.ENEMY);
            this.maps[0][1][1] = enemy;
            this.entities.push(enemy);
        }
    }

    drawBoard() {
        let map = this.maps[0];
        for (let i = 0; i < map.length; i++) {
            for(let j = 0; j < map[i].length; j++) {
                if (typeof map[i][j] == 'object'){
                    if (map[i][j].type === pacman.PLAYER) {
                        console.log('P');
                    } else if (map[i][j].type === pacman.ENEMY) {
                        console.log('E');
                    }
                } else if (map[i][j] == 0) {
                    console.log("o");
                } else if (map[i][j] == 1) {
                    console.log("|");
                }
            }
        }
    }

    moveEntity(entity, x, y) {
        let map = this.maps[entity.z];
        if (x >= 0 && x < map[y].length && y >= 0 && y < map.length) {
            
        }
    }
}