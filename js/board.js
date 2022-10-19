var pacman = pacman || {};

pacman.PLAYER = 99;
pacman.ENEMY = 98;
pacman.WALL = 1;
pacman.ROAD = 0;

pacman.Board = class {
    constructor() {
        this.maps = [
            [
                [0, 0, 1, 0, 0, 0], [0, 0, 1, 0, 0, 1], [0, 0, 0, 0, 0, 0], [1, 1, 0, 1, 0, 0], [0, 0, 0, 1, 0, 0]
            ]
        ];
        this.entities = [];
        this.board = document.querySelector('.board');
    }

    addEntity(type) {
        if (type === pacman.PLAYER) {
            let player = new pacman.Pacman(0, 0, 0, pacman.PLAYER);
            this.maps[0][0][0] = player;
            this.entities.push(player);
        } 

        return player;
    }

    drawBoard() {
        let map = this.maps[0];
        let fragment = document.createDocumentFragment();
        for (let i = 0; i < map.length; i++) {
            let row = document.createElement('div');
            row.classList.add('row');
            for(let j = 0; j < map[i].length; j++) {
                let div = document.createElement('div');
                if (typeof map[i][j] == 'object'){
                    if (map[i][j].type === pacman.PLAYER) {
                        div.innerHTML = 'P';
                    } else if (map[i][j].type === pacman.ENEMY) {
                        div.innerHTML = 'E';
                    }
                } else {
                    div.innerHTML = map[i][j];
                }
                row.appendChild(div);
            }
            fragment.appendChild(row);
        }
        this.board.appendChild(fragment);
    }

    moveEntity(entity, x, y) {
        let map = this.maps[entity.z];
        if (x >= 0 && x < map[y].length && y >= 0 && y < map.length) {
            if (map[i][j] == pacman.ROAD) {
                
            }
        }
    }
}