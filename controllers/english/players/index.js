const playerRequest = require('./../../../utils/airtableRequests/playerRequest');
let arrayPlayers = [];

module.exports = (req, res, next) => {
  arrayPlayers = [];
  playerRequest(req.base, arrayPlayers, (err, players) => {
    if (err) return console.log(err); 
    res.render("english/players/players", {
      page: "english/players/players",
      title: "Players",
      includes: { 
        external: ["fontawesome", "js", "js-header"]
      },
      players
    });
  });
}
