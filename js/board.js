var pacman = pacman || {};

pacman.PLAYER = 98;
pacman.ENEMY = 90;

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
        this.board = document.getElementById("board");
    }

    addEntity(type) {
        if (type === pacman.PLAYER) {
            // implementar metodo posicion correcta
            let player = new pacman.Pacman(0, 0, 0, type);
            this.maps[0][0][0] = player;
            this.entities.push(player);
        }else if(type === pacman.ENEMY){
            let ghost = new pacman.Ghost(5, 4, 0, type);
            this.maps[0][4][5] = ghost;
            this.entities.push(ghost);
        } 
    }

    drawBoard() {
        let map = this.maps[0];
        for (let i = 0; i < map.length; i++) {
            for(let j = 0; j < map[i].length; j++) {
                if (typeof map[i][j] == 'object'){
                    if (map[i][j].type === pacman.PLAYER) {
                        this.board.innerHTML += 'P';
                    }else if(map[i][j].type === pacman.ENEMY){
                        this.board.innerHTML += 'G';
                    }
                } else {
                    this.board.innerHTML += map[i][j];
                }
            }
            this.board.innerHTML += "<br>";
        }
    }

    moveEntity(entity, x, y) {
        
        this.entities.forEach(enti => {
            if(entity.type == enti.type){
                console.log("entra");

                let map = this.maps[enti.z];
                if (x >= 0 && x < map[y].length && y >= 0 && y < map.length) {
                    if(map[x][y] == 0){
                        let a = enti.x;
                        let b = enti.y;
                        map[a][b] = 0;
                        enti.x = x;
                        enti.y = y;
                        map[x][y] = enti;
                        this.board.innerHTML = '';
                        this.drawBoard();
                    }
                }
            }
        });   
    }
}