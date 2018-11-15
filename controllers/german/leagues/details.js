const tournamentRequest = require('./../../../utils/airtableRequests/tournamentRequest');
const sortingAlgorithm = require('./../../../utils/sortingAlgorithm/tournamentSort');
let arrayTournaments = [];
let record;

module.exports = (req, res, next) => {
  arrayTournaments = [];

  tournamentRequest(req.base, arrayTournaments, (err, tournaments) => {
    if (err) return console.log(err);
    tournaments.forEach(tournament => {
      if (tournament.getId() == req.query.id) {
        record = tournament;
        sortingAlgorithm(tournament.matches, (err, sort) => {
          if (err) return console.log(err);

          res.render("german/leagues/details", {
            page: "german/leagues/details",
            title: record.get('Name'),
            includes: {
              external: ["fontawesome", "js", "js-header"]
            },
            record,
            sort
          });
        }); 
      };
    });
  });
}