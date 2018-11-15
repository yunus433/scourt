const playerRequest = require('./../../../utils/airtableRequests/playerRequest');
let arrayPlayers = [];
let record;

module.exports = (req, res, next) => {
  arrayPlayers = [];
  playerRequest(req.base, arrayPlayers, (err, players) => {
    if (err) return console.log(err);
    players.forEach(player => {
      if(player.getId() == req.query.id) {
        record = player;
        res.render("german/players/details", {
          page: "german/players/details",
          title: "Spieler Details",
          includes: {
            external: ["fontawesome", "js"]
          },
          record
        });
      }
    });
  });
}
