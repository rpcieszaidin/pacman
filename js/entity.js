pacman.Entity = class {
    constructor(x, y, z, type, board) {
        this.board = board
        this.x = x;
        this.y = y;
        this.z = z;
        this.type = type;
    }
}