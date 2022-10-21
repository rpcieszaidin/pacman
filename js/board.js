var pacman = pacman || {};

pacman.PLAYER = 98;
pacman.ENEMY = 90;

pacman.Board = class {
    constructor() {
        this.maps = [
            [
                [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
                [0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0],
                [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
                [0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0],
                [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
                [0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0],
                [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0]
            ]
        ];
        this.entities = [];
    }

    correctPosition(entity){
            let map = this.maps[entity.z];
            if(map[entity.y][entity.x] == 0){
                map[entity.y][entity.x] = entity;
                this.entities.push(entity);
                entity.move(this.maps, entity);
            }
        }

    addEntity(type) {
        let entity = null;
        if (type === pacman.PLAYER) {
            entity = new pacman.Pacman(0, 0, 0, pacman.PLAYER);
            this.correctPosition(entity);
        }
        if(type === pacman.ENEMY){
            let entity = new pacman.Pacman(0, 2, 0, pacman.ENEMY);
            this.correctPosition(entity);
        }
    }

    drawBoard() {
        let map = this.maps[0];
        let div = document.getElementById('map');
        for (let i = 0; i < map.length; i++) {
            for(let j = 0; j < map[i].length; j++) {
                let space = document.createElement('div');
                if (typeof map[i][j] == 'object'){ 
                    if (map[i][j].type === pacman.PLAYER) {
                        space.setAttribute("class" , "player");
                    }else{
                        space.setAttribute("class" , "npc");
                    } 
                } else if(map[i][j] == 0){
                    space.setAttribute("class" , "space");
                }else{
                    space.setAttribute("class" , "block");
                }
                div.appendChild(space);
            } 
            div.appendChild(document.createElement('br'));
        }
    }

    moveEntity(entity, x, y) {
        let div = document.getElementById('map');
        let map = this.maps[entity.z];
        if (x >= 0 && x < map[entity.y].length && y >= 0 && y < map.length) {
            if(map[y][x] == 0){
                entity.x = x;
            entity.y = y;
            map[entity.y][entity.x] = entity;
            while (div.firstChild) {
                div.removeChild(div.firstChild);
            }  
            this.drawBoard();
            }
        }
    }
}