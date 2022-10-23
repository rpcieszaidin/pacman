pacman.Entity = class {
    constructor(x, y, z, type, board) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.type = type;
        this.board = board;
    }

    movePacman = (e) => {
        switch (e.key) {
            case 'ArrowUp':
                this.board.moveEntity(this, this.x - 1, this.y);
                break;
            case 'ArrowRight':
                this.board.moveEntity(this, this.x, this.y + 1);
                break;
            case 'ArrowDown':
                this.board.moveEntity(this, this.x + 1, this.y);
                break;
            case 'ArrowLeft':
                this.board.moveEntity(this, this.x, this.y - 1);
                break;
        }
    }

    addListenerMove() {
        document.addEventListener('keyup', this.movePacman);
    }

    removeListenerMove() {
        document.removeEventListener('keyup', this.movePacman);
    }
}