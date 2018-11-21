const mongoose = require('mongoose');
const Player = require('../../models/player/Player');

module.exports = (req, res, next) => {
  Player
    .find()
    .exec(
      (err, players) => {
        if (err) return console.log(err);
        res.render('admin/players', {
          page: 'admin/players',
          title: 'Oyuncu Bilgileri',
          includes: {
            external: ["fontawesome", "js"]
          },
          players
        })
      }
    );
}
