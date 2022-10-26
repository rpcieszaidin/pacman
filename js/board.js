var pacman = pacman || {};

pacman.PLAYER = "P";
pacman.ENEMY = "G";
pacman.STAIRS = "X";
pacman.COOKIE = "o";
pacman.EMPTY = "";
pacman.WALL = "H";


pacman.Board = class {
    constructor() {
        this.maps = [
            [
                ["o", "o", "o", "o", "o", "o", "o"],
                ["o", "H", "H", "o", "H", "H", "o"],
                ["o", "o", "o", "o", "o", "o", "o"],
                ["o", "o", "H", "H", "H", "o", "o"],
                ["o", "o", "o", "o", "o", "o", "o"],
                ["o", "H", "H", "o", "H", "H", "o"],
                ["o", "o", "o", "o", "o", "o", "o"]
            ]
        ];
        this.entities = [];
        this.gameover = false;
        this.okmove= null;
    }

    start(path){
        let start = document.getElementById(path);
        start.addEventListener("click", ()=>{
            this.drawBoard(0);
        })
    }

    addEntity(type) {
        switch (type){
            case pacman.PLAYER:

                break;
            case pacman.STAIRS:

                break;
            case pacman.ENEMY:

                break;
            case pacman.ENEMY:
                console.log("Error while creating the entity")
                break;

        }
        /*if (type === pacman.PLAYER) {
            let player = new pacman.Entity(0, 4, 3, pacman.PLAYER);
            this.maps[0][4][3] = pacman.PLAYER;
            this.entities.push(player);
        }
        if (type === pacman.ENEMY) {
            let enemy = new pacman.Entity(0,this.rannumber(),this.rannumber(), pacman.ENEMY)
        }*/
    }

    rannumber(){
        return (Math.floor(Math.random() * 2)*7);
    }

    drawBoard(level) {
        let game = document.getElementById("game")
        for(let i = 0; i < this.maps[level].length; i++){
            let row = document.createElement('tr');
            for (let j = 0; j < this.maps[level][i].length; j++){
                let cell = document.createElement("td");
                if(this.maps[level][i][j] === "H"){
                    cell.classList.add("wall");
                }else {
                    cell.classList.add("cell");
                }
                cell.innerHTML=this.maps[level][i][j];
                row.appendChild(cell)
            }
            game.appendChild(row);
        }
    }

    moveEntity(entity, x, y) {
        this.okmove = true;
        if (this.maps[entity.z][y][x].type === pacman.ENEMY){
            this.gameover = true;
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
            this.gameover = true;
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