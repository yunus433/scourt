const mongoose = require('mongoose');
const League = require('../../../models/league/League');
const Team = require('../../../models/team/Team');

module.exports = (req, res, next) => {
  let array = [];

  Team
    .find()
    .exec(
      (err, teams) => {
        if (err) return console.log(err);

        for (let i = 0; i < teams.length; i++) {
          let variable = 'team' + i;
          if (req.body[variable]) {
            let team = teams.filter(team => team.id == req.body[variable]);
            array.push(team);
          };
        };

        console.log(array);
        let newLeagueData = {
          name: req.body.name,
          date: req.body.date,
          status: req.body.status,
          teams: array
        };

        const newLeague = new League(newLeagueData);
        newLeague.save(err =>  {
          if (err) return console.log(err);
      
          res.redirect('/admin/leagues');
        });
      })
};
