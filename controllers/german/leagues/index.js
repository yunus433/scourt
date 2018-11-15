const tournamentRequest = require('./../../../utils/airtableRequests/tournamentRequest');
let arrayTournaments = [];

module.exports = (req, res, next) => {
  arrayTournaments = [];

  tournamentRequest(req.base, arrayTournaments, (err, tournaments) => {
    if (err) return console.log(err);
    res.render("german/leagues/leagues", {
      page: "german/leagues/leagues",
      title: "Ligen",
      includes: {
        external: ["fontawesome", "js", "js-header"]
      },
      tournaments
    });
  });
};
