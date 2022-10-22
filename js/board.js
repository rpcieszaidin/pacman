var pacman = pacman || {};
pacman.PLAYER = 9;
pacman.ENEMY = 3;
pacman.PATH = 0;
pacman.WALL = 1;
pacman.Board = class {
    constructor() {
        this.maps = [
            [
                [0, 0, 1, 0, 0, 0], [0, 0, 1, 0, 0, 1], [0, 0, 0, 0, 0, 0], [1, 1, 0, 1, 0, 0], [0, 0, 0, 1, 0, 0]
            ]
        ];
        this.entities = [];
    }
    addEntity(type) {
        let entity = null;
        //TODO implementar posicionamiento ¿aleatorio? comprobando posiciones libres y de personaje
        if (type === pacman.PLAYER) 
            entity = new pacman.Entity(0, 0, 0, pacman.PLAYER);
         else if(type === pacman.ENEMY)
            entity = new pacman.Entity(0, 3, 3, pacman.ENEMY);
        this.maps[0][entity.x][entity.z] = entity;
            this.entities.push(entity);
    }
    createBoard(){
        //TODO implementarlo en un foreach que funcione
        for (let i = 0; i < this.maps[0].length; i++) {
            for(let j = 0; j < this.maps[0][i].length; j++) {
                if(this.maps[0][i][j] == 0)   
                    this.maps[0][i][j] = new pacman.Entity(0, i, j,pacman.PATH);
                else  
                    this.maps[0][i][j] = new pacman.Entity(0, i, j, pacman.WALL);
            }
        }
    }
    drawBoard() {
        let map = this.maps[0];
        map.forEach(element => {
            element.forEach(theel =>{
                console.log(theel.type);
            })  
        })
    }
    //TODO Arreglar este desastre de forma general
    static moveEntity(entity, x, y) {
        let map = this.maps[entity.z];
        if (x >= 0 && x < map[y].length && y >= 0 && y < map.length) {
            //Esto ignora comprobaciones, habrá que implementarlas
            this.maps[entity.z][entity.x][entity.y] = 0;
            entity.x=x;
            entity.y=y;
            this.maps[entity.z][x][y] = entity;
        }
        this.drawBoard();
    }
}