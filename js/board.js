var pacman = pacman || {};
pacman.PLAYER = 9;
pacman.ENEMY = 3;
pacman.PATH = 0;
pacman.WALL = 1;
pacman.DOOR = 7;
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
                [0, 0, 1, 0, 0, 0, 0, 0, 0, 0], [0, 0, 1, 0, 0, 1, 0, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, ], [1, 1, 0, 1, 0, 0, 0, 0, 1, 0], [0, 0, 0, 1, 0, 0, 0, 0, 0, 0]
            ]
        ];
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
    }
    randomStarter(ent){
        let pos,pos2;
        do {
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
            entity=new pacman.Entity(pacman.PLAYER, this);
        else if(type===pacman.ENEMY)
            entity = new pacman.Entity(pacman.ENEMY, this);
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
                    this.maps[0][i][j]=new pacman.Entity(pacman.PATH, this);
                else
                    this.maps[0][i][j]=new pacman.Entity(pacman.WALL, this);
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
          if(this.maps[entity.z][x][y].type==pacman.PATH || this.maps[entity.z][x][y].type==pacman.PLAYER){
            this.maps[entity.z][entity.x][entity.y]= new pacman.Entity(pacman.PATH, this);
            entity.x=x;
            entity.y=y;
            this.maps[entity.z][x][y]=entity;
          }
          this.drawBoard();
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
    }
    //TO DO NO FUNCIONA
    reset(){
        this.gameEnd();
        this.entities.forEach(element => {
            this.randomStarter(element);
        });
        
        this.gameStart();
        this.drawBoard();
    }
}
