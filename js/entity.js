pacman.Entity = class {
    constructor(type) {
        this.x;
        this.y;
        this.z;
        this.type = type;
    }
    //TODO Esto es inutil bajo la idea actual del programa
/*    movePlayer(num){
        switch (num) {
            case 8:
                Board.moveEntity(Board.entities[0], this.x+1, this.y);
                break;
            case 2:
                Board.moveEntity(Board.entities[0], this.x-1, this.y);
            case 4:
                Board.moveEntity(Board.entities[0], this.x, this.y-1);
            case 6:
                Board.moveEntity(Board.entities[0], this.x, this.y+1);
            default:
                break;
        }
    }
*/}
