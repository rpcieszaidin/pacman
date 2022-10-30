let start = document.getElementById("button");
start.onclick = () => {this.init()};

function init(){
    let board = new pacman.Board();
    board.init();
}