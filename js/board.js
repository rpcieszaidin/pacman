var pacman = pacman || {};

pacman.PLAYER = 98;
pacman.ENEMY = 10;
pacman.ENTITY = "";
pacman.ENTITY2= "";

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
        let player = null;
        if (type === pacman.PLAYER) {
            // implementar metodo posicion correcta
            player = new entity.Character(0, 0, 0, pacman.PLAYER);
            this.maps[0][0][0] = player;
            this.entities.push(player);
            pacman.ENTITY = this.entities[0];
         }else if(type === pacman.ENEMY){
             player = new entity.Character(0, 4, 5, pacman.ENEMY);
             this.maps[0][4][5] = player;
             this.entities.push(player);
            pacman.ENTITY2 = this.entities[1];
         } 
    }

    drawBoard() {
        let map = this.maps[0];
        let tab = document.getElementById("tab");
        tab.textContent = "";
        for (let i = 0; i < map.length; i++) {
            for(let j = 0; j < map[i].length; j++) {
                if (typeof map[i][j] == 'object'){
                    if (map[i][j].type === pacman.PLAYER) {
                        tab.innerHTML +="<div class="+'pacman'+">·</div>";
                    }else if(map[i][j].type === pacman.ENEMY){
                        tab.innerHTML +="<div class="+'ghost'+">"+'G'+"</div>";
                    }
                } else {
                    if(map[i][j] == 0){
                        tab.innerHTML +="<div class="+'star'+">"+ '·'+"</div>";
                    }else if(map[i][j] == 1){
                        tab.innerHTML +="<div class="+'wall'+">"+ 'W'+"</div>";
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
            if (map[y][x] == 0){
                map[entity.y][entity.x] = 0;
                entity.x = x;
                entity.y = y;
                map[y][x] = entity;
            }else if(map[y][x] == 1){
                map[entity.y][entity.x] = entity;    
            }
            this.drawBoard();
        }
    }
}