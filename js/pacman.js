pacman.Pacman = class {
    constructor(x, y, z, type) {
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
                board.moveEntity(this, this.x, this.y - 1)
                break;
            case "ArrowRight":
                board.moveEntity(this, this.x + 1 , this.y)
                break;
            case "ArrowDown":
                board.moveEntity(this, this.x, this.y + 1)
                break;
            case "ArrowLeft":
                board.moveEntity(this, this.x - 1, this.y)
                break;
        }
    }

    lose(){
        this.removeControls()
        document.getElementById("lose").style.visibility = "visible"
    }
}