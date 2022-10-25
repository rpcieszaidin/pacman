pacman.Ghost = class {
    constructor(x, y, z,type) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.type = type;
        this.interval=null;
    }
    MoveAuto(){
        let move =Math.floor(Math.random()*4);
        if(move==0){//mover arriba
            
            if(board.moveEntity(board.maps[this.z][this.x][this.y],this.x-1,this.y)==true){
                board.drawBoard();
            }else{
                this.MoveAuto();
            }  
        }else if(move==1){ //mover abajo
            if(board.moveEntity(board.maps[this.z][this.x][this.y],this.x+1,this.y)==true){
                board.drawBoard();
            }else{
                this.MoveAuto();
            }  
        }else if(move==2){ //mover izquierda
            if(board.moveEntity(board.maps[this.z][this.x][this.y],this.x,this.y-1)==true){
                board.drawBoard();
            }else{
                this.MoveAuto();
            } 
        }else if(move==3){ //move derecha
            if(board.moveEntity(board.maps[this.z][this.x][this.y],this.x,this.y+1)==true){
                board.drawBoard();
            }else{
                this.MoveAuto();
            }  
        }
    }    
}