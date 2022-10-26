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

    addEntity() {
        let player = new pacman.Entity(0, 0, 0, pacman.PLAYER);
        let enemy = new pacman.Entity(0, 0, 0, pacman.ENEMY);
        this.maps[0][0][0] = player;
        this.maps[0][3][5] = enemy;
        this.entities.push(player);
        this.entities.push(enemy);
    }

    drawBoard() {
        
        let map = document.getElementById("board").innerHTML = this.maps[0];
        for (let i = 0; i < map.length; i++) {
            for(let j = 0; j < map[i].length; j++) {
                if (typeof map[i][j] == 'object'){
                    if (map[i][j].type === pacman.PLAYER) {
                        map.innerHTML='C';
                    } 
                    if (map[i][j].type === pacman.ENEMY){
                        map.innerHTML='A';
                    }
                } else {
                    //map.innerHTML=map[i][j];
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
