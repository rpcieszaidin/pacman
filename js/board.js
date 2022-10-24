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
          //Posicionamiento manual temporal para comprobaciones de movimiento
          pos=0;
          pos2=0;
            //pos=Math.floor(Math.random() * this.maps[0].length);
            //pos2=Math.floor(Math.random() * this.maps[0][0].length);
        }
        while(!this.maps[0][pos][pos2].type == pacman.PATH)
        ent.x= pos;
        ent.y=pos2;
        ent.z=0;
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
    //TODO Por que esta funcion no me funciona en la clase entidad
      movePlayers(num, entity){
          switch (num) {
              case 2:
                  this.moveEntity(entity, entity.x+1, entity.y);
                  break;
              case 8:
                  this.moveEntity(entity, entity.x-1, entity.y);
                  break;
              case 4:
                  this.moveEntity(entity, entity.x, entity.y-1);
                  break;
              case 6:
                  this.moveEntity(entity, entity.x, entity.y+1);
                  break;
              default:
                  break;
          }
      }
    moveEntity(entity, x, y) {
      //TODO por favor termina el movimiento ya no es tan dificil
        if (x >= 0 && x < this.maps[0][y].length && y >= 0 && y < this.maps[0].length) {
            this.maps[entity.z][entity.x][entity.y].type = 0;
            entity.x=x;
            entity.y=y;
            this.maps[entity.z][x][y].type = 9;
        }
      //  this.drawBoard();
    }
}
