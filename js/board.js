var pacman = pacman || {};

pacman.PLAYER = 98;
pacman.ENEMY = 35;
pacman.STAIRS = 63;

pacman.Board = class {
    constructor() {
        this.maps = [
            [
                [0, 0, 0, 0, 0, 0, 0],
                [0, 1, 1, 0, 1, 1, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 1, 1, 1, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 1, 1, 0, 1, 1, 0],
                [0, 0, 0, 0, 0, 0, 0]
            ]
        ];
        this.entities = [];
        this.end = false;
        this.okmove= null;
    }

    addEntity(type) {
        if (type === pacman.PLAYER) {
            let player = new pacman.Entity(0, 4, 3, pacman.PLAYER);
            this.maps[0][4][3] = player;
            this.entities.push(player);
        }
        if (type === pacman.ENEMY) {
            let enemy = new pacman.Entity(0,this.rannumer(),this.rannumer(), pacman.ENEMY)
        }
    }

    rannumer(){
        return (Math.floor(Math.random() * 2)*7);
    }

    drawBoard(level) {
        /*for (let i = 0; i < this.maps[0].length; i++) {
            for(let j = 0; j < this.maps[0][i].length; j++) {
                if (typeof this.maps[0][i][j] == 'object'){
                    if (this.maps[0][i][j].type === pacman.PLAYER) {
                    } 
                } else {
                    for(let i=0;i<26;i++){
                        di.classList.add("key");
                        di.setAttribute('id',this.converted);
                        di.innerHTML=this.converted;
                        this.X.appendChild("");
                    }
                }
            }
        }*/
        let game = document.getElementById("game");
        let trial = document.createElement("tr");
        trial.classList("row");
        trial.innerHTML("X");
        game.appendChild(trial);
        /*for (let height of this.maps[level].length){
            //let numb = 0;
            let row = document.createElement("tr");
            row.classList("row");
            for (let width of this.maps[level][height].length){
                let column = document.createElement("td");
                column.classList.add("column");
                column.innerHTML=this.maps[level][height][width];
                row.appendChild(column)
            }
            row.innerHTML="x";
            game.appendChild(row);
        }*/
    }

    moveEntity(entity, x, y) {
        this.okmove = true;
        if (this.maps[entity.z][y][x].type === pacman.ENEMY){
            this.end = true;
            this.okmove = false;
        }
        //
        if (x < 0 || x > this.maps[entity.z][y].length || y < 0 || y > this.maps[entity.z].length) {
            this.okmove=false;
        }
        if (this.maps[entity.z][y][x] === 1){
            this.okmove=false;
        }
        if ((Math.abs(entity.x - x)+(Math.abs(entity.y - y))) !== 1){
            this.okmove=false;
        }
        //Between this and the comment line above will probably be merged into 1 if, this is for testing.
        if (this.maps[entity.z][y][x].type === pacman.ENEMY){
            this.end = true;
        }
        if (this.maps[entity.z][y][x].type === pacman.STAIRS){
            //Next level
        }
        if (this.okmove === false){
            //Doesn't move.
        }
        //Proceeds correctly.
    }
}