pacman.Ghost = class {
    constructor(x, y, z, type) {
        this.x = x;
        
        this.y = y;
        this.z = z;
        this.type = type;
        this.movement = null
        this.startMoving()
    }

    startMoving(){
        this.movement = setInterval(() => this.move(), 500)
    }

    stopMoving(){
        clearInterval(this.movement)
    }

    move(){
        // Implementar IA de los ghosts
        board.moveEntity(this, this.x - 1,  this.y)
    }
}