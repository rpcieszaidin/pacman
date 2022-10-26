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

        if (this.player.y < this.y) movement = "up";
        if (this.player.x < this.x) movement = "left";
        if (this.player.y > this.y) movement = "down";
        if (this.player.x > this.x) movement = "right";

        this.movement(movement);
        
        this.checkLose();
    }

    startMove() {
        this.interval = setInterval(this.move, 400);
    }

    stopMove() {
        clearInterval(this.interval);
    }

    checkLose() {
        if (this.x == this.player.x && this.y == this.player.y) {
            this.stopMove();
            document.getElementById("lose").style.visibility = "visible";
            document.getElementById("refresh").style.visibility = "visible";
            window.removeEventListener("keyup", this.player.eventPlayer);
        }
    }
}