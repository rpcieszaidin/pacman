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
            let enemy = new pacman.Ghost(2,0,0, pacman.ENEMY);
            enemy.interval= setInterval(()=>enemy.MoveAuto(),1000);
            this.maps[0][2][0]=enemy;
            this.entities.push(enemy);
        }
    }
    drawBoard() {
        let div =document.getElementById('mapa');
        div.innerHTML="";
        let map = this.maps[0];
        for (let i = 0; i < map.length; i++) {
            let tr=document.createElement('tr');
            div.appendChild(tr);
            for(let j = 0; j < map[i].length; j++) {
                let td=document.createElement('td');
                td.style.width='150px';
                td.style.height='150px';
                if (typeof map[i][j] == 'object'){
                    if (map[i][j].type === pacman.PLAYER) {
                        td.style.backgroundColor='yellow';
                    }else if(map[i][j].type === pacman.ENEMY){
                        td.style.backgroundColor='red';
                    } 
                } else {
                    if(map[i][j]==1){
                        td.innerHTML=td.style.backgroundColor='black';
                    }
                }
                tr.appendChild(td);
            }
        }
    }
    moveEntity(entity, x, y) {
        let map = this.maps[entity.z];
        if (x >=0 && x < map.length && y >= 0 && y < map[x].length) {
            if(map[x][y]!=1){
                let entityEnemy=this.entities.find((e)=>e.type!=entity.type);
                if(x==entityEnemy.x && y==entityEnemy.y){
                    if(entity.type==3){
                        clearInterval(entity.interval);
                    }else{
                        clearInterval(entityEnemy.interval);
                    }
                    document.getElementById('text').innerHTML="GAME OVER!!!";
                    document.getElementById('buttons').style.pointerEvents='none';
                }
                map[entity.x][entity.y]=0;
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
        let btns=document.getElementById('buttons');
        let entity=this.entities.find((e)=>e.type==98);
        //let entityIndex=this.entities.findIndex((e)=>e.type==98)
        let map=entity.z;
        btns.onclick=(e)=>{
            if(e.target.id=='up'){
                if(this.moveEntity(this.maps[map][entity.x][entity.y],entity.x-1,entity.y)==true) this.drawBoard(); 
            }else if(e.target.id=='down'){
                if(this.moveEntity(this.maps[map][entity.x][entity.y],entity.x+1,entity.y)==true ) this.drawBoard(); 
            }else if(e.target.id=='left'){
                if(this.moveEntity(this.maps[map][entity.x][entity.y],entity.x,entity.y-1)==true ) this.drawBoard();
            }else if(e.target.id=='right'){
                if(this.moveEntity(this.maps[map][entity.x][entity.y],entity.x,entity.y+1)==true ) this.drawBoard();
            }
        }
    }
}

