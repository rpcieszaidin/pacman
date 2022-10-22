pacman.Pacman = class {
    constructor(z, x, y, type, board) {
        this.z = z;
        this.x = x;
        this.y = y;
        this.type = type;
        this.board = board;
        this.direction = "";
        this.createEventPlayer();
    }

    createEventPlayer() {
        window.addEventListener("keyup", this.eventPlayer);
    }

    eventPlayer = (event) => {
        switch(event.code) {
            case "ArrowUp":
                this.board.moveEntity(this, this.x, this.y-1);
                this.direction = "up";
                break;
            case "ArrowLeft":
                this.board.moveEntity(this, this.x-1, this.y);
                this.direction = "left";
                break;
            case "ArrowDown":
                this.board.moveEntity(this, this.x, this.y+1);
                this.direction = "down";
                break;
            case "ArrowRight":
                this.board.moveEntity(this, this.x+1, this.y);
                this.direction = "right";
                break;
        }
    }
}