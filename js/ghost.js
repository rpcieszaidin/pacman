pacman.Ghost = class {
    constructor(z, x, y, type, board, player) {
        this.z = z;
        this.x = x;
        this.y = y;
        this.type = type;
        this.board = board;
        this.player = player;
        this.interval = null;

        this.startMove();
    }

    possibleMovements() {
        let movements = [];
        let map = this.board.maps[this.z];
        if (this.y > 0 && map[this.y-1][this.x] != pacman.WALL) movements.push("up");
        if (this.x > 0 && map[this.y][this.x-1] != pacman.WALL) movements.push("left");
        if (this.y < map.length - 1 && map[this.y+1][this.x] != pacman.WALL) movements.push("down");
        if (this.x < map[this.y].length - 1 && map[this.y][this.x+1] != pacman.WALL) movements.push("right");
        return movements;
    }

    movement(movement) {
        switch (movement) {
            case "up":
                this.board.moveEntity(this, this.x, this.y-1);
                break;
            case "left":
                this.board.moveEntity(this, this.x-1, this.y);
                break;
            case "down":
                this.board.moveEntity(this, this.x, this.y+1);
                break;
            case "right":
                this.board.moveEntity(this, this.x+1, this.y);
                break;
        }
    }
    
    move = () => {
        let movement = "";
        let movements = this.possibleMovements();
        if (this.player.y < this.y && movements.includes("up")) movement = "up";
        if (this.player.x < this.x && movements.includes("left")) movement = "left";
        if (this.player.y > this.y && movements.includes("down")) movement = "down";
        if (this.player.x > this.x && movements.includes("right")) movement = "right";

        // IA TRASH
        let coords = this.x + this.y;
        this.movement(movement);
        let reCoords = this.x + this.y;
        if (coords == reCoords) {
            this.board.moveEntity(this, this.x+1, this.y);
            reCoords = this.x + this.y;
            if (coords == reCoords) {
                this.board.moveEntity(this, this.x, this.y-1);
                reCoords = this.x + this.y;
                if (coords == reCoords) {
                    this.board.moveEntity(this, this.x, this.y+1);
                }
            }
        }
        
        this.checkLose();
    }

    startMove() {
        this.interval = setInterval(this.move, 500);
    }

    stopMove() {
        clearInterval(this.interval);
    }

    checkLose() {
        new Promise((live) => {
            if (this.x == this.player.x && this.y == this.player.y) {
                document.getElementById("lose").style.visibility = "visible";
                document.getElementById("refresh").style.visibility = "visible";
                window.removeEventListener("keyup", this.player.eventPlayer);
                this.stopMove();
            }
            live('alive');
        })
    }
}