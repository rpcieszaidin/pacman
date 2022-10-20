pacman.Ghost = class {
    constructor(x, y, z, type) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.type = type;
    }

    move(x, y) {
        if (this.x < x) {
            board.moveEntity(this, this.x + 1, this.y);
        } else if (this.x > x) {
            board.moveEntity(this, this.x - 1, this.y);
        } else if (this.y < y) {
            board.moveEntity(this, this.x, this.y + 1);
        } else if (this.y > y) {
            board.moveEntity(this, this.x, this.y - 1);
        }
    }
}