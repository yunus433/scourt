const mongoose = require('mongoose');
const Match = require('../../../models/match/Match');
const Team = require('../../../models/team/Team');
const League = require('../../../models/league/League');

module.exports = (req, res, next) => {
  Team
    .find()
    .exec(
      (err, teams) => {
        if (err) return console.log(err);

        League
          .find()
          .exec(
            (err, leagues) => {
              if (err) return console.log(err);

              Match
              .findById(mongoose.Types.ObjectId(req.query.id), (err, match) => {
                if (err) return console.log(err);
                res.render('admin/matches/edit', {
                  page: 'admin/matches/edit',
                  title:  'Maç Detayları',
                  includes: {
                    external: ["fontawesome"]
                  },
                  match,
                  leagues,
                  teams
                });
              });
            }
          );
      });
};
