var pacman = pacman || {};

pacman.PLAYER = 98;
pacman.ENEMY = 90;

pacman.Board = class {
    constructor() {
        this.maps = [
            [
                [0, 0, 1, 0, 0, 0], [0, 0, 1, 0, 0, 1], [0, 0, 0, 0, 0, 0], [1, 1, 0, 1, 0, 0], [0, 0, 0, 1, 0, 0]
            ]
        ];
        this.entities = [];
    }
    correctPosition(entity){
            if(this.maps[entity.z][entity.y][entity.x] = 0){
                this.maps[entity.z][entity.y][entity.x] = entity;
            }else{
                console.log('La entidad no se pude generar');
            }
        }
    addEntity(type) {
        if (type === pacman.PLAYER) {
            // implementar metodo posicion correcta
            let player = new pacman.Pacman(0, 0, 0, pacman.PLAYER);
            this.entities.push(player);
            this.correctPosition(player);
            correctPosition(player);
        }else{
            let npc = new pacman.Pacman(0,4,1, pacman.ENEMY);
            this.entities.push(npc);
            this.correctPosition(npc);
            correctPosition(npc);
        }
    }

    

    drawBoard() {
        let map = this.maps[0];
        for (let i = 0; i < map.length; i++) {
            for(let j = 0; j < map[i].length; j++) {
                if (typeof map[i][j] == 'object'){
                    if (map[i][j].type === pacman.PLAYER) {
                        console.log('P');
                    }else{
                        console.log('E');
                    } 
                } else {
                    console.log(map[i][j]);
                }
            }
        }
    }

    moveEntity(entity, x, y) {
        let map = this.maps[entity.z];
        if (x >= 0 && x < map[y].length && y >= 0 && y < map.length) {
            entity.x = x;
            entity.y = y;
        }
    }
}