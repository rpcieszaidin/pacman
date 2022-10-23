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
        this.currentMap = 0;
        this.board = document.querySelector('.board');
    }

    getCurrentMap() {
        return this.currentMap;
    }

    getMaps() {
        return this.maps;
    }

    getPacman() {
        let player;
        this.entities.forEach(entity => {
            if(entity.type === pacman.PLAYER)
                player = entity;
        });
        return player;
    }

    addEntity(x, y, z, type) {
        let entity;
        entity = new pacman.Entity(x, y, z, type, this);

        this.maps[z][x][y] = entity;
        this.entities.push(entity);

        return entity;
    }

    drawBoard() {
        let map = this.maps[0];
        let fragment = document.createDocumentFragment();
        map.forEach(row => {
            let r = document.createElement('div');
            r.classList.add('row');
            row.forEach(column => {
                let div = document.createElement('div');
                if (typeof column == 'object') {
                    if (column.type === pacman.PLAYER) 
                        div.innerHTML = 'P';
                    else if (column.type === pacman.ENEMY)
                        div.innerHTML = 'E';
                } else 
                    div.innerHTML = column;
                
                r.appendChild(div);
            }); 
            fragment.appendChild(r);
        });
        this.board.appendChild(fragment);
    }

    moveEntity(entity, x, y) {
        let map = this.maps[entity.z];
        let [limitX, limitY] = this.getBoardLimits(map);
        if (x >= 0 && x < limitX && y >= 0 && y < limitY) {
            if (entity.type === pacman.PLAYER && map[x][y] === pacman.ROAD) 
                this.updatePositions(map, entity, x, y);
            else if (entity.type === pacman.ENEMY) {
                if (map[x][y] === pacman.ROAD || map[x][y] === pacman.PLAYER)
                    this.updatePositions(map, entity, x, y);

                if (map[x][y] === pacman.PLAYER)
                    console.log('lose');
            }
        }
    }

    updatePositions(map, entity, x, y) {
        console.log(entity.x, entity.y, x, y);
        map[entity.x][entity.y] = 0;
        this.board.children[entity.x].children[entity.y].innerHTML = 0;
        [entity.x, entity.y] = [x, y];
        map[x][y] = entity;

        if (entity.type === pacman.PLAYER)
            this.board.children[x].children[y].innerHTML = 'P';
        else if (entity.type === pacman.ENEMY)
            this.board.children[x].children[y].innerHTML = 'E';
    }

    getBoardLimits(board) {
        return [board.length, board[0].length];
    }

}