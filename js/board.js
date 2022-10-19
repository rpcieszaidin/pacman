var pacman = pacman || {};

pacman.PLAYER = 98;
pacman.ENEMY = 1;

pacman.Board = class {
    constructor() {
        this.maps = [
            [
                [0, 0, 1, 0, 0, 0], [0, 0, 1, 0, 0, 1], [0, 0, 0, 0, 0, 0], [1, 1, 0, 1, 0, 0], [0, 0, 0, 1, 0, 0]
            ]
        ];
        this.entities = [];
        this.board = document.getElementById("board");
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
        let map = this.maps[0];
        for (let i = 0; i < map.length; i++) {
            for(let j = 0; j < map[i].length; j++) {
                if (typeof map[i][j] == 'object'){
                    if (map[i][j].type === pacman.PLAYER) {
                        this.board.innerHTML += 'P';
                    } 
                } else {
                    this.board.innerHTML += map[i][j];
                }
            }
            this.board.innerHTML += '<br>';
        }
    }

    moveEntity(entity, x, y) {
        this.entities.forEach(ent => {
            if(typeof entity == typeof ent){
                console.log('1');
                let map = this.maps[ent.z];
                if (x >= 0 && x < map[y].length && y >= 0 && y < map.length) {
                    if(ent.x - 1 == x || ent.x + 1 == x || ent.x == x){
                        if(ent.y - 1 == y || ent.y + 1 == y || ent.y == y){
                            ent.y = y;
                            ent.x = x;
                            console.log('He llegado');
                            /*this.maps[ent.z][ent.x][ent.y] = ent;
                            this.board.innerHTML = '';
                            this.board.innerHTML = this.drawBoard();*/
                        }
                    }
                }
            }
        });
    }

}