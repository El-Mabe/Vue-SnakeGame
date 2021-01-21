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

    this.time;



    this.endGame;
  }

  preload() {
    this.load.image("background", "images/background .png");
    this.load.image("snake", "images/snake1.png");
    this.load.image("apple", "images/food.png");
  }
  create() {

    this.add.image(450, 300, "background")

    this.snake = [];
    this.score = 0;
    this.apple = {};
    this.direction = "right";
    this.newDirection = null;
    this.squareSize = 16;
    this.speed = 0;
    this.updateDelay = 0;
    this.addNew = false;

    this.timeRandomGap = Math.floor(Math.random() * (11000 - 4000)) + 4000;
    this.cursors = this.input.keyboard.createCursorKeys();

    for (let i = 0; i < 1; i++) {
      this.snake[i] = this.add.sprite(160 + i * this.squareSize, 160, "snake");
    }

    this.generateApple();
    this.label();
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

  update() {    
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

      this.eatApple();
      this.selfCollision(firstCell);
      this.gameOverByWall(firstCell);
    }
  }

  generateApple() {
    let randomX = Math.ceil(Math.random() * 55) * this.squareSize;
    let randomY = Math.ceil(Math.random() * 30) * this.squareSize;
    this.apple = this.add.sprite(randomX, randomY, "apple");
  }

  eatApple() {
    for (var i = 0; i < this.snake.length; i++) {
      if (this.snake[i].x == this.apple.x && this.snake[i].y == this.apple.y) {
        this.addNew = true;
        this.apple.destroy();
        this.generateApple();
        this.score++;
        this.scoreTextValue.text = this.score.toString();
        this.timeRandomGap = Math.floor(Math.random() * (11000 - 4000)) + 4000;
      }
    }
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
      if (head.x < 0 || head.x >= width || head.y >=  height || head.y < 0) {
        this.sys.game.globals.score = this.score;
        this.scene.stop("Game");
        this.scene.start("GameOver");
      }
  }
}

export default Game;
