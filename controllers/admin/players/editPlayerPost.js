const mongoose = require('mongoose');
const Player = require('../../../models/player/Player');
const Team = require('../../../models/team/Team');

module.exports = (req, res, next) => {
  Player
    .findOneAndUpdate({"_id": mongoose.Types.ObjectId(req.query.id)},  {$set: {
      "name": req.body.name,
      "date": req.body.date,
      "gender": req.body.gender,
      "gol": req.body.gol,
      "asist": req.body.asist,
      "pozisyon": req.body.pozisyon,
      "position": req.body.pozisyon,
      "positionGerman": req.body.pozisyon,
      "boy": req.body.boy,
      "kilo": req.body.kilo,
      "ayak": req.body.ayak,
      "profile": req.body.profile || undefined
    }}, {upsert: true, new: true})
    .exec((err, player) => {
      if (err) return console.log(err);


      Team
        .findOneAndUpdate({"_id": mongoose.Types.ObjectId(player.teamId)},  {$pull: {
          "players": {_id: mongoose.Types.ObjectId(req.query.id)}
        }}, {upsert: true})
        .exec(
          err => {
            if (err) return console.log(err);

          }
        );

    Team
      .findOneAndUpdate({"_id": mongoose.Types.ObjectId(player.teamId)},  {$push: {
        "players": player
      }}, {upsert: true}).exec(
        err => {
          if (err) return console.log(err);

        }
      );

      res.redirect('/admin/players');
    })
}
