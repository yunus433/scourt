const playerRequest = require('./../../../utils/airtableRequests/playerRequest');
let arrayPlayers = [];
const Player = require('../../../models/player/Player');

module.exports = (req, res, next) => {
  arrayPlayers = [];
  playerRequest(req.base, arrayPlayers, (err, players) => {
    if (err) return console.log(err); 

    res.render("players/players", {
      page: "players/players",
      title: "Oyuncular",
      includes: { 
        external: ["fontawesome", "js", "js-header"]
      },
      players
    });
  });
}
