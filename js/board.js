var pacman = pacman || {};

pacman.PLAYER = 98;
pacman.ENEMY = 1;

pacman.Board = class {
    constructor() {
        this.maps = [
            [
                [0, 0, 1, 0, 0, 0], [0, 0, 1, 0, 0, 1], [0, 0, 0, 0, 0, 0], [1, 1, 0, 1, 0, 0], [0, 0, 0, 1, 0, 0]
            ]
        ];
        this.entities = [];
    }
    addEntity(type) {
        if (type === pacman.PLAYER) {
            // implementar metodo posicion correcta
            let player = new pacman.Pacman(0, 0, 0, pacman.PLAYER);
            this.maps[0][0][0] = player;
            this.entities.push(player);
        } else if(type === pacman.ENEMY){
            let ghost = new pacman.Ghost(3, 3, 0, pacman.ENEMY);
            this.maps[0][3][3] = ghost;
            this.entities.push(ghost);
        }
    }
    drawBoard() {
        let map = this.maps[0];
        for (let i = 0; i < map.length; i++) {
            for(let j = 0; j < map[i].length; j++) {
                if (typeof map[i][j] == 'object'){
                    if (map[i][j].type === pacman.PLAYER) {
                        console.log('P');
                    } else{
                        console.log('E');
                    }
                } else {
                    console.log(map[i][j]);
                }
            }
        }
    }
    static moveEntity(entity, x, y) {
        let map = this.maps[entity.z];
        if (x >= 0 && x < map[y].length && y >= 0 && y < map.length) {
            //Esto ignora comprobaciones, habrá que implementarlas
            this.maps[entity.z][entity.x][entity.y] = 0;
            entity.x=x;
            entity.y=y;
            this.maps[entity.z][x][y] = entity;
            //comprobacion por consola de las coordenadas del objeto
            console.log("coordenada x " + entity.x);
            console.log("coordenada y " + entity.y);
        }
        this.drawBoard();
    }    
    //metodo de prueba de movimiento
    //BORRAR MÁS ADELANTE!!
    moveTest(){
        this.entities.forEach(element => {
            if(element.type == pacman.ENEMY){
                //implementar movimiento enemigo
                //this.moveEntity(element, element.x+1, element.y);
            }
        });
            this.entities[0].movePlayer(6);
            //this.moveEntity(this.entities[0], 1, 1)
    }
}
