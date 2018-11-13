const tournamentRequest = require('./../../../utils/airtableRequests/tournamentRequest');
let arrayTournaments = [];

module.exports = (req, res, next) => {
  arrayTournaments = [];

  tournamentRequest(req.base, arrayTournaments, (err, tournaments) => {
    if (err) return console.log(err);
    res.render("english/leagues/leagues", {
      page: "english/leagues/leagues",
      title: "Leagues",
      includes: {
        external: ["fontawesome", "js", "js-header"]
      },
      tournaments
    });
  });
};
