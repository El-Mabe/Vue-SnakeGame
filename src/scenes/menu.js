import Phaser from "phaser";

export default class Menu extends Phaser.Scene {
  preload() {
    this.load.image("main", "images/main.png");
    this.load.image("play", "images/play.png");
    this.load.image("scores", "images/scores.png");
  }

  create() {
    const {
      game: {
        config: { width, height },
      },
    } = this;
    //background
    this.add.image(400, 190, "main");
    const userInput = document.getElementById("username");
    userInput.classList.toggle("hide");
    //play button
    const playbtn = this.add.sprite(width / 2 - 320, height / 2 + 60, "play");
    playbtn.setScale(0.8);
    playbtn.setInteractive();
    playbtn.on("pointerdown", this.playClick.bind(this));

    //scores button

    const scoresbtn = this.add.sprite(
      width / 2 - 120,
      height / 2 + 60,
      "scores"
    );
    scoresbtn.setScale(0.8);
    scoresbtn.setInteractive();
    scoresbtn.on("pointerdown", this.scoresClick.bind(this));
  }

  playClick() {
    const userInput = document.getElementById("username");
    if (userInput.value === "") userInput.value = "Player";

    userInput.classList.toggle("hide");
    this.sys.game.globals.username = userInput.value;
    userInput.value = "";
    this.scene.start("Game");
  }

  scoresClick() {
    const userInput = document.getElementById("username");
    userInput.classList.toggle("hide");
    this.scene.stop('Menu');
    this.scene.start("BestScores");
  }
}
