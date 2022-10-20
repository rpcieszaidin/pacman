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
        let movement = this.checkPossibleMovements();
        movement = movement[Math.round(Math.random() * (movement.length - 1))];

        switch (movement) {
            case "left":
                board.moveEntity(this, this.x - 1,  this.y);
                break;
            case "right":
                board.moveEntity(this, this.x + 1,  this.y);
                break;
            case "up":
                board.moveEntity(this, this.x,  this.y - 1);
                break;
            case "down":
                board.moveEntity(this, this.x,  this.y + 1);
                break;
        }
    }

    checkPossibleMovements(){
        // Arreglar error de limetes
        let possibleMovements = [];
        let map = board.maps[this.z];
        if(this.x < map[this.y].length && map[this.y][this.x + 1] != 1) possibleMovements.push("right");
        if(this.x > 0 && map[this.y][this.x - 1] != 1) possibleMovements.push("left");
        if(this.y < map.length && map[this.y + 1][this.x] != 1) possibleMovements.push("down");
        if(this.y > 0 && map[this.y - 1][this.x] != 1) possibleMovements.push("up");

        return possibleMovements
    }
}