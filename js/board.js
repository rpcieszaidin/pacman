var pacman = pacman || {};
pacman.PLAYER = 9;
pacman.ENEMY = 3;
pacman.PATH = 0;
pacman.WALL = 1;
const gameSpace = document.getElementById("gameSpace");

pacman.Board = class {
    constructor() {
        this.maps = [
            [
                [0, 0, 1, 0, 0, 0], [0, 0, 1, 0, 0, 1], [0, 0, 0, 0, 0, 0], [1, 1, 0, 1, 0, 0], [0, 0, 0, 1, 0, 0]
            ]
        ];
        this.entities = [];
    }
    randomStarter(ent){
        let pos,pos2;
        do {
            pos=Math.floor(Math.random() * this.maps[0].length);
            pos2=Math.floor(Math.random() * this.maps[0][0].length);   
        } 
        while(!this.maps[0][pos][pos2].type == pacman.PATH)
        ent.x= pos;
        ent.y=pos2;
    }
    addEntity(type) {
        let entity = null;
        if (type === pacman.PLAYER) entity = new pacman.Entity(pacman.PLAYER);
            
         else if(type === pacman.ENEMY)
            entity = new pacman.Entity(pacman.ENEMY);
            
            this.randomStarter(entity);
        this.maps[0][entity.x][entity.y] = entity;
            this.entities.push(entity);
    }
    createBoard(){
        //TODO implementarlo en un foreach que funcione
        for (let i = 0; i < this.maps[0].length; i++) {
            for(let j = 0; j < this.maps[0][i].length; j++) {
                if(this.maps[0][i][j] == 0)   
                    this.maps[0][i][j] = new pacman.Entity(pacman.PATH);
                else  
                    this.maps[0][i][j] = new pacman.Entity(pacman.WALL);
            }
        }
    }
    drawBoard() {
        let map = this.maps[0];
        map.forEach(element => {
            gameSpace.innerHTML+="<br>";
            element.forEach(theelement =>{
                let a = document.createElement("div");
                a.innerHTML=theelement.type;
                gameSpace.appendChild(a);
                
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