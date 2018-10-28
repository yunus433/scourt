const tournamentRequest = require('../../utils/airtableRequests/tournamentRequest');
let arrayTournaments = [];
let record;

module.exports = (req, res, next) => {
  arrayTournaments = [];

  tournamentRequest(req.base, arrayTournaments, (err, tournaments) => {
    if (err) return console.log(err);
    tournaments.forEach(tournament => {
      if (tournament.getId() == req.query.id) {
        record = tournament;
        res.render("leagues/details", {
          page: "leagues/details",
          title: record.get('Name'),
          includes: {
            external: ["fontawesome", "js"]
          },
          record
        });
      };
    });
  });
}
