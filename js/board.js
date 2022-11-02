var pacman = pacman || {};

pacman.PLAYER = 98;
pacman.ENEMY = 90;


pacman.Board = class {
    constructor() {
        this.maps = [
            [
                [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 2],
                [0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0],
                [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
                [0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0],
                [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
                [0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0],
                [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0]
            ],
            [
                [2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
                [0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0],
                [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
                [0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0],
                [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
                [0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0],
                [3, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0]
            ],
            [
                [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
                [0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0],
                [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
                [0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0],
                [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
                [0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0],
                [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 3]
            ]
        ];
        this.entities = [];
        this.world = JSON.parse(JSON.stringify(this.maps));
    }

    correctPosition(entity){
        let map = this.world[entity.z];
        if(map[entity.y][entity.x] == 0){
            map[entity.y][entity.x] = entity;
            this.entities.push(entity);
            entity.move(this.world, entity, this);
        }
    }

    addEntity(type, x, y ,z) {
        let entity = null;
        this.restart(entity);
        if (type === pacman.PLAYER) {
            entity = new pacman.Pacman(x, y, z, pacman.PLAYER);
            this.correctPosition(entity);
        }else{
            entity = new pacman.Pacman(x, y, z, pacman.ENEMY);
            this.correctPosition(entity);
        }
    }

    drawBoard(entity) {
        let map = this.world[entity.z];
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
                }else if (map[i][j] == 1){
                    space.setAttribute("class" , "block");
                }else if (map[i][j] == 2){
                    space.setAttribute("class" , "stairup");
                }else{
                    space.setAttribute("class" , "stairdown");
                }

                div.appendChild(space);
            } 
            div.appendChild(document.createElement('br'));
        }
    }

    moveEntity(entity, x, y) {
        let div = document.getElementById('map');
        let end = document.getElementById('end');
        let map = this.world[entity.z];
        if (x >= 0 && x < map[entity.y].length && y >= 0 && y < map.length) {
            if(map[y][x] == 0){
                map[entity.y][entity.x] = 0;
                entity.x = x;
                entity.y = y;
                map[y][x] = entity;
                while (div.firstChild) {
                    div.removeChild(div.firstChild);
                }  
                this.drawBoard(entity);
            
            }else if(map[y][x] != 2 && map[y][x] != 3){
                const myPromise = new Promise((resolve, reject) => {
                    if(map[y][x] != 1){
                        resolve(); 
                    }
                });
                myPromise.then(value => {
                    clearInterval(pacman.INTERVAL);
                    div.style.display = "none";
                    end.innerHTML = 'DEFEATED';
                    end.style.display = "block";
                    });
            }else if(map[y][x] == 2 && entity.type == pacman.PLAYER){
               
                map[entity.y][entity.x] = 0;
                entity.x = x;
                entity.y = y;
                map[y][x] = 2;
                this.entities.forEach(element => {
                    element.z ++;
                });
                
                

            }else if(map[y][x] == 3 && entity.type == pacman.PLAYER){
                
                map[entity.y][entity.x] = 0;
                entity.x = x;
                entity.y = y;
                map[y][x] = 3;
                this.entities.forEach(element => {
                    element.z --;
                });
            }
        }
    }

    restart(){
        let but = document.getElementById('but');
        but.addEventListener("click", restart);
        function restart(){
            window.location.reload();

        }
    }





}