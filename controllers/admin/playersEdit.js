const mongoose = require('mongoose');
const Player = require('../../models/player/Player');

module.exports = (req, res, next) => {
  Player
    .findById(mongoose.Types.ObjectId(req.query.id), (err, player) => {
      if (err) return console.log(err);
      res.render('admin/players/edit', {
        page: 'admin/players/edit',
        title:  'Oyuncu Detayları',
        includes: {
          external: ["fontawesome"]
        },
        player
      });
    })
}
