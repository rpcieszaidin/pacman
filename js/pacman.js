pacman.Pacman = class {
    constructor(x, y, z, type) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.type = type;
    }

    move(){
        document.addEventListener("keydown", function(event) {
            if (event.key == "ArrowLeft"){
                alert("Left key"); //show the message saying Left key"
                
            } else if (event.key == "ArrowUp"){
                alert("Up key"); //show the message saying Up key"
            } else if (event.key == "ArrowRight"){
                alert("Right key"); //show the message saying Right key"
            } else if (event.key == "ArrowDown"){
                alert("Down key"); //show the message saying Down key"
            }
        });
    }
}