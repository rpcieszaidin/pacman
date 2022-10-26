pacman.Entity = class {
    constructor(type, board) {
        this.x;
        this.y;
        this.z;
        this.type = type;
        this.board=board;
        this.intervalSetter=null;
    }
    //TODO Introducir cosas de entidad y no dejarlas todas en board
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
        //TO DO Esto en una promesa
        if(this.board.maps[0][playableChar.x][playableChar.y].type == pacman.ENEMY) board.gameEnd();

        board.entities.forEach(element => {
          if(element.type==pacman.ENEMY){
            if(playableChar.x>element.x)
                board.moveEntity(element, element.x+1, element.y);
            else if(playableChar.y>element.y)
                board.moveEntity(element, element.x, element.y+1)
            else if(playableChar.x<element.x)
                board.moveEntity(element, element.x-1, element.y)
            else if(playableChar.y<element.y)
                board.moveEntity(element, element.x, element.y-1)
          }
        });
      }
    enemyStart(){
        this.intervalSetter=setInterval(()=>this.enemyMovement(), 1000);
    }
    //TO DO como actualmente no hay un final de juego no hago clear interval
    //HAY QUE HACER CLEAR INTERVAL
    enemyEnd(){
        clearInterval(this.intervalSetter);
   }
}