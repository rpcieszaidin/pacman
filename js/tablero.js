pacman.FILAS = 10;
pacman.COLUMNAS = 10;
pacman.NIVELES = 3;
pacman.FANTASMA = 'F';
pacman.JUGADOR = 'J';
pacman.ENTRADA = 'E';
pacman.SALIDA = 'S';
pacman.VALORMURO = 1;
pacman.VALORLIBRE = 0;
pacman.VALOREXPLORADO = -1;


pacman.Tablero = class {
    constructor(elemTablero){
        this.tableroMostrado = elemTablero;
        this.inicializarVariablesDePosicion();
        this.casillas = new Array(pacman.NIVELES);
        for(let i=0; i<pacman.NIVELES; i++) {
            this.casillas[i] = new Array(pacman.FILAS);
        }
        for(let i=0; i<pacman.NIVELES; i++) {
            for(let j=0; j<pacman.FILAS; j++) {
                this.casillas[i][j] = new Array(pacman.COLUMNAS);
            }
        }
        this.generarMapa();
        this.entidades = [];
        this.aniadirEntidad(pacman.JUGADOR);
        this.aniadirEntidad(pacman.FANTASMA);
        this.aniadirEntidad(pacman.SALIDA);
        this.mostrarMapa();
    }
    inicializarVariablesDePosicion(){
        this.nivelActual = 0;
        this.jugadorIniX = 0;
        this.jugadorIniY = 0;
        this.fantasmaIniX = Math.floor(pacman.FILAS/2);
        this.fantasmaIniY = Math.floor(pacman.COLUMNAS/2);
        this.salidaX = pacman.FILAS-1;
        this.salidaY = pacman.COLUMNAS-1;
    }
    aniadirEntidad(tipo) {
        if (tipo === pacman.JUGADOR) {
            let jugador = new pacman.Entidad(this.jugadorIniX,this.jugadorIniY, this.nivelActual, pacman.JUGADOR);
            this.casillas[this.nivelActual][this.jugadorIniX][this.jugadorIniY] = jugador;
            this.entidades.push(jugador);
        }
        else if (tipo === pacman.FANTASMA) {
            let fantasma = new pacman.Entidad(this.fantasmaIniX,this.jugadorIniY, this.nivelActual, pacman.FANTASMA);
            this.casillas[this.nivelActual][this.fantasmaIniX][this.fantasmaIniY] = fantasma;
            this.entidades.push(fantasma);
        }
        else if (tipo === pacman.SALIDA) {
            let salida = new pacman.Entidad(this.salidaX,this.salidaY, this.nivelActual, pacman.SALIDA);
            this.casillas[this.nivelActual][this.salidaX][this.salidaY] = salida;
            this.entidades.push(salida);
        } 
        else if (tipo === pacman.ENTRADA) {
            let entrada = new pacman.Entidad(this.jugadorIniX,this.jugadorIniY, this.nivelActual, pacman.ENTRADA);
            this.casillas[this.nivelActual][this.jugadorIniX][this.jugadorIniY] = entrada;
            this.entidades.push(entrada);
        } 
    }
    generarMapa(){
        this.copiaTablero = new Array(pacman.FILAS);
        for(let i=0; i<pacman.FILAS; i++) {
            this.copiaTablero[i] = new Array(pacman.COLUMNAS);
        }
        do{
            do{
                for(let i=0; i<pacman.FILAS; i++){
                    for(let j=0; j<pacman.COLUMNAS; j++){
                        this.casillas[this.nivelActual][i][j] = Math.floor(Math.random() * 2);
                    }
                }
                this.casillas[this.nivelActual][this.jugadorIniX][this.jugadorIniY] = pacman.VALORLIBRE;
                this.casillas[this.nivelActual][this.fantasmaIniX][this.jugadorIniY] = pacman.VALORLIBRE;
                this.casillas[this.nivelActual][this.salidaX][this.salidaY] = pacman.VALORLIBRE;
            }while(!this.mapaValido());
            this.nivelActual++;
            let aux = this.jugadorIniX;
            this.jugadorIniX = this.salidaX;
            this.salidaX = aux;
            aux = this.jugadorIniY;
            this.jugadorIniY = this.salidaY;
            this.salidaY = aux;
        }while(this.nivelActual<pacman.NIVELES)
        this.inicializarVariablesDePosicion();
    }
    mapaValido(){
        this.copiarTablero();
        let resultado = this.hayCamino(this.jugadorIniX, this.jugadorIniY, this.salidaX, this.salidaY);
        if(resultado){
            this.copiarTablero();
            resultado = this.hayCamino(this.fantasmaIniX, this.jugadorIniY, this.jugadorIniX, this.jugadorIniY);
        }
        return resultado;
    }
    copiarTablero(){
        for(let i=0; i<pacman.FILAS; i++){
            for(let j=0; j<pacman.COLUMNAS; j++){
                this.copiaTablero[i][j] = this.casillas[this.nivelActual][i][j];
            }
        }
    }
    hayCamino(origenX, origenY, destinoX, destinoY){
        let resultado = false;
        if(origenX>=0 && origenX<pacman.FILAS && origenY>=0 && origenY<pacman.COLUMNAS && 
            this.copiaTablero[origenX][origenY]!=pacman.VALORMURO && this.copiaTablero[origenX][origenY]!=pacman.VALOREXPLORADO){
            if(origenX==destinoX && origenY==destinoY){
                resultado = true;
            }
            else{
                this.copiaTablero[origenX][origenY] = pacman.VALOREXPLORADO;
                if(this.hayCamino(origenX-1, origenY, destinoX, destinoY) || this.hayCamino(origenX+1, origenY, destinoX, destinoY) ||
                    this.hayCamino(origenX, origenY-1, destinoX, destinoY) || this.hayCamino(origenX, origenY+1, destinoX, destinoY)){
                    resultado = true;
                }
            }
        }
        return resultado;
    }
    mostrarMapa(){
        this.tableroMostrado.innerHTML = "";
        let mapa = this.casillas[this.nivelActual];
        for(let i=0; i<mapa.length; i++){
            for(let j=0; j<mapa[i].length; j++){
                let elem = document.createElement("div");
                if (typeof mapa[i][j] == 'object'){
                    if(Array.isArray(mapa[i][j])){
                        let encontrado = false;
                        let array = mapa[i][j];
                        for (let k=0; k<array.length && !encontrado; k++) {
                            if(array[k].tipo === pacman.FANTASMA){
                                elem.setAttribute("class", "casilla fantasma");
                                encontrado = true;
                            }
                            else if(array[k].tipo === pacman.JUGADOR){
                                elem.setAttribute("class", "casilla jugador");
                                encontrado = true;
                            }
                            else if(array[k].tipo === pacman.SALIDA){
                                elem.setAttribute("class", "casilla salida");
                                encontrado = true;
                            }
                            else if(array[k].tipo === pacman.ENTRADA){
                                elem.setAttribute("class", "casilla entrada");
                                encontrado = true;
                            }
                        }
                    }
                    else{
                        if(mapa[i][j].tipo === pacman.FANTASMA){
                            elem.setAttribute("class", "casilla fantasma");
                        }
                        else if(mapa[i][j].tipo === pacman.JUGADOR){
                            elem.setAttribute("class", "casilla jugador");
                        }
                        else if(mapa[i][j].tipo === pacman.SALIDA){
                            elem.setAttribute("class", "casilla salida");
                        }
                        else if(mapa[i][j].tipo === pacman.ENTRADA){
                            elem.setAttribute("class", "casilla entrada");
                        }
                    }
                }
                else{
                    if(this.casillas[this.nivelActual][i][j]==pacman.VALORMURO){
                        elem.setAttribute("class", "casilla muro");
                    }
                    else if(this.casillas[this.nivelActual][i][j]==pacman.VALORLIBRE){
                        elem.setAttribute("class", "casilla libre");
                    }
                }
                this.tableroMostrado.appendChild(elem);
            }
            let elem = document.createElement("div");
            elem.setAttribute("class", "limpia");
            this.tableroMostrado.appendChild(elem);
        }
    }
    jugadorAtrapado(){
        //return this.jugador.x==this.fantasma.x && this.jugador.y==this.fantasma.y;
        return false;
    }
    salidaEncontrada(){
        /*
        let resultado = false;
        if(this.jugador.x==this.salidaX && this.jugador.y==this.salidaY){
            if(this.nivelActual==pacman.NIVELES-1){
                resultado = true;
            }
            else{
                this.nivelActual++;
                let aux = this.jugadorIniX;
                this.jugadorIniX = this.salidaX;
                this.salidaX = aux;
                aux = this.jugadorIniY;
                this.jugadorIniY = this.salidaY;
                this.salidaY = aux;
                this.jugador.x = this.jugadorIniX;
                this.jugador.y = this.jugadorIniY;
                this.fantasma.x = this.fantasmaIniX;
                this.fantasma.y = this.jugadorIniY;
            }
        }
        else if(this.nivelActual>0 && this.jugador.x==this.jugadorIniX && this.jugador.y==this.jugadorIniY){
            this.nivelActual--;
            let aux = this.jugadorIniX;
            this.jugadorIniX = this.salidaX;
            this.salidaX = aux;
            aux = this.jugadorIniY;
            this.jugadorIniY = this.salidaY;
            this.salidaY = aux;
            this.fantasma.x = this.fantasmaIniX;
            this.fantasma.y = this.jugadorIniY;
        }
        return resultado;
        */
       return false;
    }
    moverEntidad(entidad, x, y){
        let resultado = false;
        let mapa = this.casillas[entidad.z];
        if(x>=0 && y>=0 && x<mapa[y].length && y<mapa.length){
            if(mapa[x][y] === pacman.VALORLIBRE){
                mapa[x][y] = entidad;
                if(Array.isArray(mapa[entidad.x][entidad.y])){
                    mapa[entidad.x][entidad.y].pop;
                }
                else{
                    mapa[entidad.x][entidad.y] = pacman.VALORLIBRE;
                }
                entidad.x = x;
                entidad.y = y;
                resultado = true;
            }
            else if (typeof mapa[x][y] == 'object'){
                if(Array.isArray(mapa[x][y])){
                    mapa[x][y].push(entidad);
                }
                else{
                    mapa[x][y] = [mapa[x][y], entidad];
                }
                if(Array.isArray(mapa[entidad.x][entidad.y])){
                    mapa[entidad.x][entidad.y].pop;
                }
                else{
                    mapa[entidad.x][entidad.y] = pacman.VALORLIBRE;
                }
                entidad.x = x;
                entidad.y = y;
                resultado = true;
            }
        }
        return resultado;
    }
    moverFantasma(entidad){
        let puede = false;
        while(!puede){
            let dado = Math.floor(Math.random() * 4);
            switch(dado){
                case 0:
                    puede = this.moverEntidad(entidad, entidad.x-1, entidad.y);
                break;
                case 1:
                    puede = this.moverEntidad(entidad, entidad.x, entidad.y-1);
                break;
                case 2:
                    puede = this.moverEntidad(entidad, entidad.x+1, entidad.y);
                break;
                case 3:
                    puede = this.moverEntidad(entidad, entidad.x, entidad.y+1);
                break;
            }
        }
    }
}