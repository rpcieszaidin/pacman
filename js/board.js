var pacman = pacman || {};

pacman.PLAYER = 98;
pacman.ENEMY = 3;

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
            let player = new pacman.Pacman(4, 2, 0, pacman.PLAYER);
            this.maps[0][4][2] = player;
            this.entities.push(player);
        }else if(type === pacman.ENEMY){
            let enemy = new pacman.Ghost(0,2,0, pacman.ENEMY);
            this.maps[0][2][0]=enemy;
            this.entities.push(enemy);
        }
    }
    drawBoard() {
        let div =document.getElementById('mapa');
        div.innerHTML=""
        let map = this.maps[0];
        for (let i = 0; i < map.length; i++) {
            let tr=document.createElement('tr');
            div.append(tr)
            for(let j = 0; j < map[i].length; j++) {
                let td=document.createElement('td')
                td.style
                td.style.width='150px';
                td.style.height='150px';
                if (typeof map[i][j] == 'object'){
                    if (map[i][j].type === pacman.PLAYER) {
                        //console.log('P');
                        td.style.backgroundColor='yellow'
                    }else if(map[i][j].type === pacman.ENEMY){
                       //console.log("G");
                        td.style.backgroundColor='red'
                    } 
                } else {
                    // console.log(map[i][j]);
                    if(map[i][j]==1){
                        td.innerHTML=td.style.backgroundColor='black';
                    }
                }
                tr.appendChild(td)
            }
        }
    }
    moveEntity(entity, x, y) {
        let map = this.maps[entity.z];
        if (x >=0 && x < map.length && y >= 0 && y < map[x].length) {
            if(map[x][y]!=1){
                map[entity.x][entity.y]=0
                entity.x=x;
                entity.y=y;
                this.maps[entity.z][x][y]=entity;
                return true;
            }
            return false
        } 
        return false 
    }
    moveBtn(){
        let btns=document.getElementById('buttons')
        let entity=this.entities.find((e)=>e.type==98)
        let entityIndex=this.entities.findIndex((e)=>e.type==98)
        console.log("indice"+entityIndex)
        let map=entity.z
        //console.log(map)
        btns.onclick=(e)=>{
            if(e.target.id=='up'){
                console.log(entity.x-1)
                if(this.moveEntity(this.maps[map][entity.x][entity.y],entity.x-1,entity.y)==true) this.drawBoard()
                console.log(this.maps[entity.z][entity.x][entity.y])  
            }else if(e.target.id=='down'){
                console.log('down')
                if(this.moveEntity(this.maps[map][entity.x][entity.y],entity.x+1,entity.y)==true ) this.drawBoard()
                console.log(this.maps[entity.z][entity.x][entity.y])  
            }else if(e.target.id=='left'){
                console.log("left")
                console.log(entity.y-1)
                if(this.moveEntity(this.maps[map][entity.x][entity.y],entity.x,entity.y-1)==true ) this.drawBoard()
                console.log(this.maps[entity.z][entity.x][entity.y])
            }else if(e.target.id=='right'){
                console.log("right")
                console.log(entity.y+1)
                if(this.moveEntity(this.maps[map][entity.x][entity.y],entity.x,entity.y+1)==true ) this.drawBoard()
                console.log(this.maps[entity.z][entity.x][entity.y])
            }
        }
    }
}

