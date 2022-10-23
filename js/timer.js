pacman.Timer = class {
    constructor(ghost) {
        this.ghost = ghost;
        this.interval = null;
    }

    moveEnemy = () => {
        this.ghost.moveGhost();
    }

    init() {
        this.interval = setInterval(this.moveEnemy, 750);
    }

    stop() {
        clearInterval(this.interval);
    }
}