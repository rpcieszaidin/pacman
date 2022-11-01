var pacman = pacman || {};
pacman.PLAYER = "P";
pacman.ENEMY = "G";
pacman.PATH = 0;
pacman.WALL = 1;
pacman.DOORUP = 7;
pacman.DOORDOWN = 9;
UP=8;
DOWN=2;
LEFT=3;
RIGHT=4;
const gameSpace = document.getElementById("gameSpace");
var playableChar;
pacman.Board = class {
    constructor() {
        this.maps = [
            [
                [0, 0, 1, 0, 0, 0, 0, 0, 0, 0], 
                [0, 0, 1, 0, 0, 1, 0, 0, 1, 0], 
                [0, 0, 0, 0, 0, 0, 0, 0, 1, 0], 
                [1, 1, 0, 1, 0, 0, 0, 0, 1, 0], 
                [0, 0, 0, 1, 0, 0, 0, 0, 0, 9]
            ],
            [
                [1, 1, 1, 1, 1, 1, 0, 0, 0, 7], 
                [0, 0, 1, 0, 0, 1, 0, 0, 1, 0], 
                [0, 0, 0, 0, 0, 0, 0, 0, 1, 0], 
                [1, 1, 0, 1, 0, 0, 0, 0, 1, 0], 
                [0, 0, 0, 1, 0, 0, 0, 0, 0, 0]
            ]
        ];
        this.mapcopy = JSON.parse(JSON.stringify(this.maps));
        this.entities = [];
        this.gameState=true;
    }
    gameStart(){
      document.getElementById("reset").onclick=()=>this.reset();
      this.entities.forEach(element => {
        if(element.type==pacman.ENEMY)
        element.enemyStart();
        else if(element.type==pacman.PLAYER){
            document.getElementById("up").onclick=()=>element.movePlayers(UP, element);
            document.getElementById("down").onclick=()=>element.movePlayers(DOWN, element);
            document.getElementById("left").onclick=()=>element.movePlayers(LEFT, element);
            document.getElementById("right").onclick=()=>element.movePlayers(RIGHT, element);
            playableChar = element;
        }})
        this.drawBoard(playableChar);
    }
    randomStarter(ent, floor){
        let pos,pos2;
        do {
          pos=Math.floor(Math.random()*this.maps[0].length);
          pos2=Math.floor(Math.random()*this.maps[0][0].length);
        }
        while(!this.mapcopy[floor][pos][pos2].type==pacman.PATH)
        ent.x=pos;
        ent.y=pos2;
        
        ent.z=floor;
    }
    addEntity(type, floor) {
        let entity = null;
        if (type===pacman.PLAYER)
            entity=new pacman.Entity(pacman.PLAYER, this);
        else if(type===pacman.ENEMY)
            entity = new pacman.Entity(pacman.ENEMY, this);
        else if(type===pacman.DOOR)
            entity = new pacman.Entity(pacman.DOOR, this);
        this.randomStarter(entity, floor);
        
        this.mapcopy[floor][entity.x][entity.y]=entity;
        this.entities.push(entity);
    }
    drawBoard(ent) {
      gameSpace.innerHTML="";
      this.mapcopy = JSON.parse(JSON.stringify(this.maps));
        let map = this.mapcopy[ent.z];
        this.entities.forEach(element => {
            if(element.z==ent.z)
            map[element.x][element.y]= element.type;
        });
        map.forEach(element => {
            gameSpace.innerHTML+="<br>";
            element.forEach(theelement =>{
                let a = document.createElement("div");
                a.innerHTML=theelement;
                gameSpace.appendChild(a);
            })
        })
        
    }
    moveEntity(entity, x, y) {
        if (x >= 0 && x < this.maps[0].length && y >= 0 && y < this.maps[0][0].length) {
          if(this.maps[entity.z][x][y]==pacman.PATH ){
            entity.x=x;
            entity.y=y;
          }else if(this.maps[entity.z][x][y]==pacman.DOORUP ){
            entity.z--;
          }
          else if(this.maps[entity.z][x][y]==pacman.DOORDOWN ){
            entity.z++;
          }
          if(entity.z==playableChar.z)
          this.drawBoard(entity);
        }
    }
    gameEnd(){
        document.getElementById("up").onclick=null;
        document.getElementById("down").onclick=null;
        document.getElementById("right").onclick=null;
        document.getElementById("left").onclick=null;
        this.entities.forEach(element => {
                element.enemyEnd();
        })
        document.getElementById("lose").innerHTML="YOU LOSE";
    }
    reset(){
        this.gameEnd();
        document.getElementById("lose").innerHTML="";
        this.entities.forEach(element => {
            this.randomStarter(element, element.z);
        });
        this.gameStart();
    }
}
