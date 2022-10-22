pacman.Ghost = class {
    constructor(z, x, y, type, board, player) {
        this.z = z;
        this.x = x;
        this.y = y;
        this.type = type;
        this.board = board;
        this.player = player;
        this.interval = null;

        // A* ALGORITM (STAR) -------
        this.f = 0; // coste total
        this.g = 0; // pasos dados
        this.h = 0; // heurística (en línea recta, distancia hacia el objetivo)

        this.neighbors = [];
        this.dad = null;

        this.init = pacman.map[this.y][this.x];
        this.goal = pacman.map[this.player.y][this.player.x];

        this.openSet = [];
        this.openSet.push(this.init);
        this.closedSet = [];

        this.road = [];
        this.gameOver = false;
        // --------------------------

        this.startMove();
    }

    movement(movement) {
        switch (movement) {
            case "up":
                this.board.moveEntity(this, this.x, this.y-1);
                break;
            case "left":
                this.board.moveEntity(this, this.x-1, this.y);
                break;
            case "down":
                this.board.moveEntity(this, this.x, this.y+1);
                break;
            case "right":
                this.board.moveEntity(this, this.x+1, this.y);
                break;
        }
    }
    
    move = () => {
        let movement = "";

        // A* ALGORITM (STAR) --------
        if (this.y > 0) {
            this.neighbors.push(pacman.map[this.y-1][this.x]); // UP
        }
        if (this.x > 0) {
            this.neighbors.push(pacman.map[this.y][this.x-1]); // LEFT
        }
        if (this.y < pacman.map.lenght - 1) {
            this.neighbors.push(pacman.map[this.y+1][this.x]); // DOWN
        }
        if (this.x < pacman.map.lenght - 1) {
            this.neighbors.push(pacman.map[this.y][this.x+1]); // RIGHT
        }
        // ---------------------------

        if (this.player.y < this.y) movement = "up";
        if (this.player.x < this.x) movement = "left";
        if (this.player.y > this.y) movement = "down";
        if (this.player.x > this.x) movement = "right";

        this.movement(movement);
        
        this.checkLose();
    }

    startMove() {
        this.interval = setInterval(this.move, 400);
    }

    stopMove() {
        clearInterval(this.interval);
    }

    checkLose() {
        if (this.x == this.player.x && this.y == this.player.y) {
            document.getElementById("lose").style.visibility = "visible";
            document.getElementById("refresh").style.visibility = "visible";
            window.removeEventListener("keyup", this.player.eventPlayer);
        }
    }

    // A* ALGORITM (STAR) -----------
    heuristic(a, b) {
        return (Math.abs(a.x - b.x)) + (Math.abs(a.y - b.y));
    }

    algoritm() {
        if (this.gameOver != false) {
            if (this.openSet.length > 0) {
                let winner = 0; // índice posición dentro de array openset
                for (let i = 0; i < this.openSet.length; i++) {
                    if (this.openSet[i].f < this.openSet[winner].f) {
                        winner = i;
                    }
                }
                let actual = this.openSet[winner];
                // si llegamos al final buscamos el camino de vuelta
                if (actual == this.goal) {
                    
                } else {
                    this.closedSet.push(actual);
                }
            } else {
                this.gameOver = true; // algoritmo terminado (pacman game over)
            }
        }
    }
    // ------------------------------
}