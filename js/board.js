var pacman = pacman || {};

pacman.PELLET = 0;
pacman.BARRIER = 1;
pacman.EMPTY = 44;
pacman.PLAYER = 20;
pacman.ENEMY = 40;
pacman.PORTAL = 2;

pacman.Board = class {
  constructor() {
    this.maps = [
      [
        [0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0],
        [0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 2],
      ],
      [
        [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0],
        [0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 2],
      ],
    ];
    this.copyMaps = JSON.parse(JSON.stringify(this.maps));
    this.entities = [];
    this.oldCellContent = pacman.PELLET;
    this.interval = null;
    this.isGameFinished = false;
    this.numMap = 0;
  }

  startGame() {
    let button = document.createElement("button");
    button.setAttribute("id", "btStart");
    button.appendChild(document.createTextNode("INICIAR PARTIDA"));
    document.getElementById("message").appendChild(button);
    this.addEntity(pacman.PLAYER, 0, 0, 0);
    this.addEntity(pacman.PLAYER, 14, 4, 1);
    this.addEntity(pacman.ENEMY, 14, 0, 0);
    this.addEntity(pacman.ENEMY, 0, 0, 1);
    this.drawBoard();
    button.onclick = () => {
      document.getElementById("btStart").setAttribute("hidden", "hidden");
      this.playerMovements();
      this.enemyMovements();
      this.promise();
    };
  }

  finishGame(gameWon) {
    this.isGameFinished = true;
    clearInterval(this.interval);
    let message = gameWon ? "HAS GANADO" : "HAS PERDIDO";
    document
      .getElementById("message")
      .appendChild(document.createTextNode("FIN DE LA PARTIDA: " + message));
    document
      .getElementById("message")
      .appendChild(document.createElement("br"));
    let button = document.createElement("button");
    button.appendChild(document.createTextNode("VOLVER A JUGAR"));
    document.getElementById("message").appendChild(button);
    button.onclick = function () {
      location.reload();
    };
  }

  addEntity(type, x, y, z) {
    let map = this.copyMaps[z];
    let entity = null;
    switch (type) {
      case pacman.PLAYER:
        entity = new pacman.Entity(x, y, z, pacman.PLAYER);
        break;
      case pacman.ENEMY:
        entity = new pacman.Entity(x, y, z, pacman.ENEMY);
        break;
    }
    map[entity.y][entity.x] = entity;
    this.entities.push(entity);
  }

  entityMovements(entity, movement) {
    switch (movement) {
      case 0:
        this.moveEntity(entity, entity.x, entity.y - 1);
        break;
      case 1:
        this.moveEntity(entity, entity.x - 1, entity.y);
        break;
      case 2:
        this.moveEntity(entity, entity.x, entity.y + 1);
        break;
      case 3:
        this.moveEntity(entity, entity.x + 1, entity.y);
        break;
      case 4:
        this.changeMap();
        break;
    }
    document.getElementById("board").remove();
    this.drawBoard();
  }

  playerMovements() {
    document.addEventListener("keydown", (event) => {
      if (!this.isGameFinished) {
        let move;
        switch (event.key.toLowerCase()) {
          case "w":
            move = 0;
            break;
          case "a":
            move = 1;
            break;
          case "s":
            move = 2;
            break;
          case "d":
            move = 3;
            break;
          case "q":
            move = 4;
            break;
        }
        this.entityMovements(
          this.entities.find(
            (element) =>
              element.type == pacman.PLAYER && element.z == this.numMap
          ),
          move
        );
      }
    });
  }

  enemyMovements() {
    this.interval = setInterval(() => {
      this.entityMovements(
        this.entities.find(
          (element) => element.type == pacman.ENEMY && element.z == this.numMap
        ),
        Math.floor(Math.random() * 4)
      );
    }, 500);
  }

  moveEntity(entity, x, y) {
    let map = this.copyMaps[entity.z];
    if (x >= 0 && x < map[map.length - 1].length && y >= 0 && y < map.length) {
      let oldCellContent,
        cellContent = map[y][x];
      if (cellContent != pacman.BARRIER) {
        let newCellContent = entity;
        if (entity.type == pacman.PLAYER) {
          oldCellContent = pacman.EMPTY;
          if (cellContent.type == pacman.ENEMY) {
            newCellContent = this.entities.find(
              (element) => element.type == pacman.ENEMY
            );
            this.finishGame(false);
            let player = this.entities.find(
              (element) => element.type == pacman.PLAYER
            );
            let enemy = this.entities.find(
              (element) => element.type == pacman.ENEMY
            );
            console.log(
              "playerX:" +
                player.x +
                "\tplayerY:" +
                player.y +
                "\nenemyX:" +
                enemy.x +
                "\tenemyY:" +
                enemy.y
            );
          }
        } else {
          oldCellContent = this.oldCellContent;
          if (cellContent.type == pacman.PLAYER) {
            this.finishGame(false);
          } else {
            this.oldCellContent = cellContent;
          }
        }
        map[entity.y][entity.x] = oldCellContent;
        map[y][x] = newCellContent;
        entity.x = x;
        entity.y = y;
        if (this.countPellets() == 0) this.finishGame(true);
      }
    }
  }

  drawBoard() {
    let table = document.createElement("table");
    table.setAttribute("id", "board");
    let map = this.copyMaps[this.numMap];
    for (let i = 0; i < map.length; i++) {
      let tr = document.createElement("tr");
      for (let j = 0; j < map[i].length; j++) {
        let th = document.createElement("th");
        tr.appendChild(th);
        let cellContent = null;
        if (typeof map[i][j] == "object") {
          if (map[i][j].type === pacman.PLAYER) {
            cellContent = "O";
          } else {
            cellContent = "A";
          }
        } else {
          switch (map[i][j]) {
            case pacman.PELLET:
              cellContent = "X";
              break;
            case pacman.BARRIER:
              cellContent = "2";
              break;
            case pacman.EMPTY:
              cellContent = "G";
              break;
            case pacman.PORTAL:
              cellContent = "S";
              break;
          }
          if (i == 4 && j == 14) {
            if (cellContent != "S") cellContent = "S";
          }
        }
        tr.cells[j].appendChild(document.createTextNode(cellContent));
        th.setAttribute("class", "cell-" + cellContent);
        table.appendChild(tr);
      }
    }
    document.getElementById("title").appendChild(table);
  }

  countPellets() {
    let numPellets = 0;
    for (let i = 0; i < this.maps.length; i++) {
      for (let j = 0; j < this.maps[i].length; j++) {
        for (let k = 0; k < this.maps[i][j].length; k++) {
          if (this.maps[i][j][k] == pacman.PELLET) numPellets++;
        }
      }
    }
    return numPellets;
  }

  changeMap() {
    let player = this.entities.find(
      (element) => element.type == pacman.PLAYER && element.z == this.numMap
    );
    if (player.x == 14 && player.y == 4) {
      if (this.numMap == 0) {
        this.numMap = 1;
      } else {
        this.numMap = 0;
      }
      clearInterval(this.interval);
      document.getElementById("board").remove();
      this.drawBoard();
      this.enemyMovements();
      this.oldCellContent = pacman.PELLET;
    }
  }

  promise() {
    const myPromise = new Promise((finishGame) => {
      let player = this.entities.find(
        (element) => element.type == pacman.PLAYER
      );
      let enemy = this.entities.find((element) => element.type == pacman.ENEMY);
      console.log(player);
      console.log(enemy);
      if (player.x == enemy.x && player.y == enemy.y) finishGame(false);
    });
    myPromise.then((val) => this.finishGame(val));
  }
};
