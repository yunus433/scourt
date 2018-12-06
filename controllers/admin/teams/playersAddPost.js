const mongoose = require('mongoose');
const Player = require('../../../models/player/Player');
const Team = require('../../../models/team/Team');

module.exports = (req, res, next) => {
  Team
    .findById(mongoose.Types.ObjectId(req.query.id), (err, team) => {
      if (err) return console.log(err);

      let newPlayerData;

      newPlayerData = {
        name: req.body.name,
        date: req.body.date,
        gender: req.body.gender,
        team: team.name,
        teamId: req.query.id,
        gol: req.body.gol,
        asist: req.body.asist,
        pozisyon: req.body.pozisyon,
        position: req.body.pozisyon,
        positionGerman: req.body.pozisyon,
        boy: req.body.boy,
        kilo: req.body.kilo,
        ayak: req.body.ayak,
        profile: req.body.profile
      };
  
      const newPlayer = new Player(newPlayerData);
      newPlayer.save((err, result) =>  {
        if (err) return console.log(err);

        Team
          .findByIdAndUpdate({"_id": mongoose.Types.ObjectId(req.query.id)},  {$push: {
            "players": result
          }}, {upsert: true})
          .exec((err) => {
            if (err) return console.log(err);
  
            res.redirect('/admin/teams/addPlayer/?id=' + req.query.id);
          });
        });
    });
};
