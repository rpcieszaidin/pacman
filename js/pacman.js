
pacman.Pacman = class {
    constructor(x, y, z, type) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.type = type;
    }

    move(map, entity, table){
        if(this.type == pacman.PLAYER){
            document.addEventListener("keyup", (e) => {
                switch (e.key) {
                    case "ArrowLeft":
                        table.moveEntity(entity, this.x - 1, this.y);
                    break;
                    case "ArrowRight":
                        table.moveEntity(entity, this.x + 1, this.y);
                    break;
                    case "ArrowUp":
                        table.moveEntity(entity, entity.x, this.y - 1);
                    break;
                    case "ArrowDown":
                        table.moveEntity(entity, entity.x, this.y + 1);
                    break;
                    default:
                        break;
                }
            });
        }else{
            
        this.ghost(map, entity, table);
            
        }
    }

    ghost(map, entity, table){
        
        let interval = setInterval(movement, 1000);
        
        function movement(){

        }
            

    }




}