const mongoose = require('mongoose');
const Match = require('../../../models/match/Match');
const League = require('../../../models/league/League');
const Team = require('../../../models/team/Team');

module.exports = (req, res, next) => {
  Match
    .findById(mongoose.Types.ObjectId(req.query.id))
    .exec(
      (err, match) => {
        if (err) return console.log(err);
            
        League
          .findOneAndUpdate({"_id": mongoose.Types.ObjectId(match.league._id)},  {$pull: {
            "matches": {_id: match._id}
          }}, {upsert: true})
          .exec((err) => {
            if (err) return console.log(err);

            Team
              .findOneAndUpdate({"_id": mongoose.Types.ObjectId(match.teamOne._id)},  {$pull: {
                "matches": {_id: match._id}
              }}, {upsert: true})
              .exec((err) => {
                if (err) return console.log(err);
    
                Team
                  .findOneAndUpdate({"_id": mongoose.Types.ObjectId(match.teamTwo._id)},  {$pull: {
                    "matches": {_id: match._id}
                  }}, {upsert: true})
                  .exec((err) => {
                    if (err) return console.log(err);
        
                    Match
                    .findByIdAndDelete(mongoose.Types.ObjectId(req.query.id))
                    .exec(
                      (err) => {
                        if (err) return console.log(err);
                
                        res.redirect('/admin/matches');
                      }
                    );
                });
              });
          });
      }
    );
}
