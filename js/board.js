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
            ],
            [
                [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 2],
                [0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0],
                [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
                [0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0],
                [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
                [0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            ],
            [
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0],
                [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
                [0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0],
                [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
                [0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0],
                [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 2]
            ]
        ];
        this.entities = [];
    }

    correctPosition(entity){
        let map = this.maps[entity.z];
        if(map[entity.y][entity.x] == 0){
            map[entity.y][entity.x] = entity;
            this.entities.push(entity);
            entity.move(this.maps, entity, this);
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
        let end = document.getElementById('end');
        let map = this.maps[entity.z];
        if (x >= 0 && x < map[entity.y].length && y >= 0 && y < map.length) {
            if(map[y][x] == 0){
                map[entity.y][entity.x] = 0;
                entity.x = x;
                entity.y = y;
                map[y][x] = entity;
                while (div.firstChild) {
                    div.removeChild(div.firstChild);
                }  
                this.drawBoard(0);
            
            }else if(map[y][x].type != pacman.ENEMY){
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