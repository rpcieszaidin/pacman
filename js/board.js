var pacman = pacman || {};

pacman.PLAYER = 98;
pacman.ENEMY = 1;
pacman.STAIRS = 63;

pacman.Board = class {
    constructor() {
        this.maps = [
            [
                [0, 0, 0, 0, 0, 0, 0],
                [0, 1, 1, 0, 1, 1, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 1, 1, 1, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 1, 1, 0, 1, 1, 0],
                [0, 0, 0, 0, 0, 0, 0]
            ]
        ];
        this.entities = [];
        this.end = false;
        this.okmove= null;
    }

    addEntity(type) {
        if (type === pacman.PLAYER) {
            let player = new pacman.Pacman(0, 4, 3, pacman.PLAYER);
            this.maps[0][4][3] = player;
            this.entities.push(player);
        }
        if (type === pacman.ENEMY) {
            //put (Math.floor(Math.random() * 2)*7); for
        }
    }

    drawBoard() {
        for (let i = 0; i < this.maps[0].length; i++) {
            for(let j = 0; j < this.maps[0][i].length; j++) {
                if (typeof this.maps[0][i][j] == 'object'){
                    if (this.maps[0][i][j].type === pacman.PLAYER) {
                    } 
                } else {
                    console.log(this.maps[0][i][j]);
                }
            }
        }
    }

    moveEntity(entity, x, y) {
        this.okmove = true;
        //
        if (x < 0 || x > this.maps[entity.z][y].length || y < 0 || y > this.maps[entity.z].length) {
            this.okmove=false;
        }
        if (this.maps[entity.z][y][x] === 1){
            this.okmove=false;
        }
        if ((Math.abs(entity.x - x)+(Math.abs(entity.y - y))) !== 1){
            this.okmove=false;
        }
        //Between this and the comment line above will probably be merged into 1 if, this is for testing.
        if (this.maps[entity.z][y][x].type === pacman.ENEMY){
            //Game over.
        }
        if (this.maps[entity.z][y][x].type === pacman.STAIRS){
            //Next level
        }
        if (this.okmove === false){
            //Doesn't move.
        }
        //Proceeds correctly.
    }
}