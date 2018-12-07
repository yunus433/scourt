const Player = require('../../../models/player/Player');

module.exports = (req, res, next) => {
    Player
      .find()
      .sort({"gol": -1})
      .exec(
        (err, players) => {
          if (err) return console.log(err); 

          res.render("index/players/players", {
            page: "index/players/players",
            title: "Oyuncular",
            includes: { 
              external: ["fontawesome", "js", "js-header"]
            },
            players
          });
        }
      )
}
