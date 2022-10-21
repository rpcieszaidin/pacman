
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
                map[this.z][this.y][this.x] = 0;
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
            let positions = [];
            let index = 0;

            if(map[entity.z][entity.x + 1][entity.y] == 0){
                positions[index] = entity.x + 1;
                index++;
            // }else if(map[entity.z][entity.x - 1][entity.y] == 0){
            //     positions[index] = entity.x - 1;
            //     index++;
            }else if(map[entity.z][entity.x][entity.y + 1] == 0){
                positions[index] = entity.y + 1;
                index++;
            }else{
                positions[index] = entity.y - 1;
                index++;
            }
            let p = Math.floor(Math.random() * positions.length);
            let y = positions[p];

            table.moveEntity(entity, entity.x, entity.y);
        }

    }




}