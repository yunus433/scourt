const mongoose = require('mongoose');
const Player = require('../../../models/player/Player');

module.exports = (req, res, next) => {
  Player
    .findByIdAndDelete(mongoose.Types.ObjectId(req.query.id))
    .exec(
      (err) => {
        if (err) return console.log(err);
        res.redirect('/admin/players');
      }
    );
}
