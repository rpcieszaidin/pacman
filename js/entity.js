pacman.Entity = class {
    constructor(type, board) {
        this.x;
        this.y;
        this.z;
        this.type = type;
        this.board=board;
        this.intervalSetter=null;
    }    
     movePlayers(num, entity){
        
          switch (num) {
              case DOWN:
                  board.moveEntity(entity, entity.x+1, entity.y);
                  break;
              case UP:
                  board.moveEntity(entity, entity.x-1, entity.y);
                  break;
              case LEFT:
                  board.moveEntity(entity, entity.x, entity.y-1);
                  break;
              case RIGHT:
                  board.moveEntity(entity, entity.x, entity.y+1);
                  break;
              default:
                  break;
          }
    }
    enemyMovement(){
        board.entities.forEach(element => {
            //TO DO Esto en una promesa
            if(playableChar.x == element.x && playableChar.y == element.y && element.type == pacman.ENEMY && playableChar.z==element.z) this.board.gameEnd();
        })
            if(playableChar.x>this.x)
                board.moveEntity(this, this.x+1, this.y);
            else if(playableChar.y>this.y)
                board.moveEntity(this, this.x, this.y+1);
            else if(playableChar.x<this.x)
                board.moveEntity(this, this.x-1, this.y);
            else if(playableChar.y<this.y)
                board.moveEntity(this, this.x, this.y-1);
      }
    enemyStart(){
        this.intervalSetter=setInterval(()=>this.enemyMovement(), 1000);
    }
    enemyEnd(){
        clearInterval(this.intervalSetter);
   }  
}