var pacman = pacman || {};

pacman.PLAYER = 98;
pacman.ENEMY = 1;
pacman.ENTITY = "";

pacman.Board = class {
    constructor() {
        this.maps = [
            [
                [0, 0, 1, 0, 0, 0], [0, 0, 1, 0, 0, 1], [0, 0, 0, 0, 0, 0], [1, 1, 0, 1, 0, 0], [0, 0, 0, 1, 0, 0]
            ]
        ];
        this.entities = [];
    }
    

    addEntity(type) {
        if (type === pacman.PLAYER) {
            // implementar metodo posicion correcta
            let player = new pacman.Pacman(0, 0, 0, pacman.PLAYER);
            this.maps[0][0][0] = player;
            this.entities.push(player);
            pacman.ENTITY = this.entities[0];
        } 
    }

    drawBoard() {
        let map = this.maps[0];
        let tab = document.getElementById("tab");
        for (let i = 0; i < map.length; i++) {
            for(let j = 0; j < map[i].length; j++) {
                if (typeof map[i][j] == 'object'){
                    if (map[i][j].type === pacman.PLAYER) {
                        tab.innerHTML +='P';
                    } 
                } else {
                    if(map[i][j] == 0){
                        tab.innerHTML += '·';
                    }else if(map[i][j] == 1){
                        tab.innerHTML += 'W';
                    }
                }
            }
            tab.innerHTML += "</br>";
        }
    }

    moveEntity(entity, x, y) {
        let map = this.maps[entity.z];
        if (x >= 0 && x < map[y].length && y >= 0 && y < map.length) {
            // this.maps.splice(x,y,entity);
            map[entity.y][entity.x] = 0;
            entity.x = x;
            entity.y = y;
            map[y][x] = entity;
            this.drawBoard();
        }
    
    }
}