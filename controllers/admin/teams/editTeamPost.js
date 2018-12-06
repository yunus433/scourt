const mongoose = require('mongoose');
const Team = require('../../../models/team/Team');
const League = require('../../../models/league/League');

module.exports = (req, res, next) => {
  Team
    .findOneAndUpdate({"_id": mongoose.Types.ObjectId(req.query.id)},  {$set: {
      "name": req.body.name,
      "logo": req.body.logo
    }}, {upsert: true, new: true})
    .exec((err, team) => {
      if (err) return console.log(err);

      League
        .find()
        .exec(
          (err, leagues) => {
            if (err) return console.log(err);

            leagues.forEach(league => {
              league.teams.forEach(leagueTeam => {
                if (leagueTeam._id.toString() == team._id.toString()) {

                  League
                    .findOneAndUpdate({"_id": mongoose.Types.ObjectId(league._id)},  {$pull: {
                      "teams": {_id: leagueTeam._id}
                    }}, {upsert: true})
                    .exec(
                      err => {
                        if (err) return console.log(err);

                      }
                    );

                  League
                    .findOneAndUpdate({"_id": mongoose.Types.ObjectId(league._id)},  {$push: {
                      "teams": team
                    }}, {upsert: true}).exec(
                      err => {
                        if (err) return console.log(err);

                      }
                    );
                }
              });
            });

            res.redirect('/admin/teams');
          }
        );
    });
};
