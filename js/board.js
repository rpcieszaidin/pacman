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
            let player = new pacman.Entity(0, 0, 0, type);
            this.maps[0][0][0] = player;
            this.entities.push(player);
        }else if(type === pacman.ENEMY){
            let ghost = new pacman.Entity(5, 4, 0, type);
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
            if(entity.type == enti.type && entity.type == pacman.PLAYER){
                let map = this.maps[enti.z];
                if ((x >= 0 && x < this.maps[enti.z][x].length || y >= 0 && y < this.maps[enti.z][x][y].length)){
                    //console.log('dentro');
                    if(map[x][y] == 0){
                        //console.log('camino');
                        let a = enti.x;
                        let b = enti.y;
                        map[a][b] = 0;
                        enti.y = y
                        enti.x = x;
                        map[x][y] = enti;
                        this.board.innerHTML = '';
                        this.drawBoard();
                    }
                }   
            }
        });   
    }
            
    move(entity){
        if(entity.type == pacman.PLAYER){
            document.addEventListener("keyup", (e)=>{
                switch(e.key){
                    case 'ArrowUp':
                        console.log('arriba');
                        this.moveEntity(entity, entity.x -1, entity.y);
                        break;
                    case 'ArrowDown':
                        console.log('abajo');
                        this.moveEntity(entity, entity.x +1, entity.y);
                        break;
                    case 'ArrowLeft':
                        console.log('izquierda');
                        this.moveEntity(entity, entity.x, entity.y-1);
                        break;
                    case'ArrowRight':
                    console.log('derecha');
                        this.moveEntity(entity, entity.x, entity.y+1);
                        break;
                    }
            },false);
        }else if(entity.type == pacman.ENEMY){
              let map = this.maps[entity.z];
              
              //array de fantasma
              let mv = [];
              let posisiconx = entity.x - 1;
            if(map[posisiconx][entity.y]){
                if(map[posisiconx][entity.y] === 0){
                    mv.push('1');
                }
                posisiconx = entity.x + 1;
                if(map[posisiconx][entity.y]){
                if(this.maps[entity.z][posisiconx][entity.y] === 0){
                    mv.push('2');
                }
            }
            posisiconx = entity.y - 1;
                if(map[entity.x][posisiconx]) {
                if(map[entity.x][posisiconx] === 0){
                    mv.push('3');
                }
            }
            posisiconx = entity.y +1;
                if(map[entity.x][posisiconx]){
                if(map[entity.x][posisiconx] === 0){
                    mv.push('4');
                }
            }
        }
            let num = Math.floor(Math.random()*mv.length);
        }
    }
}