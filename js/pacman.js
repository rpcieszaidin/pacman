
pacman.Pacman = class {
    constructor(x, y, z, type) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.type = type;
    }

    move(map, entity){
        if(this.type == pacman.PLAYER){
            document.addEventListener("keyup", (e) => {
                map[this.z][this.y][this.x] = 0;
                switch (e.key) {
                    case "ArrowLeft":
                        board.moveEntity(entity, this.x - 1, this.y);
                    break;
                    case "ArrowRight":
                        board.moveEntity(entity, this.x + 1, this.y);
                    break;
                    case "ArrowUp":
                        board.moveEntity(entity, entity.x, this.y - 1);
                    break;
                    case "ArrowDown":
                        board.moveEntity(entity, entity.x, this.y + 1);
                    break;
                    default:
                        break;
                }
            });
        }
    }
}