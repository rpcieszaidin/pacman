pacman.Pacman = class extends pacman.Entity {
    constructor(x, y, z, type) {
        super(x, y, z, type);
        this.board = new pacman.Board();
    }

    movePacman = (e) => {
        switch (e.key) {
            case 'ArrowUp':
                this.board.moveEntity(this, this.x--, this.y);
                break;
            case 'ArrowRight':
                this.board.moveEntity(this, this.x, this.y++);
                break;
            case 'ArrowDown':
                this.board.moveEntity(this, this.x++, this.y);
                break;
            case 'ArrowLeft':
                this.board.moveEntity(this, this.x, this.y--);
                break;
        }
    }

    addListenerMove() {
        document.addEventListener('keyup', this.movePacman);
    }
}