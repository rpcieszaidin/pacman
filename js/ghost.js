pacman.Ghost = class extends pacman.Entity{
    constructor(x, y, z, type, board, player) {
        super(x, y, z, type, board)
        this.player = player;
        this.movement = null
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
        movement = this.checkBestDirection(movement);

        switch (movement) {
            case "left":
                this.board.moveEntity(this, this.x - 1,  this.y);
                break;
            case "right":
                this.board.moveEntity(this, this.x + 1,  this.y);
                break;
            case "up":
                this.board.moveEntity(this, this.x,  this.y - 1);
                break;
            case "down":
                this.board.moveEntity(this, this.x,  this.y + 1);
                break;
        }
    }

    checkPossibleMovements(){
        let possibleMovements = [];
        let map = board.maps[this.z];
        if(this.x < map[this.y].length - 1 && map[this.y][this.x + 1] != 1) possibleMovements.push("right");
        if(this.x > 0 && map[this.y][this.x - 1] != 1) possibleMovements.push("left");
        if(this.y < map.length - 1 && map[this.y + 1][this.x] != 1) possibleMovements.push("down");
        if(this.y > 0 && map[this.y - 1][this.x] != 1) possibleMovements.push("up");

        return possibleMovements
    }

    checkBestDirection(movements){
        let selected
        if(this.player.x < this.x && movements.includes("left")) selected = "left"
        else if(this.player.x > this.x && movements.includes("right")) selected = "right"
        else if(this.player.y < this.y && movements.includes("up")) selected = "up"
        else if(this.player.y > this.y && movements.includes("down")) selected = "down"
        else selected = movements[Math.floor(Math.random() * movements.length)];
        return selected
    }
}