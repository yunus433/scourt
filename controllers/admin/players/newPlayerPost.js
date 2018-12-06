const mongoose = require('mongoose');
const Player = require('../../../models/player/Player');
const Team = require('../../../models/team/Team');

module.exports = (req, res, next) => {
  Team
    .findById(mongoose.Types.ObjectId(req.body.team), (err, team) => {
      if (err) return console.log(err);
      let newPlayerData = {
        name: req.body.name || 'default',
        date: req.body.date || 'default',
        gender: req.body.gender || 'default',
        team: team.name || 'default',
        teamId: req.body.team || 'default',
        gol: req.body.gol || 'default',
        asist: req.body.asist || 'default',
        pozisyon: req.body.pozisyon || 'default',
        position: req.body.pozisyon || 'default',
        positionGerman: req.body.pozisyon || 'default',
        boy: req.body.boy || 'default',
        kilo: req.body.kilo || 'default',
        ayak: req.body.ayak || 'default',
        profile: req.body.profile || undefined
      };

      const newPlayer = new Player(newPlayerData);
      newPlayer.save((err, result) =>  {
        if (err) return console.log(err);
        Team
          .findOneAndUpdate({"_id": mongoose.Types.ObjectId(req.body.team)},  {$push: {
            "players": result
          }}, {upsert: true}).exec(
            err => {
              if (err) return console.log(err);

              res.redirect('/admin/players');
            }
          );
      });
    });
};
