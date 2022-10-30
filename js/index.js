let start = document.getElementById("button");
start.onclick = () => {this.init()};

let comenzado = false;
let board;

function init(){
    if(comenzado){
        board.gameOver();
    }

    comenzado = true;
    board = new pacman.Board();
    board.init();
}