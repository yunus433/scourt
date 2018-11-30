const mongoose = require('mongoose');
const Player = require('../../../models/player/Player');

module.exports = (req, res, next) => {
  Player
    .find({ teamId: req.query.id })
    .sort({"gol": -1})
    .exec(
      (err, players) => {
        if (err) return console.log(err);

        res.render('admin/teams/newPlayer', {
          page: 'admin/teams/newPlayer',
          title:  'Yeni Oyuncu',
          includes: {
            external: ["fontawesome"]
          },
          id: req.query.id,
          players
        });  
      });
};
