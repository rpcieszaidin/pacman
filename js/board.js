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
        let entity = null;
        if (type === pacman.PLAYER) {
            // implementar metodo posicion correcta
            entity = new pacman.Entity(0, 0, 0, pacman.PLAYER);
            
        }else{
            entity = new pacman.Entity(4,5,0, pacman.ENEMY);
        }
        this.maps[entity.z][entity.x][entity.y] = entity;
        this.entities.push(entity);
    }

    drawBoard() {
        let map = this.maps[0];
        for (let i = 0; i < map.length; i++) {
            for(let j = 0; j < map[i].length; j++) {
                if (typeof map[i][j] == 'object'){
                    if (map[i][j].type === pacman.PLAYER) {
                        this.board.innerHTML += 'P';
                    }else{
                        this.board.innerHTML += 'X';
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
            if(entity.type == ent.type && entity.type == pacman.PLAYER){
                console.log('1');
                let map = this.maps[ent.z];
                //Compruebo que el movimiento este en los limites
                if (!(x >= 0 && x < map[y].length && y >= 0 && y < map.length)) return false
                //Estas dos coprobaciones son para que no quiera moverse en dos direcciones a la vez
                if(!(entity.x == x && entity.y + 1 == y || entity.x == x && entity.y -1 == y)) return false
                if(!(entity.x == x && entity.y + 1 == y || entity.x == x && entity.y -1 == y)) return false
                //Si pasa las comprobaciones el movimiento es corecto y se mueve
                console.log('2');
                if(map[x][y] == 0){
                    console.log('3');
                    let a = ent.x;
                    let b = ent.y;
                    map[a][b] = 0;
                    console.log(map[a][b]);
                    ent.z = map;
                    ent.x = x;
                    ent.y = y;
                    map[x][y] = ent;
                    this.board.innerHTML = '';
                    this.drawBoard();
                }
                
            }else if(entity.type == ent.type && entity.type == pacman.ENEMY){
                let map = this.maps[ent.z];
                if (x >= 0 && x < map[y].length && y >= 0 && y < map.length) {
                    let rnd = Math.round(Math.random()*(4-1+1));
                    switch(rnd){
                        case 1: 
                    }
                }
            }
        });
    }

    move(entity){
        console.log('try');
        document.addEventListener("keyup", (e)=>{
            console.log('in');
            switch(e.key){
                case 'ArrowUp':
                    console.log('move');
                    this.moveEntity(entity, entity.x -1, entity.y);
                    break;
                case 'ArrowDown':
                    this.moveEntity(entity, entity.x +1, entity.y);
                    break;
                case 'ArrowLeft':
                    this.moveEntity(entity, entity.x, entity.y-1);
                    break;
                case'ArrowRight':
                    this.moveEntity(entity, entity.x, entity.y+1);
                    break;
                default:
                    console.log('Muévase con las flechas');
            }
        },false);
    }

}