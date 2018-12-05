const mongoose = require('mongoose');
const Team = require('../../../models/team/Team');
const League = require('../../../models/league/League');

module.exports = (req, res, next) => {
  League
    .find()
    .exec(
      (err, leagues) => {
        if (err) return console.log(err);

        Team
        .find()
        .exec(
          (err, teams) => {
            if (err) return console.log(err);
    
            res.render('admin/matches/new', {
              page: 'admin/matches/new',
              title:  'Yeni Maç',
              includes: {
                external: ["fontawesome"]
              }, 
              teams,
              leagues
            });
          });
      }
    );
};
