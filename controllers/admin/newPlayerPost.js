const mongoose = require('mongoose');
const Player = require('../../models/player/Player');

module.exports = (req, res, next) => {
    let newPlayerData = {
      name: req.body.name,
      date: req.body.date,
      gender: req.body.gender,
      team: req.body.team,
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
    newPlayer.save(err =>  {
      if (err) return console.log(err);

      res.redirect('/admin/players');
    });
}
