pacman.Pacman = class {
    constructor() {

    }


    moveg(){
        let positions = [];
            let x = entity.x + 1;
            let y = entity.y + 1;
            let x1 = entity.x - 1;
            let y1 = entity.y - 1;
            let index = 0;

            if(this.maps[entity.z][y][entity.x] == 0){
                positions[index] = y
                index ++;
            }else if(this.maps[entity.z][y1][entity.x] == 0){
                positions[index] = y1
                index ++;
            }else if(this.maps[entity.z][entity.y][x] == 0){
                positions[index] = x
                index ++;
            }else if(this.maps[entity.z][entity.y][x1] == 0){
                positions[index] = x1
                index ++;
            }

            let position = Math.floor(Math.random() * (positions.length));
            positions[position];

            setInterval (this.moveg, 1000)
    }





}