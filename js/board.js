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
        this.board = document.getElementById("board");
    }

    addEntity(type) {
        if (type === pacman.PLAYER) {
            // implementar metodo posicion correcta
            let player = new pacman.Entity(0, 0, 0, type);
            this.maps[0][0][0] = player;
            this.entities.push(player);
        }else if(type === pacman.ENEMY){
            let ghost = new pacman.Entity(4, 5, 0, type);
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

    moveEntity(entity, y, x) {
        
        this.entities.forEach(enti => {
            if(entity.type == enti.type && enti.type == pacman.PLAYER){
                let map = this.maps[enti.z];
                if ((y >= 0 && y < this.maps[enti.z][y].length || x >= 0 && x < this.maps[enti.z][y][x].length)){
                    console.log('dentro');
                    if(map[y][x] == 0){
                        console.log('camino');
                        //let a = enti.y;
                        //let b = enti.x;
                        map[enti.y][enti.x] = 0;
                        enti.x = x;
                        enti.y = y;
                        map[y][x] = enti;
                        this.board.innerHTML = '';
                        this.drawBoard();
                    }else if(map[y][x]== 1){
                        console.log('muro');
                        let a = enti.y;
                        let b = enti.x;
                        map[a][b] = 1;
                    }
                }   
            }
            if(entity.type == enti.type && enti.type == pacman.ENEMY){
                let map = this.maps[enti.z];
                if ((y >= 0 && y < this.maps[enti.z][y].length || x >= 0 && x < this.maps[enti.z][y][x].length)){
                    console.log('dentro');
                    if(map[y][x] == 0){
                        console.log('camino');
                        //let a = enti.y;
                        //let b = enti.x;
                        map[enti.y][enti.x] = 0;
                        enti.x = x;
                        enti.y = y;
                        map[y][x] = enti;
                        this.board.innerHTML = '';
                        this.drawBoard();
                    }else if(map[y][x]== 1){
                        console.log('muro');
                        let a = enti.y;
                        let b = enti.x;
                        map[a][b] = 1;
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
                        //console.log('arriba');
                        this.moveEntity(entity, entity.y -1, entity.x);
                        
                        if(entity.y > 0){
                            entity.y = entity.y -1;  
                        } 
                        
                        break;
                    case 'ArrowDown':
                        //console.log('abajo');
                        this.moveEntity(entity, entity.y+1, entity.x);
                        
                        if(entity.y<4){
                            entity.y = entity.y+1;
                        }
                        
                        break;
                    case 'ArrowLeft':
                        //console.log('izquierda');
                        this.moveEntity(entity, entity.y, entity.x-1);
                        
                        if(entity.x > 0){
                            entity.x = entity.x-1;
                        }
                        
                        break;
                    case'ArrowRight':
                        //console.log('derecha');
                        this.moveEntity(entity, entity.y, entity.x+1);
                        
                        if(entity.x < 5){
                            entity.x=entity.x+1;   
                        }  
                        
                        break;
                    }
            },false);
        }
    }    
        
    moveGhost(entity1){
            if(entity1.type == pacman.ENEMY){
                let num = Math.floor(Math.random() * (4 - 1) + 1);
                switch(1){
                    case 1:
                        console.log('arribaG');
                        this.moveEntity(entity1, entity1.y -1, entity1.x);
                        if(entity1.y > 0){
                            entity1.y = entity1.y -1;  
                        }
                        break;
                    case 2:
                        console.log('abajoG');
                        this.moveEntity(entity1, entity1.y+1, entity1.x);
                        if(entity1.y<4){
                            entity1.y = entity1.y+1;
                        }
                        break;
                    case 3:
                        console.log('izquierdaG');
                        this.moveEntity(entity1, entity1.y, entity1.x-1);
                        if(entity1.x > 0){
                            entity1.x = entity1.x-1;
                        }
                        break;
                    case 4:
                        console.log('derechaG');
                        this.moveEntity(entity1, entity1.y, entity1.x+1);
                        if(entity1.x < 5){
                            entity1.x=entity1.x+1;   
                        }
                        break;
                    }  
            }
        }   
        
}