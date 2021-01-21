import Phaser from "phaser";
import ApiComms from '../request/api'
import Game from "./game";
import GameOver from "./gameOver";
import BestScores from './bestscores'
import Menu from './menu'

const apiLink = new ApiComms();

const config = {
  width : 900,
  height: 500,
  parent: "container",
  physics: {
    default: "arcade",
  },
  type: Phaser.AUTO,

};
var game = new Phaser.Game(config);
game.globals = { score: 0, username: '', apiLink}
game.scene.add('Game', Game);
game.scene.add('Menu', Menu);
game.scene.add('GameOver', GameOver);
game.scene.add('BestScores', BestScores);
game.scene.start('Menu')

export default game;
