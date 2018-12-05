const mongoose = require('mongoose');
const Player = require('../../../models/player/Player');
const Team = require('../../../models/team/Team');

module.exports = (req, res, next) => {
  Team
    .findById(mongoose.Types.ObjectId(req.body.team), (err, team) => {
      if (err) return console.log(err);
      let newPlayerData = {
        name: req.body.name,
        date: req.body.date,
        gender: req.body.gender,
        team: team.name,
        teamId: req.body.team,
        gol: req.body.gol,
        asist: req.body.asist,
        pozisyon: req.body.pozisyon,
        position: req.body.pozisyon,
        positionGerman: req.body.pozisyon,
        boy: req.body.boy,
        kilo: req.body.kilo,
        ayak: req.body.ayak,
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
