var pacman = pacman || {};

pacman.PLAYER = 98;
pacman.ENEMY = 1;

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
        this.div = document.getElementById('tablero');
    }

    //Añade una entidad al juego ya sea jugador o fantasma
    addEntity(type) {
        if (type === pacman.PLAYER) {
            // implementar metodo posicion correcta
            let player = new pacman.Pacman(0, 0, 0, pacman.PLAYER);
            this.maps[0][0][0] = player;
            this.entities.push(player);
        } 
    }

    //Dibuja en tablero en el html
    drawBoard() {
        let map = this.maps[0];
        let tabla = document.createElement('table');

        this.div.textContent = "";

        //Bucle para recorrer el mapa imprimiento los objetos
        for (let i = 0; i < map.length; i++) {
            let row = document.createElement('tr');
            for(let j = 0; j < map[i].length; j++) {
                let cell = document.createElement('td');
                if (typeof map[i][j] == 'object'){
                    if (map[i][j].type === pacman.PLAYER) {
                        cell.textContent = "A"
                    }else if(typeof map[i][j] === pacman.ENEMY){
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

    moveEntity(entity, x, y) {
        //Cogemos el mapa en el que esta la entidad que se va a mover
        let map = this.maps[entity.z];


        //Si está fuera de los límites no se puede añadir
        if (!(x >= 0 && x < map.length && y >= 0 && y < map[x].length)) { return false }
        //Si ambas son diferentes no se puede añadir
        if(!(entity.x == x || entity.y == y)){ return false}
        //Si la x es diferente comprobamos que no haya cambiado mas de una casilla
        if(entity.x != x ){
            if(!(entity.x > x && entity.x - x == 1 || x - entity.x == 1)){ return false }
        }
        //Si la y es diferente comprobamos que no haya cambiado mas de una casilla
        if(entity.y != y){
            if(!(entity.y > x && entity.y - y == 1 || y - entity.y == 1)){ return false }
        }

        //Aquí solo se llegará cuando se cumplan todas las condiciones anteriores, si no, saldran devolviendo un false antes de hacer ningun cambio
        map[entity.x][entity.y] = 0;
        map[x][y] = entity;
        entity.x = x;
        entity.y = y;
        return true;
    }
}