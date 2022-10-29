var pacman = pacman || {};

pacman.PLAYER = 98;
pacman.ENEMY = 1;

pacman.Board = class {
    constructor() {
        this.maps = [
            [
                [0, 0, 0, 0, 0, 'D'], 
                [0, 0, 1, 0, 0, 1], 
                [0, 0, 0, 0, 0, 0], 
                [1, 1, 0, 1, 0, 0],
                [0, 0, 0, 1, 0, 0]
            ],
            [
                [0, 1, 1, 0, 0, 'U'], 
                [0, 1, 1, 0, 1, 1], 
                [0, 0, 0, 0, 0, 0], 
                [1, 1, 0, 1, 1, 0],
                ['D', 0, 0, 1, 1, 1]
            ],
            [
                [0, 1, 1, 0, 1, 0], 
                [0, 1, 1, 0, 1, 0], 
                [0, 0, 0, 0, 0, 0], 
                [1, 0, 0, 1, 1, 0],
                ['U', 0, 0, 1, 1, 0]
            ]
        ];
        this.entities = []
        this.score = 0;
    }

    addEntity(type, x, y, z) {
        let entity;
        switch (type) {
            case pacman.PLAYER:
                entity = new pacman.Pacman(x, y, z, pacman.PLAYER, this);
                this.layer = z
                break;
            case pacman.ENEMY:
                entity = new pacman.Ghost(x, y, z, pacman.ENEMY, this, this.entities[0]);
                break;
        }
        this.entities.push(entity);
    }

    drawBoard() {
        let board = document.getElementById("board");
        board.innerHTML = "";
        let mapCopy = JSON.parse(JSON.stringify(this.maps[this.layer]));

        for (const entity of this.entities) {
            if(entity.z != this.layer){
                continue;
            }
           
            mapCopy[entity.y][entity.x] = entity;
            
        }

        // Drawing
        for (const row of mapCopy) {
            for (const cell of row) {
                if (typeof cell == 'object'){
                    if (cell.type === pacman.PLAYER) {
                        board.innerHTML += "P";
                    }else if (cell.type === pacman.ENEMY) {
                        board.innerHTML += "E";
                    } 
                } else {
                    board.innerHTML += cell;
                }
            }
            board.innerHTML += "<br>";
        }
    }

    moveEntity(entity, x, y) {
        let map = this.maps[entity.z];
        let previousLayer = this.layer;
        if (y >= 0 && y < map.length && x >= 0 && x < map[y].length) {
            
            if(map[y][x] == 0 || map[y][x] == "&nbsp"){
                entity.x = x;
                entity.y = y;
            }

            if(entity.type == pacman.PLAYER){
                if(map[y][x] == 0){
                    map[y][x] = "&nbsp";
                    this.score += 100
                    document.getElementById("score").innerHTML = "SCORE: " + this.score
                }
                if(map[y][x] == 'D' && entity.type == pacman.PLAYER){
                    entity.z++
                    this.layer++
                }else if(map[y][x] == 'U' && entity.type == pacman.PLAYER){
                    entity.z--
                    this.layer--
                }
            }
        }

        if(previousLayer != this.layer){
            this.stopEnemiesMovementOnLayer(previousLayer);
            this.startEnemiesMovementOnLayer(this.layer)
        }
        this.checkLose()
            .then(() => this.lose())
        this.drawBoard();
    }

    stopEnemiesMovementOnLayer(layer){
        for (const entity of this.entities) {
            if(entity.type == pacman.ENEMY && entity.z == layer){
                entity.stopMoving()
            }
        }
    }

    startEnemiesMovementOnLayer(layer){
        for (const entity of this.entities) {
            if(entity.type == pacman.ENEMY && entity.z == layer){
                entity.startMoving()
            }
        }
    }

    checkLose(){
        return new Promise((resolve, reject) => {
            let playerCoords = [this.entities[0].x, this.entities[0].y]
            let entityCoords
            for (const entity of this.entities) {
                if(entity.z != this.layer || entity.type == pacman.PLAYER){
                    continue;
                }
                
                entityCoords = [entity.x, entity.y]
                if(playerCoords[0] == entityCoords[0] && playerCoords[1] == entityCoords[1])  resolve(1)
            }
        });
    }

    lose(){
        for (let entity of this.entities) {
            if(entity.type === pacman.PLAYER){
                entity.lose();
            }else{
                entity.stopMoving();
            }
        }
    }

}