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
                //if ((x >= 0 && x < this.maps[ent.z][x].length || y >= 0 && y < this.maps[ent.z][x][y].length)){
                    //if (!map[x][y]) return false;
                    //Estas dos coprobaciones son para que no quiera moverse en dos direcciones a la vez
                    //if(!((entity.x == x && entity.y + 1 == y) || (entity.x == x && entity.y -1 == y))) return false;
                    //if(!(entity.x == x && entity.y + 1 == y || entity.x == x && entity.y -1 == y)) return false;
                    //Si pasa las comprobaciones el movimiento es corecto y se mueve
                    
                        console.log('2');
                    if(map[x][y] == 0){
                        console.log('3');
                        let a = ent.x;
                        let b = ent.y;
                        map[a][b] = 0;
                        ent.z = map;
                        ent.y = y
                        ent.x = x;
                        ap[x][y] = ent;
                        this.board.innerHTML = '';
                        this.drawBoard();
                    }
                //}   
            }else if(entity.type == ent.type && entity.type == pacman.ENEMY){
                let map = this.maps[ent.z];
                let movements = [];
                if(map[entity.x-1][entity.y] === 0){
                    movements.push(1);
                }
                if(map[entity.x+1][entity.y] === 0){
                    movements.push(2);
                }
                if(map[entity.x][entity.y-1] === 0){
                    movements.push(3);
                }
                if(map[entity.x][entity.y+1] === 0){
                    movements.push(4);
                }
                let num = Math.floor(Math.random()*movements.length);
                console.log(movements);
                console.log(num);
            }
        });   
    }
            

    move(entity){
        document.addEventListener("keyup", (e)=>{
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