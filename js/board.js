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
                [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
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
                this.maps[entity.z][entity.y][entity.x] = entity;
                this.entities.push(entity);
                pacman.Pacman.move(this.maps);
            }//else{
            //     console.log('La entidad no se pude generar');
            // }
        }

    addEntity(type) {
        if (type === pacman.PLAYER) {
            // implementar metodo posicion correcta
            let player = new pacman.Pacman(0, 0, 0, pacman.PLAYER);
            this.correctPosition(player);
        }
        if(type === pacman.ENEMY){
            let npc = new pacman.Pacman(0, 2, 0, pacman.ENEMY);
            this.correctPosition(npc);
        }
    }

    drawBoard() {
        let map = this.maps[0];
        let div = document.getElementById('map');
        
        for (let i = 0; i < map.length; i++) {
            for(let j = 0; j < map[i].length; j++) {
                if (typeof map[i][j] == 'object'){
                    if (map[i][j].type === pacman.PLAYER) {
                        //console.log('P');
                        let space = document.createElement('div');
                        space.setAttribute("class" , "player");
                        div.appendChild(space);
                    }else{
                        //console.log('E');
                        let space = document.createElement('div');
                        space.setAttribute("class" , "npc");
                        div.appendChild(space);
                    } 
                } else if(map[i][j] == 0){
                    let space = document.createElement('div');
                        space.setAttribute("class" , "space");
                        div.appendChild(space);
                    //console.log(map[i][j]);
                }else{
                    let space = document.createElement('div');
                        space.setAttribute("class" , "block");
                        div.appendChild(space);
                } 
            }
            let br = document.createElement('br');
            div.appendChild(br);
        }
    }

    moveEntity(entity, x, y) {
        let div = document.getElementById('map');
        let map = this.maps[entity.z];
        if (x >= 0 && x < map[entity.y].length && y >= 0 && y < map.length) {
            entity.x = x;
            entity.y = y;
            this.maps[entity.z][entity.y][entity.x] = entity;
            while (div.firstChild) {
                div.removeChild(div.firstChild);
            }  
            this.drawBoard();
            
        }
    }


}