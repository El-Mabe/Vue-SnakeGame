import axios from "axios";

export default class ApiComms {
  constructor() {}

  async getScores() {
    const res = await axios.get("http://localhost:8002/scores");
    console.log(res);
    return res;
  }

  async addScore(name, score) {
    console.log("addScore");
    const resScores = await this.getScores();
    var id = 0;
    if (resScores.data == null) {
      id=0;
    }else  {
      id = resScores.data.length;
      id++
    }
    
    console.log(id);
    const scoreData = {
      id,
      name,
      score,
    };
    console.log(scoreData);
    const res = await axios.post("http://localhost:8081/add-user/", scoreData);
    return res;
  }
}
