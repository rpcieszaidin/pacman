var pacman = pacman || {};

pacman.PLAYER = 98;
pacman.ENEMY = 1;
pacman.STAIR= 0;

pacman.Board = class {
    constructor() {
        this.maps = [
            [
                [0, 0, 1, 0, 0, 0], [0, 0, 1, 0, 0, 1], [0, 0, 0, 0, 0, 0], [1, 1, 0, 1, 0, 0], [0, 0, 0, 1, 0, 0]
            ],
            [
                [0, 0, 0, 0, 0, 0], [0, 1, 1, 1, 1, 0], [0, 0, 1, 1, 0, 0], [1, 0, 0, 0, 0, 1], [0, 0, 0 ,0, 0, 0]
            ]
        ];
        this.entities = [];
        this.board = document.getElementById("board");
        this.interval = null;
        this.changeMap = 0;
    }

    addEntity(type) {
        let entity = null;
        if (type === pacman.PLAYER) {
            // implementar metodo posicion correcta
            entity = new pacman.Entity(0, 0, this.changeMap, pacman.PLAYER);
            
        }else if(type === pacman.ENEMY){
            entity = new pacman.Entity(4,5,this.changeMap, pacman.ENEMY);
        }else{
            entity = new pacman.Entity(4,0,this.changeMap, pacman.STAIR);
        }
        this.maps[entity.z][entity.x][entity.y] = entity;
        this.entities.push(entity);
    }

    drawBoard() {
        let map;
        if(this.maps[this.changeMap]){
            map = this.maps[this.changeMap];
        }
        for (let i = 0; i < map.length; i++) {
            for(let j = 0; j < map[i].length; j++) {
                if (typeof map[i][j] == 'object'){
                    if (map[i][j].type === pacman.PLAYER) {
                        this.board.innerHTML += 'P';
                    }else if(map[i][j].type === pacman.ENEMY){
                        this.board.innerHTML += 'X';
                    }else{
                        this.board.innerHTML += 'S';
                    }
                } else {
                    this.board.innerHTML += map[i][j];
                }
            }
            this.board.innerHTML += '<br>';
        }
        if(this.entities.length==6){
            this.entities.length=3;
        }
    }

    moveEntity(entity, x, y) {
                let map = this.maps[entity.z];
                //Compruebo que el movimiento este en los limites
                if ((x >= 0 && x < map[x].length || y >= 0 && y < map[x][y].length)){
                    //Si pasa las comprobaciones el movimiento es corecto y se mueve
                    if(map[x][y] == 0){
                        let a = entity.x;
                        let b = entity.y;
                        map[a][b] = 0;
                        entity.z = entity.z;
                        entity.y = y
                        entity.x = x;
                        map[x][y] = entity;
                        this.board.innerHTML = '';
                        this.drawBoard();
                    }else if( typeof map[x][y] == 'object'){
                        if(map[x][y].type == pacman.STAIR){
                            this.changeMap++;
                            this.board.innerHTML = '';
                            this.placeEntities();
                            this.addEntity(pacman.STAIR);
                            this.addEntity(pacman.PLAYER);
                            this.addEntity(pacman.ENEMY);
                            this.drawBoard();
                        }
                        else if(map[x][y].type = pacman.PLAYER){
                            let a = entity.x;
                            let b = entity.y;
                            map[a][b] = 0;
                            entity.z = entity.z;
                            entity.y = y
                            entity.x = x;
                            map[x][y] = entity;
                            this.board.innerHTML = '';
                            this.drawBoard();
                            clearInterval(this.interval);
                            this.interval = null;
                            document.removeEventListener('keyup',this.movingPlayer);
                            console.log('You lose');
                        }
                        else if(map[x][y].type == pacman.ENEMY){
                            let a = entity.x;
                            let b = entity.y;
                            map[a][b] = 0;
                            entity.z = entity.z;
                            entity.y = y;
                            entity.x = x;
                            map[x][y] = 'X';
                            this.board.innerHTML = '';
                            this.drawBoard();
                            clearInterval(this.interval);
                            this.interval = null;
                            document.removeEventListener('keyup',this.movingPlayer);
                            console.log('You lose');
                        }
                    }

                }   
            }
    
            

    movePlayer(entity){
        this.entities.forEach(ent => {
            if(entity.type == ent.type && entity.type == pacman.PLAYER){
                document.addEventListener('keyup', this.movingPlayer);
            }
        });
    }

    movingPlayer = (e) =>{
        this.entities.forEach(ent => {
            if(ent.type == pacman.PLAYER){
                switch(e.key){
                    case 'ArrowUp':
                        console.log('move');
                        this.moveEntity(ent, ent.x -1, ent.y);
                        break;
                    case 'ArrowDown':
                        this.moveEntity(ent, ent.x +1, ent.y);
                        break;
                    case 'ArrowLeft':
                        this.moveEntity(ent, ent.x, ent.y-1);
                        break;
                    case'ArrowRight':
                        this.moveEntity(ent, ent.x, ent.y+1);
                        break;
                    default:
                        console.log('Muévase con las flechas');
                }
            }
        });
    }

    movingEnemy(entity){
        this.entities.forEach(ent => {
            if(entity.type == ent.type && entity.type == pacman.ENEMY){
                let map = this.maps[ent.z];
                let movements = [];
                let pos = ent.x -1;
                let a = map.length;
                if(ent.x < map.length && ent.x > 0){
                    console.log(map[pos][ent.y]);
                    if(map[pos][ent.y] == 0 || typeof map[pos][ent.y] == 'object'){
                        movements.push(1);
                    }
                }
                a = map.length -1
                if(ent.x < a && ent.x >= 0 ){
                    pos = ent.x +1;
                    console.log(map[pos][ent.y]);
                    if(map[pos][ent.y] == 0 ||  typeof map[pos][ent.y] == 'object'){
                        movements.push(2);
                    }
                }
                a = map[ent.x].length
                if(ent.y <= a && ent.y > 0){
                    pos = ent.y-1;
                    console.log(map[ent.x][pos]);
                        if(map[ent.x][pos] == 0 ||  typeof map[ent.x][pos] == 'object'){
                        movements.push(3);
                    }
                }
                a = map[ent.x].length -1
                if(ent.y < a && ent.y >= 0){
                    pos = ent.y +1;
                    console.log(map[ent.x][pos]);
                    if(map[ent.x][pos] == 0 ||  typeof map[ent.x][pos] == 'object'){
                        movements.push(4);
                    }
                }
                let size = movements.length;
                let num = Math.round(Math.random()*(size-1));
                let n = movements[num];
                switch(n){
                    case 1: 
                        this.moveEntity(ent, ent.x -1, ent.y);
                        break;
                    case 2: 
                        this.moveEntity(ent, ent.x +1, ent.y);
                        break;
                    case 3: 
                        this.moveEntity(ent, ent.x, ent.y -1);
                        break;
                    case 4: 
                        this.moveEntity(ent, ent.x, ent.y +1);
                        break;
                    default:
                        console.log('Fuera de los límites');
                }
            }
        });
    }

    moveEnemy(entity){
        this.interval = setInterval(() => this.movingEnemy(entity),1000);
    }

    placeEntities(){
        this.entities.forEach(entity => {
            if(entity.type == pacman.PLAYER){
                entity.z++;
                entity.x=0;
                entity.y=0;
            }else if(entity.type == pacman.ENEMY){
                entity.z++;
                entity.x=4;
                entity.y=5;
            }
        });
    }
}
