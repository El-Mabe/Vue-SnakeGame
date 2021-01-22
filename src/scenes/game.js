import Phaser from "phaser";
class Game extends Phaser.Scene {
  constructor() {
    super({ key: "Game" });

    this.snake;
    this.score;
    this.apple;
    this.direction;
    this.squareSize;
    this.newDirection;
    this.speed;
    this.updateDelay;
    this.addNew;
    this.appleR;
    this.eatRedApple;
    this.time;

    this.endGame;
    this.timeRed;
    this.isObstacle;
    this.obstacle;
  }

  preload() {
    this.load.image("background", "images/background .png");
    this.load.image("snake", "images/snake1.png");
    this.load.image("appleG", "images/GreenApple.png");
    this.load.image("appleR", "images/RedApple.png");
    this.load.image("obstacle", "images/ladrillo.png");
  }
  create() {
    this.add.image(450, 300, "background");

    this.snake = [];
    this.score = 0;
    this.apple = {};
    this.appleR = {};
    this.direction = "right";
    this.newDirection = null;
    this.squareSize = 16;
    this.speed = 0;
    this.updateDelay = 0;
    this.addNew = false;
    this.eatRedApple = false;
    this.obstacle = [];
    this.isObstacle = false;

    this.timeRed = 0;

    this.timeRandomGap = Math.floor(Math.random() * (11000 - 4000)) + 4000;
    this.cursors = this.input.keyboard.createCursorKeys();

    for (let i = 0; i < 1; i++) {
      this.snake[i] = this.add.sprite(160 + i * this.squareSize, 160, "snake");
    }
    /*
    for (let i = 0; i < 1; i++) {
      this.obstacle[i] = this.add.sprite(0, 0, "obstacle");
    }
    */

    this.generateAppleGreen();
    this.generateAppleRed();
    this.label();
    //console.log(this.appleR);
  }

  label() {
    let textStyle_Key = {
      font: "bold 14px sans-serif",
      fill: "#2F4F4F",
      align: "center",
    };
    let textStyle_Value = {
      font: "bold 18px sans-serif",
      fill: "#fff",
      align: "center",
    };

    this.add.text(30, 20, "SCORE", textStyle_Key);
    this.scoreTextValue = this.add.text(
      90,
      18,
      this.score.toString(),
      textStyle_Value
    );
  }
  /*
  randomIntervalRedApple() {
    interval = setInterval(function() {
      this.appleR.destroy();
      // Make a new one.
      let randomX = Math.floor(Math.random() * 40) * this.squareSize,
        randomY = Math.floor(Math.random() * 30) * this.squareSize;
      // Add a new apple.
      this.appleR = this.add.sprite(randomX, randomY, "appleR");
    }, timeRandomGapBonus);
  }
*/
  update() {
    //this.timeRed++;
    if (this.eatRedApple) {
      //if (this.timeRed > 300) {
      let num = Math.floor(Math.random() * 30);
      if (num == 15) {
        this.generateAppleRed();
        this.eatRedApple = false;
      }
      //}
    }

    if (this.cursors.right.isDown && this.direction != "left") {
      this.newDirection = "right";
    } else if (this.cursors.left.isDown && this.direction != "right") {
      this.newDirection = "left";
    } else if (this.cursors.up.isDown && this.direction != "down") {
      this.newDirection = "up";
    } else if (this.cursors.down.isDown && this.direction != "up") {
      this.newDirection = "down";
    }

    this.speed = Math.min(4, Math.floor(this.score / 2));
    this.updateDelay++;
    if (this.updateDelay % (10 - this.speed) == 0) {
      var firstCell = this.snake[this.snake.length - 1],
        lastCell = this.snake.shift(),
        oldLastCellx = lastCell.x,
        oldLastCelly = lastCell.y;

      if (this.newDirection) {
        this.direction = this.newDirection;
        this.newDirection = null;
      }

      if (this.direction == "right") {
        lastCell.x = firstCell.x + 16;
        lastCell.y = firstCell.y;
      } else if (this.direction == "left") {
        lastCell.x = firstCell.x - 16;
        lastCell.y = firstCell.y;
      } else if (this.direction == "up") {
        lastCell.x = firstCell.x;
        lastCell.y = firstCell.y - 16;
      } else if (this.direction == "down") {
        lastCell.x = firstCell.x;
        lastCell.y = firstCell.y + 16;
      }

      this.snake.push(lastCell);
      firstCell = lastCell;

      if (this.addNew) {
        this.snake.unshift(
          this.add.sprite(oldLastCellx, oldLastCelly, "snake")
        );
        this.addNew = false;
      }

      if (this.eatRedApple) {
        if (this.snake.length < 1) {
          this.scene.start("GameOver");
        } else {
          this.snake[0].destroy();
          this.snake.shift();
          this.snake[0].destroy();
          this.snake.shift();
          //this.eatRedApple = false;
          //console.log(this.appleR);
        }
      }

      if (this.isObstacle) {
        //this.addObstacle();
        let randomX = Math.ceil(Math.random() * 55) * this.squareSize;
        let randomY = Math.ceil(Math.random() * 30) * this.squareSize;
        this.obstacle.unshift(this.add.sprite(randomX, randomY, "obstacle"));
        this.isObstacle = false;
      }

      this.eatApple();
      this.eatAppleRed();
      this.selfCollision(firstCell);
      this.gameOverByWall(firstCell);
      this.gameOverByObstacle(firstCell);

      this.randomRed();
    }
  }

  randomRed() {
    if (this.eatRedApple) {
      //if (this.timeRed > 300) {
      let num = Math.floor(Math.random() * 1000);
      if (num == 15) {
        this.generateAppleRed();
        this.eatRedApple = false;
      }
      //}
    }
  }

  generateAppleGreen() {
    let randomX = Math.ceil(Math.random() * 55) * this.squareSize;
    let randomY = Math.ceil(Math.random() * 30) * this.squareSize;
    this.apple = this.add.sprite(randomX, randomY, "appleG");
  }

  generateAppleRed() {
    let randomX = Math.ceil(Math.random() * 55) * this.squareSize;
    let randomY = Math.ceil(Math.random() * 30) * this.squareSize;
    this.appleRed = this.add.sprite(randomX, randomY, "appleR");
  }

  eatApple() {
    for (var i = 0; i < this.snake.length; i++) {
      if (this.snake[i].x == this.apple.x && this.snake[i].y == this.apple.y) {
        this.addNew = true;
        this.apple.destroy();
        this.generateAppleGreen();
        this.score++;
        this.scoreTextValue.text = this.score.toString();
        this.timeRandomGap = Math.floor(Math.random() * (11000 - 4000)) + 4000;
        if (this.score % 2 == 0) {
          this.isObstacle = true;
        }
      }
    }
  }
  gameOverByObstacle(head) {
    for (var i = 0; i < this.obstacle.length - 1; i++) {
      if (head.x == this.obstacle[i].x && head.y == this.obstacle[i].y) {
        this.scene.start("GameOver");
      }
    }
  }

  eatAppleRed() {
    for (var i = 0; i < this.snake.length; i++) {
      if (
        this.snake[i].x == this.appleRed.x &&
        this.snake[i].y == this.appleRed.y
      ) {
        this.eatRedApple = true;
        this.appleRed.destroy();
      }
    }
  }

  addObstacle() {
    let randomX = Math.ceil(Math.random() * 55) * this.squareSize;
    let randomY = Math.ceil(Math.random() * 30) * this.squareSize;

    this.obstacle.unshift(this.add.sprite(randomX, randomY, "obstacle"));
  }
  selfCollision(head) {
    for (var i = 0; i < this.snake.length - 1; i++) {
      if (head.x == this.snake[i].x && head.y == this.snake[i].y) {
        this.sys.game.globals.score = this.score;
        this.scene.start("GameOver");
      }
    }
  }

  gameOverByWall(head) {
    const {
      game: {
        config: { width, height },
      },
    } = this;
    if (head.x < 0 || head.x >= width || head.y >= height || head.y < 0) {
      this.sys.game.globals.score = this.score;
      this.scene.stop("Game");
      this.scene.start("GameOver");
    }
  }
}

export default Game;
