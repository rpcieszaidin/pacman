pacman.Pacman = class {
    constructor(z, x, y, type, board) {
        this.z = z;
        this.x = x;
        this.y = y;
        this.type = type;
        this.board = board;

        this.createEventPlayer();
    }

    createEventPlayer() {
        window.addEventListener("keyup", this.eventPlayer);
    }

    eventPlayer = (event) => {
        switch(event.code) {
            case "ArrowUp":
                this.board.moveEntity(this, this.x, this.y-1);
                break;
            case "ArrowLeft":
                this.board.moveEntity(this, this.x-1, this.y);
                break;
            case "ArrowDown":
                this.board.moveEntity(this, this.x, this.y+1);
                break;
            case "ArrowRight":
                this.board.moveEntity(this, this.x+1, this.y);
                break;
        }
    }
}