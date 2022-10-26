pacman.INTERVAL;
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
                        table.moveEntity(entity, this.x, this.y - 1);
                    break;
                    case "ArrowDown":
                        table.moveEntity(entity, this.x, this.y + 1);
                    break;
                }
            });
        }else{ 
        this.ghost(map, entity, table);
        }
    }

    ghost(maps, entity, table){

        pacman.INTERVAL = setInterval(movement, 500);
    
        function movement(){
            let positions = [];
            let index = 0;
            let map = maps[entity.z];
            if (entity.x - 1 >= 0) {
                if (map[entity.y][entity.x - 1] != 1 && map[entity.y][entity.x - 1].type != pacman.ENEMY)  {
                    positions[index] = [entity.x - 1, entity.y]
                    index ++;
                }
            }
            if (entity.x + 1 < map[entity.y].length) {
                if (map[entity.y][entity.x + 1] != 1){
                    positions[index] = [entity.x + 1, entity.y]
                index ++;
                } 
            }
            if (entity.y + 1 < map.length) {
                if (map[entity.y + 1][entity.x] != 1){
                    positions[index] = [entity.x, entity.y + 1]
                    index ++;
                }
            }
            if (entity.y - 1 >= 0) {
                if (map[entity.y - 1][entity.x] != 1){
                    positions[index] = [entity.x, entity.y - 1]
                    index ++;
                }
            }
            let move = Math.floor(Math.random() * positions.length);
            table.moveEntity(entity, positions[move][0],positions[move][1]);
        }

    }
}