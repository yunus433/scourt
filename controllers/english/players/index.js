const Player = require('../../../models/player/Player');

module.exports = (req, res, next) => {
    Player
      .find()
      .sort({"gol": -1})
      .exec(
        (err, players) => {
          if (err) return console.log(err); 

          res.render("english/players/players", {
            page: "english/players/players",
            title: "Players",
            includes: { 
              external: ["fontawesome", "js", "js-header"]
            },
            players
          });
        }
      )
}
