var pacman = pacman || {};

pacman.PELLET = 0;
pacman.BARRIER = 1;
pacman.EMPTY = 44;
pacman.PLAYER = 20;
pacman.ENEMY = 40;

pacman.Board = class {
    constructor() {
        this.maps = [
            [
                [0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0],
                [0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0],
                [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
                [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0]
            ]
        ];
        this.entities = [];
        this.oldCellContent = pacman.PELLET;
        this.interval = null;
        this.isGameFinished = false;
    }

    startGame() {
        let button = document.createElement("button");
        button.setAttribute("id", "btStart");
        button.appendChild(document.createTextNode("INICIAR PARTIDA"));
        document.getElementById("message").appendChild(button);
        this.addEntity(pacman.PLAYER);
        this.addEntity(pacman.ENEMY);
        this.drawBoard();
        button.onclick = () => {
            document.getElementById("btStart").setAttribute("hidden", "hidden");
            this.playerMovements();
            this.enemyMovements();
        }
    }

    finishGame(gameWon) {
        this.isGameFinished = true;
        clearInterval(this.interval);
        let message = gameWon ? 'HAS GANADO' : 'HAS PERDIDO';
        document.getElementById("message").appendChild(
            document.createTextNode("FIN DE LA PARTIDA: " + message));  
        document.getElementById("message").appendChild(document.createElement("br"));      
        let button = document.createElement("button");
        button.appendChild(document.createTextNode("VOLVER A JUGAR"));
        document.getElementById("message").appendChild(button);
        button.onclick = function() {
            location.reload();
        }
    }

    addEntity(type) {
        let map = this.maps[0];
        let entity = null;
        switch(type) {
            case pacman.PLAYER: 
                entity = new pacman.Entity(0, 0, 0, pacman.PLAYER);
                break;
            case pacman.ENEMY:
                entity = new pacman.Entity(14, 4, 0, pacman.ENEMY);
                break;
        }
        map[entity.y][entity.x] = entity;
        this.entities.push(entity);
    }

    entityMovements(entity, movement) {
        switch(movement) {
            case 0:
                this.moveEntity(entity, entity.x, entity.y - 1);
                break;
            case 1:
                this.moveEntity(entity, entity.x - 1, entity.y);
                break;
            case 2:
                this.moveEntity(entity, entity.x, entity.y + 1);
                break;
            case 3:
                this.moveEntity(entity, entity.x + 1, entity.y);
                break;
        }
        document.getElementById("board").remove();
        this.drawBoard();
    }

    playerMovements() {
        document.addEventListener("keydown", (event) => {
            if (!this.isGameFinished) {
                let move;
                switch(event.key.toLowerCase()) {
                    case "w":
                        move = 0;
                        break;
                    case "a":
                        move = 1;
                        break;
                    case "s":
                        move = 2;
                        break;
                    case "d":
                        move = 3;
                        break;
                }
                this.entityMovements(this.entities.find(element => element.type == pacman.PLAYER), move);
            }
        });
    }

    enemyMovements() {
        this.interval = setInterval(() => {
            this.entityMovements(this.entities.find(element => element.type == pacman.ENEMY)
                                 , Math.floor(Math.random() * 4));
        }, 500);
    }

    moveEntity(entity, x, y) {
        let map = this.maps[entity.z];
        if (x >= 0 && x < map[map.length-1].length && y >= 0 && y < map.length) {
            let oldCellContent, cellContent = map[y][x];
            if (cellContent != pacman.BARRIER) {
                let newCellContent = entity;
                if (entity.type == pacman.PLAYER) {
                    oldCellContent = pacman.EMPTY;
                    if(cellContent.type == pacman.ENEMY) {
                        newCellContent = this.entities.find(element => element.type == pacman.ENEMY);
                        this.finishGame(false);
                    }
                } else {
                    oldCellContent = this.oldCellContent;
                    if(cellContent.type == pacman.PLAYER) {
                        this.finishGame(false);
                    } else {
                        this.oldCellContent = cellContent;
                    }
                }
                map[entity.y][entity.x] = oldCellContent;
                map[y][x] = newCellContent;
                entity.x = x;
                entity.y = y;                
                if(this.countPellets() == 0) this.finishGame(true)
            }
        }
    }

    drawBoard() {
        let table = document.createElement("table");
        table.setAttribute("id", "board");
        let map = this.maps[0];
        for (let i = 0; i < map.length; i++) {
            let tr = document.createElement("tr");
            for(let j = 0; j < map[i].length; j++) {
                let th = document.createElement("th");
                tr.appendChild(th);
                let cellContent = null;
                if (typeof map[i][j] == 'object'){
                    if (map[i][j].type === pacman.PLAYER) {
                        cellContent = 'O';
                    } else {
                        cellContent = 'A';
                    }
                } else {
                    switch (map[i][j]) {
                        case pacman.PELLET:
                            cellContent = 'X';
                            break;
                        case pacman.BARRIER:
                            cellContent = '2    ';
                            break;
                        case pacman.EMPTY:
                            cellContent = 'G';
                            break;
                    }
                }
                tr.cells[j].appendChild(document.createTextNode(cellContent));
                th.setAttribute("class", "cell-"+cellContent);
                table.appendChild(tr);
            }
        }
        document.getElementById("title").appendChild(table);
    }

    countPellets() {
        let numPellets = 0;
        let map = this.maps[0];
        for (let i = 0; i < map.length; i ++) {
            for(let j = 0; j < map[i].length;j++) {
                if (map[i][j] == pacman.PELLET) numPellets++;
            }
        }
        return numPellets;
    }

}