const mongoose = require('mongoose');
const League = require('../../../models/league/League');
const Match = require('../../../models/match/Match');

module.exports = (req, res, next) => {
  League
    .findById(mongoose.Types.ObjectId(req.query.id))
    .exec(
      (err, league) => {
        if (err) return console.log(err);
        league.matches.forEach(match => {
          Match
            .findByIdAndDelete(match._id)
            .exec(
              (err) => {
                if (err) return console.log(err);
              }
            )
        });

        League  
        .findByIdAndDelete(mongoose.Types.ObjectId(req.query.id))
        .exec(
          err => {
            if (err) return console.log(err);
    
            res.redirect('/admin/leagues');
          }
        );
      }
    );
};
