pacman.Pacman = class {
    constructor(x, y, z, type) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.type = type;
    }

    movePacman(){
        this.move = [];
        var x;
        var y;
        console.log('hoola');
        switch(this.move){
            case 'w':
                x = pacman.ENTITY.x;
                y = pacman.ENTITY.y - 1;
                this.move.push(x, y);
                break;
            case 's':
                x = pacman.ENTITY.x;
                y = pacman.ENTITY.y + 1;
                this.move.push(x, y);
                break;
            case 'd':
                x = pacman.ENTITY.x + 1;
                y = pacman.ENTITY.y;
                this.move.push(x, y);
                break;
            case 'a':
                x = pacman.ENTITY.x - 1;
                y = pacman.ENTITY.y;
                this.move.push(x, y);
                break;
        }
        pacman.Board.moveEntity(pacman.ENTITY, this.move[0], this.move[1]);
    }
}