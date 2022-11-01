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
        this.mapsCopy = JSON.parse(JSON.stringify(this.maps));
        this.entities = [];
        this.currentMap = 0;
        this.board = document.querySelector('.board');
        this.lose = document.getElementById('lose');
        this.restart = document.querySelector('.restart-btn');
    }

    setRestartBtn() {
        this.restart.addEventListener('click', () => window.location.reload());
    }

    setTimer(timer) {
        this.timer = timer;
    }

    getCurrentMap() {
        return this.currentMap;
    }

    getMaps() {
        return this.mapsCopy;
    }

    getBoardLimits(board) {
        return [board.length, board[0].length];
    }

    getPacman() {
        let player;
        this.entities.forEach(entity => {
            if (entity.type === pacman.PLAYER)
                player = entity;
        });
        return player;
    }

    addEntity(x, y, z, type) {
        let entity;
        entity = new pacman.Entity(x, y, z, type, this);

        this.mapsCopy[z][x][y] = entity;
        this.entities.push(entity);

        return entity;
    }

    drawBoard() {
        let map = this.mapsCopy[0];
        let fragment = document.createDocumentFragment();
        map.forEach(row => {
            let r = document.createElement('div');
            r.classList.add('row');
            row.forEach(column => {
                let div = document.createElement('div');
                if (typeof column == 'object') {
                    if (column.type === pacman.PLAYER)
                        div.innerHTML = 'X';
                    else if (column.type === pacman.ENEMY)
                        div.innerHTML = 'A';
                } else
                    div.innerHTML = column;

                r.appendChild(div);
            });
            fragment.appendChild(r);
        });
        this.board.appendChild(fragment);
    }

    moveEntity(entity, x, y) {
        let map = this.mapsCopy[entity.z];
        let [limitX, limitY] = this.getBoardLimits(map);
        if (x >= 0 && x < limitX && y >= 0 && y < limitY) {
            if (entity.type === pacman.PLAYER && map[x][y] === pacman.ROAD)
                this.updatePositions(map, entity, x, y);
            else if (entity.type === pacman.ENEMY && map[x][y] !== pacman.WALL) {
                this.updatePositions(map, entity, x, y);
                this.checkLose(map);
            }
        }
    }

    updatePositions(map, entity, x, y) {
        map[entity.x][entity.y] = 0;
        this.board.children[entity.x].children[entity.y].innerHTML = 0;
        [entity.x, entity.y] = [x, y];
        map[x][y] = entity;

        if (entity.type === pacman.PLAYER)
            this.board.children[x].children[y].innerHTML = 'X';
        else if (entity.type === pacman.ENEMY)
            this.board.children[x].children[y].innerHTML = 'A';
    }

    checkLose(map) {
        const promise = new Promise((resolve, reject) => {
            let player = this.getPacman();
            if (map[player.x][player.y] != player) {
                resolve(() => {
                    player.removeListenerMove();
                    this.timer.stop();
                    this.lose.style.display = 'flex';
                });
            }
        });

        promise.then((f) => f());
    }
}