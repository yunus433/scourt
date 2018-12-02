const mongoose = require('mongoose');
const Player = require('../../../models/player/Player');
const Team = require('../../../models/team/Team');

module.exports = (req, res, next) => {
  Player
    .findById(mongoose.Types.ObjectId(req.query.id))
    .exec(
      (err, player) => {
        if (err) return console.log(err);

        Team
          .findById(mongoose.Types.ObjectId(player.teamId))
          .exec((err, team) => {
            if (err) return console.log(err);

            function indexFind(item) {
              return item._id.toString() == player._id.toString();
            } 
            let index = team.players.findIndex(indexFind);
            let array = team.players;
            if (index > -1) {
              array.splice(index, 1);
            };
            
            Team
            .findOneAndUpdate({"_id": mongoose.Types.ObjectId(player.teamId)},  {$set: {
              "players": array
            }}, {upsert: true})
            .exec((err) => {
              if (err) return console.log(err);

              Player
              .findByIdAndDelete(mongoose.Types.ObjectId(req.query.id))
              .exec(
                (err) => {
                  if (err) return console.log(err);
          
          
                  res.redirect('/admin/players');
                }
              );
            });
          });
      }
    );
}
