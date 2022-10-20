pacman.Pacman = class {
    constructor(x, y, z, type) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.type = type;
    }


    move(map){
        if(entity.type == pacman.PLAYER){
            document.addEventListener("keyup", (e) => {
                switch (e.key) {
                    case "ArrowLeft":
                        //console.log('l');
                        let l = entity.x - 1;
                        this.maps[entity.z][entity.y][entity.x] = 0;
                        this.moveEntity(entity, l, entity.y);
                    break;
                    case "ArrowRight":
                        //console.log('r');
                        let r = entity.x + 1;
                        this.maps[entity.z][entity.y][entity.x] = 0;
                        this.moveEntity(entity, r, entity.y);
                    break;
                        case "ArrowUp":
                        //console.log('u');
                        let u = entity.y - 1;
                        this.maps[entity.z][entity.y][entity.x] = 0;
                        this.moveEntity(entity, entity.x, u);
                    break;
                    case "ArrowDown":
                        //console.log('d');
                        let d = entity.y + 1;
                        this.maps[entity.z][entity.y][entity.x] = 0;
                        this.moveEntity(entity, entity.x, d);
                    break;
                    default:
                        break;
                }
            });
        }
    }

    
}