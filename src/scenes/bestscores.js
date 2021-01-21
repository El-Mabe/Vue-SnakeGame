import Phaser from "phaser";

class BestScores extends Phaser.Scene {
  constructor() {
    super({ key: "BestScores" });
  }

  preload() {
    this.load.image("highscore", "images/highscore1.png");
    this.load.image("home", "images/home.png")
  }
  async create() {
    this.timeStart = 0;   
    const {
      game: {
        config: { width, height },
      },
    } = this;   
    const homebtn = this.add.sprite(width / 2 , height - 50, "home");
    homebtn.setScale(0.45)
    homebtn.setInteractive();
    homebtn.on("pointerdown", this.homeClick.bind(this));

    const score = this.add.image(width / 2, 40, "highscore");
    score.setScale(0.6);

    const top = await this.getTopScores();
    this.label(top);
  }

  async getTopScores() {
    const {
      sys: {
        game: {
          globals: { apiLink: apiConn },
        },
      },
    } = this;
    const scores = await apiConn.getScores();

    var data = scores.data;
    let leaderLength = 10;
    const top10 = [];

    if (data.length < leaderLength) {
      leaderLength = data.length;
    }

    for (let i = 0; i < leaderLength; i++) {
      top10[i] = data[i];
    }

    return top10;
  }
  label(data) {
    let textStyle_Value = {
      font: "bold 18px sans-serif",
      fill: "#B0B0B0",
      align: "center",
      "text-shadow": "gray 6px 6px",
    };


const {
  game: {
    config: { width },
  },
} = this;
    let y = 100;

    if (data != null) {
      for (let i = 0; i < data.length && i < 10; i++) {
        let num = i + 1;
        let mas = 30;

        this.add.text((width / 2)-120, y, num.toString() + ".", textStyle_Value);
        this.add.text((width / 2)-100, y, " " + data[i].name, textStyle_Value);
        this.add.text((width / 2) + 100, y, " " + data[i].score, textStyle_Value);
        y = y + mas;
      }
    }
  }

  homeClick() {
    this.scene.start('Menu')
  }

  start() {
    this.scene.start('Menu')
  }
}
export default BestScores;
