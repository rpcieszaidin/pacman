var pacman = pacman || {};

pacman.PLAYER = 96;
pacman.ENEMY = 69;

pacman.WALL = '■';
pacman.ROAD = ' ';
pacman.BALL = '•';
pacman.STPU = '▲';
pacman.STPD = '▼';

pacman.Board = class {
    constructor() {
        this.maps = [
            [
                [pacman.BALL, pacman.BALL, pacman.BALL, pacman.BALL, pacman.BALL, pacman.BALL],
                [pacman.BALL, pacman.BALL, pacman.WALL, pacman.BALL, pacman.BALL, pacman.WALL],
                [pacman.BALL, pacman.BALL, pacman.BALL, pacman.BALL, pacman.BALL, pacman.BALL],
                [pacman.WALL, pacman.WALL, pacman.BALL, pacman.WALL, pacman.BALL, pacman.BALL],
                [pacman.STPD, pacman.BALL, pacman.BALL, pacman.WALL, pacman.BALL, pacman.BALL]
            ],
            [
                [pacman.BALL, pacman.BALL, pacman.BALL, pacman.BALL, pacman.BALL, pacman.BALL],
                [pacman.BALL, pacman.BALL, pacman.WALL, pacman.WALL, pacman.BALL, pacman.WALL],
                [pacman.WALL, pacman.BALL, pacman.BALL, pacman.BALL, pacman.BALL, pacman.BALL],
                [pacman.WALL, pacman.BALL, pacman.BALL, pacman.WALL, pacman.WALL, pacman.BALL],
                [pacman.STPU, pacman.BALL, pacman.BALL, pacman.BALL, pacman.BALL, pacman.BALL]
            ]
        ];
        this.entities = [];
        this.actualMap = 0;
        this.scoreCont = 40;
        this.score = document.getElementById("score");
    }

    drawBoard() {
        let mapHTML = document.getElementById("board");
        mapHTML.textContent = "";
        let map = this.maps[this.actualMap];
        // let copyMap = JSON.parse(JSON.stringify(map));

        for (let row of map) {
            for (let position of row) {
                if (typeof position == 'object') {
                    if (position.type === pacman.PLAYER) {
                        mapHTML.innerHTML += 'x ';
                    } else {
                        mapHTML.innerHTML += '∩ ';
                    }
                } else {
                    mapHTML.innerHTML += position + " ";
                }
            }
            mapHTML.innerHTML += '<br/>';
        }
    }

    addEntity(type, z, x, y) {
        let entity = null;
        if (type === pacman.PLAYER) {
            // PACMAN
            entity = new pacman.Pacman(z, x, y, pacman.PLAYER, this);
            pacman.actualMap = entity.z;
            this.actualMap = z;
        } else {
            // GHOST
            entity = new pacman.Ghost(z, x, y, pacman.ENEMY, this, this.entities[0]);
        }

        // MAP CHECK MOVEMENT
        if (entity.z != this.actualMap) {
            entity.stopMove();
        }

        this.maps[z][y][x] = entity;
        this.entities.push(entity);
    }

    moveEntity(entity, x, y) {
        let map = this.maps[entity.z];
        let previousMap = this.actualMap;

        if (y >= 0 && y < map.length && x >= 0 && x < map[y].length) {

            if (map[y][x] != pacman.WALL && map[y][x].type != pacman.ENEMY) {

                // 3D CHANGE
                if (map[y][x] == pacman.STPD && entity.type == pacman.PLAYER) {
                    entity.z++;
                    this.actualMap++;
                    map = this.maps[this.actualMap];
                    map[entity.y][entity.x] = entity;
                } else if (map[y][x] == pacman.STPU && entity.type == pacman.PLAYER) {
                    entity.z--;
                    this.actualMap--;
                    map = this.maps[this.actualMap];
                    map[entity.y][entity.x] = entity;
                } else {
                    // NORMAL VIA
                    if (entity.type == pacman.PLAYER) {
                        if (map[y][x] == pacman.BALL) {
                            this.score.innerHTML = "<b>BALLS</b><br/>" + this.scoreCont;
                            this.scoreCont--;
                            // CHECK WIN
                            if (this.scoreCont <= -1) {
                                setTimeout(() => {
                                    document.getElementById("win").style.visibility = "visible";
                                    document.getElementById("winRefresh").style.visibility = "visible";
                                    window.removeEventListener("keyup", this.entities[0].eventPlayer);
                                    for (const entity of this.entities) {
                                        if (entity.type == pacman.ENEMY) {
                                            entity.stopMove();
                                        }
                                    }
                                }, 100);
                            }
                        }
                        map[entity.y][entity.x] = pacman.ROAD;
                    } else {
                        if (map[y][x] == pacman.BALL) {
                            map[entity.y][entity.x] = pacman.BALL;
                        } else {
                            map[entity.y][entity.x] = pacman.ROAD;
                        }
                    }

                    entity.x = x;
                    entity.y = y;
                    map[entity.y][entity.x] = entity;
                }

            }

            // GHOST MOVEMENTS INIT/STOP
            if (this.actualMap != previousMap) {
                for (let entity of this.entities) {
                    if (entity.type == pacman.ENEMY) {
                        if (entity.z == previousMap) {
                            entity.stopMove();
                        } else {
                            entity.startMove();
                        }
                    }
                }
            }

        }

        this.drawBoard();
    }
}