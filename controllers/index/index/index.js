const indexRequest = require('./../../../utils/mainRequests/indexRequest');

let arrayPlayers = [];
let arrayMatches = [];
let arrayTournaments = [];

module.exports = (req, res, next) => {
  arrayPlayers = [];
  arrayMatches = [];
  arrayTournaments = [];

  indexRequest(arrayPlayers, arrayMatches, arrayTournaments, req.base, (err, arrays) => {
    if (err) return console.log(err);
    res.render("index/main/main", {
      page: "index/main/main",
      title: "Ana Sayfa",
      includes: {
        external: ["fontawesome"]
      },
      players: arrays[0],
      matches: arrays[1],
      lastMatch: arrays[1][0],
      tournaments: arrays[2].slice(0, 3)
    });
  });
};
