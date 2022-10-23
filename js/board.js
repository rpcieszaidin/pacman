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

    addEntity(y, x, z, type) {
        let entity;
        console.log(y, x, z);
        entity = new pacman.Entity(y, x, z, type, this);

        this.maps[z][x][y] = entity;
        this.entities.push(entity);

        return entity;
    }

    drawBoard() {
        let map = this.maps[0];
        let fragment = document.createDocumentFragment();
        for (let i = 0; i < map.length; i++) {
            let row = document.createElement('div');
            row.classList.add('row');
            for (let j = 0; j < map[i].length; j++) {
                let div = document.createElement('div');
                if (typeof map[i][j] == 'object') {
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
        let [limitX, limitY] = this.setBoardLimits(map);
        if (x >= 0 && x < limitX && y >= 0 && y < limitY) {
            if (map[x][y] == pacman.ROAD) {
                map[entity.x][entity.y] = 0;
                this.board.children[entity.x].children[entity.y].innerHTML = 0;
                [entity.x, entity.y] = [x, y];
                map[x][y] = entity;
                this.board.children[x].children[y].innerHTML = 'P';
            }
        }
    }

    setBoardLimits(board) {
        return [board.length, board[0].length];
    }
}