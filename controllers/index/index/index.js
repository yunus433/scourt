const Player = require('./../../../models/player/Player');
const Match = require('./../../../models/match/Match');
const League = require('./../../../models/league/League');

module.exports = (req, res, next) => {
  Player
    .find()
    .sort({"gol": -1})
    .exec(
      (err, players) => {
        if (err) return console.log(err);

        Match
          .find()
          .exec(
            (err, matches) => {
              if (err) return console.log(err);

              League
                .find()
                .exec(
                  (err, leagues) => {
                    if (err) return console.log(err);

                    res.render("index/main/main", {
                      page: "index/main/main",
                      title: "Ana Sayfa",
                      includes: {
                        external: ["fontawesome"]
                      },
                      players,
                      matches, 
                      leagues
                    });
                  }
                );
          }
        );
      }
    );
};
