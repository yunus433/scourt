const tournamentRequest = require('../../utils/airtableRequests/tournamentRequest');
let arrayTournaments = [];

module.exports = (req, res, next) => {
  arrayTournaments = [];

  tournamentRequest(req.base, arrayTournaments, (err, tournaments) => {
    if (err) return console.log(err);
    res.render("leagues/leagues", {
      page: "leagues/leagues",
      title: "Ligler",
      includes: {
        external: ["fontawesome", "js"]
      },
      tournaments
    });
  });
};
