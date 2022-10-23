var entity = entity ||{}
entity.Character = class {
    constructor(x, y, z, type) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.type = type;
    }

    move(entity){
        var ct= null;
        var x;
        var y;
        window.onload = function(){
            document.onkeydown = chars;
        }
        function chars(evento){
            if(window.event){
                evento = window.event;
                ct = evento.keyCode;
                if(ct == 38){
                    x = entity.x;
                    y = entity.y - 1;
                }else if(ct == 40){
                    x = entity.x;
                    y = entity.y + 1;
                }else if(ct == 39){
                    x = entity.x + 1;
                    y = entity.y;
                }else if(ct == 37){
                    x = entity.x - 1;
                    y = entity.y;
                }
                board.moveEntity(entity, x, y);
            }
        }
    }
}

// switch(ct){
//     case 38:
//         x = entity.x;
//         y = entity.y - 1;
//         this.move.push(x, y);
//         console.log("sidjakld");
//         break;
//     case 40:
//         x = entity.x;
//         y = entity.y + 1;
//         this.move.push(x, y);
//         break;
//     case 39:
//         x = entity.x + 1;
//         y = entity.y;
//         this.move.push(x, y);
//         break;
//     case 37:
//         x = entity.x - 1;
//         y = entity.y;
//         this.move.push(x, y);
//         break;
// }