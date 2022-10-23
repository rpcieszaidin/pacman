pacman.Entity = class {
    constructor(x, y, z, type, board) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.type = type;
        this.board = board;
    }

    //Player section
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

    //Enemy section
    moveGhost() {
        let option = this.chasePacman(this.checkOptions());

        switch (option) {
            case 'up':
                this.board.moveEntity(this, this.x - 1, this.y);
                break;
            case 'right':
                this.board.moveEntity(this, this.x, this.y + 1);
                break;
            case 'down':
                this.board.moveEntity(this, this.x + 1, this.y);
                break;
            case 'left':
                this.board.moveEntity(this, this.x, this.y - 1);
                break;
        }
    }

    checkOptions() {
        let options = [];
        let map = this.board.getMaps()[this.board.getCurrentMap()];
        let [limitX, limitY] = this.board.getBoardLimits(map);

        if ((this.x - 1) >= 0) 
            if (map[this.x - 1][this.y] != pacman.WALL) options.push('up');
        

        if ((this.y + 1) < limitY) 
            if (map[this.x][this.y + 1] != pacman.WALL) options.push('right');
        

        if ((this.x + 1) < limitX) 
            if (map[this.x + 1][this.y] != pacman.WALL) options.push('down');
        

        if ((this.y - 1) >= 0) 
            if (map[this.x][this.y - 1] != pacman.WALL) options.push('left');

        

        return options;
    }

    chasePacman(options) {
        let selected;
        let player = this.board.getPacman();
        if (this.x > player.x && options.includes('up')) selected = 'up';
        else if (this.y > player.y && options.includes('left')) selected = 'left';
        else if (this.x < player.x && options.includes('down')) selected = 'down';
        else if (this.y < player.y && options.includes('right')) selected = 'right';
        else {
            let index = Math.floor(Math.random() * options.length);
            selected = options[index];
        }

        return selected;
    }
}