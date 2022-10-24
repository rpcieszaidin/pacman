var pacman = pacman || {};

pacman.PLAYER = 98;
pacman.ENEMY = 20;

//0=Camino
//1=Wall
pacman.Board = class {
    constructor() {
        this.maps = [
            [
                [0, 0, 1, 0, 0, 0], [0, 0, 1, 0, 0, 1], [0, 0, 0, 0, 0, 0], [1, 1, 0, 1, 0, 0], [0, 0, 0, 1, 0, 0]
            ]
        ];
        this.entities = [];
    }
/*
showBoard(){
    let maap=maps[0]
    const squares=[];
    for (let i = 0; i < maap.length; i++) {
       const square=document.createElement('div');
       board.appendChild(square);
       squares.push(square);
        if(maap[i]===0){
squares[i].classList.add('pac-dot');
    }else if(maap[i]===1){

    }
    }
    
}
*/
    addEntity(type) {
        if (type === pacman.PLAYER) {
            
            let player = new pacman.Pacman(0, 0, 0, pacman.PLAYER);
            this.maps[0][0][0] = player;
            this.entities.push(player);
        } else if (type === pacman.ENEMY){
            let ghost =new pacman.Ghosts(0,4,5,pacman.ENEMY);
            let ghost2 =new pacman.Ghosts(0,4,5,pacman.ENEMY);
            this.maps[0][4][5]=ghost;
            this.maps[0][4][0]=ghost2;
            this.entities.push(ghost);
            this.entities.push(ghost2);

        }
        
    }

    drawBoard() {
        let map = this.maps[0];
        for (let i = 0; i < map.length; i++) {
            const row=document.createElement('div');
            for(let j = 0; j < map[i].length; j++) {
                const div=document.createElement('div');
                if (typeof map[i][j] == 'object'){
                    if (map[i][j].type === pacman.PLAYER) {
                        console.log('P');
                        div.innerHTML='P';
                    } else if(map[i][j].type === pacman.ENEMY){
                        console.log('G');
                        div.innerHTML='P';
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
            if (map[y][x] == 0){
                map[entity.y][entity.x] = 0;
                entity.x = x;
                entity.y = y;
                map[y][x] = entity;
            }else if(map[y][x] == 1){
                map[entity.y][entity.x] = entity;    
            }
            this.drawBoard();
        }
    }
    }
