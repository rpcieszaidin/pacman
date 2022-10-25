var pacman = pacman || {};
pacman.PLAYER = 9;
pacman.ENEMY = 3;
pacman.PATH = 0;
pacman.WALL = 1;
UP=8;
DOWN=2;
LEFT=4;
RIGHT=6;
const gameSpace = document.getElementById("gameSpace");

pacman.Board = class {
    constructor() {
        this.maps = [
            [
                [0, 0, 1, 0, 0, 0, 0, 0, 0, 0], [0, 0, 1, 0, 0, 1, 0, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, ], [1, 1, 0, 1, 0, 0, 0, 0, 1, 0], [0, 0, 0, 1, 0, 0, 0, 0, 0, 0]
            ]
        ];
        this.entities = [];
    }
    gameStart(){
      document.getElementById("up").onclick=()=>this.movePlayers(UP, this.entities[0]);
      document.getElementById("down").onclick=()=>this.movePlayers(DOWN, this.entities[0]);
      document.getElementById("left").onclick=()=>this.movePlayers(LEFT, this.entities[0]);
      document.getElementById("right").onclick=()=>this.movePlayers(RIGHT, this.entities[0]);
      this.entities.forEach(element => {
        if(element.type==pacman.ENEMY)
      this.enemyStart(element);})
    }
    randomStarter(ent){
        let pos,pos2;
        do {
          //Posicionamiento manual temporal para comprobaciones de movimiento
          // pos=0;
          // pos2=0;
          pos=Math.floor(Math.random()*this.maps[0].length);
          pos2=Math.floor(Math.random()*this.maps[0][0].length);
        }
        while(!this.maps[0][pos][pos2].type==pacman.PATH)
        ent.x=pos;
        ent.y=pos2;
        //TO DO tener en cuenta al hacer multidimensional
        ent.z=0;
    }
    addEntity(type) {
        let entity = null;
        if (type===pacman.PLAYER)
          entity=new pacman.Entity(pacman.PLAYER);
        else if(type===pacman.ENEMY)
            entity = new pacman.Entity(pacman.ENEMY);
        this.randomStarter(entity);
        //TO DO tener en cuenta al hacer multidimensional
        this.maps[0][entity.x][entity.y]=entity;
        this.entities.push(entity);
    }
    createBoard(){
        //TODO implementarlo en un foreach que funcione
        for (let i = 0; i < this.maps[0].length; i++) {
            for(let j = 0; j < this.maps[0][i].length; j++) {
                if(this.maps[0][i][j]==0)
                    this.maps[0][i][j]=new pacman.Entity(pacman.PATH);
                else
                    this.maps[0][i][j]=new pacman.Entity(pacman.WALL);
            }
        }
    }
    drawBoard() {
      gameSpace.innerHTML="";
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
    moveEntity(entity, x, y) {
        if (x >= 0 && x < this.maps[0].length && y >= 0 && y < this.maps[0][0].length) {
          if(this.maps[entity.z][x][y].type==pacman.PATH){
            this.maps[entity.z][entity.x][entity.y]= new pacman.Entity(pacman.PATH);
            entity.x=x;
            entity.y=y;
            this.maps[entity.z][x][y]=entity;
          }
          this.drawBoard();
        }
    }
    //TODO esto deberia ir en la entidad, no tiene sentido que esté aqui
    //pero no consigo llamar a los metodos de board desde la clase entidad
      movePlayers(num, entity){
          switch (num) {
              case DOWN:
                  this.moveEntity(entity, entity.x+1, entity.y);
                  break;
              case UP:
                  this.moveEntity(entity, entity.x-1, entity.y);
                  break;
              case LEFT:
                  this.moveEntity(entity, entity.x, entity.y-1);
                  break;
              case RIGHT:
                  this.moveEntity(entity, entity.x, entity.y+1);
                  break;
              default:
                  break;
          }
      }
     enemyStart(entity){
         entity.intervalSetter= setInterval(()=>this.enemyMovement(), 1000);
     }
     //TO DO como actualmente no hay un final de juego no hago clear interval
     //HAY QUE HACER CLEAR INTERVAL
     enemyEnd(){
         clearInterval(this.intervalSetter);
     }
    enemyMovement(){
      //TO DO Esta solucion es tan elegante como un martillazo en las costillas
      //TO DO quitar el caramelito de tener al jugador como entidad 0
      let player = this.entities[0];
      this.entities.forEach(element => {
        if(element.type==pacman.ENEMY){
          if(player.x>element.x && this.maps[0][element.x+1][element.y].type==pacman.PATH)
              this.moveEntity(element, element.x+1, element.y);
          else if(player.y>element.y && this.maps[0][element.x][element.y+1].type==pacman.PATH)
              this.moveEntity(element, element.x, element.y+1)
          else if(player.x<element.x && this.maps[0][element.x-1][element.y].type==pacman.PATH)
               this.moveEntity(element, element.x-1, element.y)
          else if(player.y<element.y && this.maps[0][element.x][element.y-1].type==pacman.PATH)
              this.moveEntity(element, element.x, element.y-1)
        }
      });
    }
}
