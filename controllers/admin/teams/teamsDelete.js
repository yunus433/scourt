const mongoose = require('mongoose');
const Team = require('../../../models/team/Team');
const Player = require('../../../models/player/Player');

module.exports = (req, res, next) => {
  Team
    .findById(mongoose.Types.ObjectId(req.query.id))
    .exec(
      (err, team) => {
        if (err) return console.log(err);
        team.players.forEach(player => {
          Player
            .findByIdAndDelete(player._id)
            .exec(
              (err) => {
                if (err) return console.log(err);
              }
            )
        });

        Team
        .findByIdAndDelete(mongoose.Types.ObjectId(req.query.id))
        .exec(
          (err) => {
            if (err) return console.log(err);
            res.redirect('/admin/teams');
          }
        );
      }
    );
};
