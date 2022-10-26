pacman.Map = class{
    constructor(){
        this.array = [
            [0, 0, 1, 0, 0, 0], 
            [0, 0, 1, 0, 0, 1], 
            [0, 0, 0, 0, 0, 0], 
            [1, 1, 0, 1, 0, 0], 
            [0, 0, 0, 1, 0, 0]
        ]

        this.div = document.getElementById('game');
    }

    //Mueve una entidad haciendo las respectivas comprobaciones
    moveEntity(entity, x, y) {
        let map = this.array;

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

        this.updateBoard(entity.type, x, y, false)
        
        entity.x = x;
        entity.y = y;
        return true;
    }
    
    //Recibe un valor, y las posiciones, y actualiza ese puesto de la tabla
    updateBoard(valor, x, y){
        let htmlMap = document.getElementById('map');
        let nodosX = htmlMap.childNodes;
        let nodosY = nodosX[x].childNodes;
        nodosY[y].innerHTML = valor;
    }

    //Dibuja en tablero en el html
    drawBoard() {
        let map = this.array;
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
                    }else if(Array.isArray(map[i][j])){
                        if(map[i][j][0] === pacman.ESCALERA){
                            cell.textContent = "C";
                        }
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

    //Añade una entidad al juego ya sea jugador o fantasma
    addEntity(type) {
        let map = this.array;
        let entity = null;

        if (type === pacman.PLAYER) {
            entity = new pacman.Entity(0, 0, 0, pacman.PLAYER);
        }else if (type === pacman.ENEMY) {
            entity = new pacman.Entity(4, 5, 0, pacman.ENEMY);
        }

        map[entity.x][entity.y] = entity;
        return entity;
    }
}