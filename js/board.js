var pacman = pacman || {};

pacman.PLAYER = 'A';
pacman.ENEMY = 'B';
pacman.COCO = 0;
pacman.MURO = 1;

pacman.Board = class {
    constructor() {
        this.maps = [  ];
        this.maps.push(new pacman.Map());

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
    }
    

    addEntity(type){
        this.entities.push(this.maps[0].addEntity(type));
    }

    moveEntity(entity, x, y){
        //Cogemos el mapa en el que esta la entidad que se va a mover
        this.maps[entity.z].moveEntity(entity, x, y)
    }


    drawBoard(){
        this.maps[this.entities[0].z].drawBoard();
    }

    //Termina el juego apagando todos los botones y fantasmas
    gameOver(){
        clearInterval(this.interval);
        this.controller.abort();
    }

    //Crea un intervalo que se ejecuta cada minuto
    ghostMovement(entity){
        let x;
        let y;
        
        //Mientras no consiga moverse el fantasma se ejecutará este bucle
        
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
        this.maps[entity.z].moveEntity(entity, x, y);
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
                this.maps[jugador.z].moveEntity(jugador, ++x, y);
            break;
    
            case "ArrowUp":
                this.maps[jugador.z].moveEntity(jugador, --x, jugador.y);
            break;
    
            case "ArrowLeft":
                this.maps[jugador.z].moveEntity(jugador, x, --y);
            break;
    
            case "ArrowRight":
                this.maps[jugador.z].moveEntity(jugador, x, ++y);
            break;
        }

    }
}