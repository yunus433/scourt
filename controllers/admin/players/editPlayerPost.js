const mongoose = require('mongoose');
const Player = require('../../../models/player/Player');

module.exports = (req, res, next) => {
  Player
    .findOneAndUpdate({"_id": mongoose.Types.ObjectId(req.query.id)},  {$set: {
      "name": req.body.name,
      "date": req.body.date,
      "gender": req.body.gender,
      "team": req.body.team,
      "gol": req.body.gol,
      "asist": req.body.asist,
      "pozisyon": req.body.pozisyon,
      "position": req.body.pozisyon,
      "positionGerman": req.body.pozisyon,
      "boy": req.body.boy,
      "kilo": req.body.kilo,
      "ayak": req.body.ayak,
      "profile": req.body.profile || undefined
    }}, {upsert: true})
    .exec((err) => {
      if (err) return console.log(err);

      res.redirect('/admin/players');
    })
}
