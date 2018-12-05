const mongoose = require('mongoose');
const League = require('../../../models/league/League');
const Team = require('../../../models/team/Team');

module.exports = (req, res, next) => {

  Team
    .find()
    .exec(
      (err, teams) => {
        if (err) return console.log(err);
        
        let newLeagueData = {
          name: req.body.name,
          date: req.body.date,
          status: req.body.status
        };

        const newLeague = new League(newLeagueData);
        newLeague.save((err, result) =>  {
          if (err) return console.log(err);
          let teamsArray = [];

          for (let i = 0; i < teams.length; i++) {
            let variable = 'team' + i;

            if (req.body[variable]) {
              teamsArray.push(teams.filter(team => team.id == req.body[variable])[0]);
            };
          };

          teamsArray.forEach(team => {
            League
              .findOneAndUpdate({"_id": mongoose.Types.ObjectId(result._id)},  {$push: {
                "teams": team
              }}, {upsert: true}).exec(
                err => {
                  if (err) return console.log(err);

                }
              );
            });

            res.redirect('/admin/leagues');
          });
      });
};
