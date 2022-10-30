var pacman = pacman || {};

pacman.PLAYER = 'A';
pacman.ENEMY = 'B';
pacman.LADDER = 'C';
pacman.COCO = 0;
pacman.MURO = 1;

pacman.Board = class {
    constructor() {
        //Array con mapas
        this.maps = [
            [
                [0, 0, 1, 0, 0, 0], 
                [0, 0, 1, 0, 0, 1], 
                [0, 0, 0, 0, 0, 0], 
                [1, 1, 0, 1, 0, 0], 
                [0, 0, 0, 1, 0, 0]
            ]
        ];
        //Array de entidades
        this.entities = [];
        
        this.interval;

        //Controlador para abotar el event listener
        this.controller = new AbortController();

        //Div en el que se pondrá el tablero
        this.div = document.getElementById("game");
    }

    //Función que inicializa el programa
    init(){
        //Event Listener
        window.addEventListener("keydown", (event) => {
            this.playerMovement(event);
        }, 
        {signal: this.controller.signal}
        );

        //Intervalo fanstasma
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

        //Crea las entidades
        let player = new pacman.Entity(1, 1, 0, pacman.PLAYER);
        this.entities.push(player);
        this.entities.push(new pacman.Entity(3, 4, 0, pacman.ENEMY));

        let map = JSON.parse(JSON.stringify(this.maps[0]));
        this.insertEntities(map);

        this.drawBoard(map);
    }

    //Termina el juego apagando todos los botones y fantasmas
    gameOver(){
        console.log()
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
        }while(!this.moveEntity(entity, x, y));
    }

    //Movimiento del jugador
    playerMovement(event){
        let map = JSON.parse(JSON.stringify(this.maps[this.entities[0].z]));
        if (event.defaultPrevented) {
            return;
            }
                
        let jugador = this.entities[0];
        let x = jugador.x;
        let y = jugador.y;
    
        switch (event.key) {
            case "ArrowDown":
                this.moveEntity(jugador, ++x, y);
            break;
    
            case "ArrowUp":
                this.moveEntity(jugador, --x, jugador.y);
            break;
    
            case "ArrowLeft":
                this.moveEntity(jugador, x, --y);
            break;
    
            case "ArrowRight":
                this.moveEntity(jugador, x, ++y);
            break;

            case "SpaceBar":
                
            break;
        }

    }

    //Dibuja el mapa en el que la entidad que le pasamos está
    drawBoard(map) {
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

    //Insertamos una entidad en la copia del mapa
    insertEntities(map){
        let entities = this.entities;
        entities.forEach( (item) =>{
            map[item.x][item.y] = item.type;
        })
    }

    //Devuelve si el jugador se ha movido
    moveEntity(entity, x, y){
        let map = JSON.parse(JSON.stringify(this.maps[entity.z]));

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

        //Aquí solo se llegará si el movimiento es válido

        //Comprobamos si acaba la partida
        let jugador = this.entities[0];
        this.entities.forEach( (item) => {
            if(item != jugador && item.type === pacman.ENEMY && jugador.x === item.x && jugador.y === item.y){
                this.gameOver();
            }
        })

        if(map[x][y] === pacman.COCO && entity.type === pacman.PLAYER){
            entity.puntuacion ++;
        }
        
        entity.x = x;
        entity.y = y;
        this.insertEntities(map);
        this.drawBoard(map);

        return true;
    }
}