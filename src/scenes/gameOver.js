import Phaser from "phaser";

export default class GameOver extends Phaser.Scene {
  constructor() {
    super("GameOver");
  }

  preload() {
    this.load.image("GameOver", "images/gameOver.jpg");
  }

  create() {
    this.timeStart = 0;

    const {
      game: {
        config: { width, height },
      },
    } = this;
    const {
      sys: {
        game: {
          globals: { apiLink },
        },
      },
    } = this;
    this.add.image(450, 300, "GameOver");

    apiLink.addScore(
      this.sys.game.globals.username,
      this.sys.game.globals.score
    );

    let textStyle_Value = {
      font: "bold 30px Press Start 2P",
      //fill: "#fff",
      ///fill: "#FF5733",
      fill: "#E13510",
      align: "center",
    };
    this.add.text(
      width / 2 - 70,
      height / 2 + 70,
      "Your score: " + this.sys.game.globals.score,
      textStyle_Value
    );
  }

  update() {
    this.timeStart++;
    if (this.timeStart == 200) this.start();
  }

  start() {
    this.scene.start("BestScores");
  }
}
