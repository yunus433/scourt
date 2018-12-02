const mongoose = require('mongoose');
const League = require('../../../models/league/League');
const Team = require('../../../models/team/Team');

module.exports = (req, res, next) => {
  League
    .findById(mongoose.Types.ObjectId(req.query.id), (err, league) => {
      if (err) return console.log(err);

      Team
        .find()
        .exec(
          (err, teams) => {
            if (err) return console.log(err);

            res.render('admin/leagues/edit', {
              page: 'admin/leagues/edit',
              title:  'Lig Detayları',
              includes: {
                external: ["fontawesome"]
              },
              league,
              teams
            });
          }
        )
    });
};
