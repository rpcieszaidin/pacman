pacman.Pacman = class {
    constructor(x, y, z, type, board) {
        this.board = board
        this.x = x;
        this.y = y;
        this.z = z;
        this.type = type;
        this.setUpControls();
    }

    setUpControls(){
        window.addEventListener("keyup", this.keyListener) 
    }

    removeControls(){
        window.removeEventListener("keyup", this.keyListener) 
    }

    keyListener = (event) =>{
        switch(event.code){
            case "ArrowUp":
                this.board.moveEntity(this, this.x, this.y - 1)
                break;
            case "ArrowRight":
                this.board.moveEntity(this, this.x + 1 , this.y)
                break;
            case "ArrowDown":
                this.board.moveEntity(this, this.x, this.y + 1)
                break;
            case "ArrowLeft":
                this.board.moveEntity(this, this.x - 1, this.y)
                break;
        }
    }

    lose(){
        this.removeControls()
        document.getElementById("lose").style.visibility = "visible"
    }
}