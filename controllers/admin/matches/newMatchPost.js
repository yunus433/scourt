const mongoose = require('mongoose');
const Match = require('../../../models/match/Match');
const League = require('../../../models/league/League');
const Team = require('../../../models/team/Team');

module.exports = (req, res, next) => {
  Team
    .find()
    .exec(
      (err, teams) => {
        if (err) return console.log(err);

        teams.forEach(team => {
          if (team._id.toString() == req.body.teamOne) {
            req.body.teamOne = team;
          } 
          if (team._id.toString() == req.body.teamTwo) {
            req.body.teamTwo = team;
          };
        });

        League
          .findById(mongoose.Types.ObjectId(req.body.league), (err, league) => {
            if (err) return console.log(err);

            let newMatchData = {
              date: req.body.date,
              teamOne: req.body.teamOne,
              teamTwo: req.body.teamTwo,
              result: req.body.result,
              league: league
            };
      
            const newMatch = new Match(newMatchData);
            newMatch.save((err, result) =>  {
              if (err) return console.log(err);

              League
                .findOneAndUpdate({"_id": mongoose.Types.ObjectId(req.body.league)},  {$push: {
                  "matches": result
                }}, {upsert: true}).exec(
                  err => {
                    if (err) return console.log(err);

                    Team
                      .findOneAndUpdate({"_id": mongoose.Types.ObjectId(req.body.teamOne._id)},  {$push: {
                        "matches": result
                      }}, {upsert: true}).exec(
                        err => {
                          if (err) return console.log(err);
      
                          Team
                            .findOneAndUpdate({"_id": mongoose.Types.ObjectId(req.body.teamTwo._id)},  {$push: {
                              "matches": result
                            }}, {upsert: true}).exec(
                              err => {
                                if (err) return console.log(err);
            
                                
                                res.redirect('/admin/matches');
                              }
                            );
                        }
                      );
                  } 
                );
            });
          });
        
      }
    );
};
