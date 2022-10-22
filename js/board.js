var pacman = pacman || {};

pacman.PLAYER = 98;
pacman.ENEMY = 50;
pacman.COCO = 0;
pacman.MURO = 1;

pacman.Board = class {
    constructor() {
        this.maps = [
            [
                [0, 0, 1, 0, 0, 0], 
                [0, 0, 1, 0, 0, 1], 
                [0, 0, 0, 0, 0, 0], 
                [1, 1, 0, 1, 0, 0], 
                [0, 0, 0, 1, 0, 0]
            ]
        ];

        this.entities = [];

        //Este intervalo se ejecuta cada segundo, comprobando todos los enemigos presentes en el juego y ejecutará su función de movimiento con ellos si están en el mismo piso que el jugador
        this.interval = setInterval(() => {
            let jugador;
            for(let valor in this.entities){
                if(this.entities[valor].type === pacman.PLAYER){
                    jugador = this.entities[valor];
                }
                if(this.entities[valor].type === pacman.ENEMY && this.entities[valor].z == jugador.z){
                    this.ghostMovement(this.entities[valor]);
                }
            }
        }, 1000);

        
        this.controller = new AbortController();
        //Añadimos el eventListener de las teclas del jugador
        addEventListener("keydown", (event) => {
            this.playerMovement(event);
        }, 
        {signal: this.controller.signal}
        );

        this.div = document.getElementById('game');
    }

    //Añade una entidad al juego ya sea jugador o fantasma
    addEntity(type) {
        let map = this.maps[0];
        let entity = null;

        if (type === pacman.PLAYER) {
            entity = new pacman.Entity(0, 0, 0, pacman.PLAYER);
        }else if (type === pacman.ENEMY) {
            entity = new pacman.Entity(4, 5, 0, pacman.ENEMY);
        }

        map[entity.x][entity.y] = entity;
        this.entities.push(entity);
    }

    //Dibuja en tablero en el html
    drawBoard() {
        let map = this.maps[0];
        let tabla = document.createElement('table');
        tabla.setAttribute('id', 'map');
        this.div.textContent = "";

        //Bucle para recorrer el mapa imprimiento los objetos
        for (let i = 0; i < map.length; i++) {
            let row = document.createElement('tr');
            for(let j = 0; j < map[i].length; j++) {
                let cell = document.createElement('td');
                if (typeof map[i][j] == 'object'){
                    if (map[i][j].type === pacman.PLAYER) {
                        cell.textContent = "A"
                    }else if(map[i][j].type === pacman.ENEMY){
                        cell.textContent = "B"
                    }
                } else {
                    cell.textContent = map[i][j];
                }
                row.appendChild(cell);
            }
            tabla.appendChild(row);
        }

        this.div.appendChild(tabla);
    }

    //Recibe un valor, y las posiciones, y actualiza ese puesto de la tabla
    updateBoard(valor, x, y){
        let htmlMap = document.getElementById('map');
        let nodosX = htmlMap.childNodes;
        let nodosY = nodosX[x].childNodes;
        nodosY[y].innerHTML = valor;
    }

    //Mueve una entidad haciendo las respectivas comprobaciones
    moveEntity(entity, x, y) {
        //Cogemos el mapa en el que esta la entidad que se va a mover
        let map = this.maps[entity.z];

        //Comprobamos los límites del mapa
        if (!(x >= 0 && x < map.length && y >= 0 && y < map[x].length)) return false 

        //Comprobamos si se realiza mas de un movimiento
        if(!(entity.x == x || entity.y == y)) return false

        //Comprobamos que el movimiento sea de solo una casilla en la x
        if(entity.x != x ){
            if(!(entity.x > x && entity.x - x == 1 || x - entity.x == 1)) return false 
        }

        //Comprobamos que el movimiento sea de una sola casilla en la y
        if(entity.y != y){
            if(!(entity.y > y && entity.y - y == 1 || y - entity.y == 1)) return false 
        }
        
        //Comprobamos que el movimiento no lleve a un muero
        if(map[x][y] === pacman.MURO) return false


        //Aquí solo se llegará cuando se cumplan todas las condiciones anteriores, si no, saldran devolviendo un false antes de hacer ningun cambio
        //Ejecutamos game over si el jugador se mueve al fantasma y viceversa
        if(map[x][y].type === pacman.PLAYER && entity.type === pacman.ENEMY || map[x][y].type === pacman.ENEMY && entity.type === pacman.PLAYER){
            this.gameOver();
        }

        if(map[x][y] === pacman.COCO && entity.type === pacman.PLAYER){
            entity.puntuacion ++;
        }
        
        map[entity.x][entity.y] = 0;
        this.updateBoard(0, entity.x, entity.y);
        map[x][y] = entity;

        if(entity.type == pacman.PLAYER){
            this.updateBoard('A', x, y)
        }else{
            this.updateBoard('B', x, y);
        }

        entity.x = x;
        entity.y = y;
        return true;
    }

    gameOver(){
        clearInterval(this.interval);
        this.controller.abort();
    }

    //Crea un intervalo que se ejecuta cada minuto
    ghostMovement(entity){
        let x;
        let y;
        
        //Mientras no consiga moverse el fantasma se ejecutará este bucle
        do{
            let random = Math.ceil(Math.random() * 4);
            x = entity.x;
            y = entity.y;

            switch(random){
                case 1:
                    y --;
                break;

                case 2:
                    x --;
                break;

                case 3: 
                    y ++;
                break;

                case 4:
                    x ++;
                break;
            }
            console.log(random, x, y)
            this.moveEntity(entity, x, y)
            
        }while(!this.moveEntity(entity, x, y));
    }

    //Movimiento del jugador
    playerMovement(event){
        if (event.defaultPrevented) {
            return;
            }
                
        let jugador = board.entities[0];
        let x = jugador.x;
        let y = jugador.y;
    
        switch (event.key) {
            case "ArrowDown":
                board.moveEntity(jugador, ++x, y);
            break;
    
            case "ArrowUp":
                board.moveEntity(jugador, --x, jugador.y);
            break;
    
            case "ArrowLeft":
                board.moveEntity(jugador, x, --y);
            break;
    
            case "ArrowRight":
                board.moveEntity(jugador, x, ++y);
            break;
        }

    }
}