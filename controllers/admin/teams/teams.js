const mongoose = require('mongoose');
const Player = require('../../../models/player/Player');
const Team = require('../../../models/team/Team');

module.exports = (req, res, next) => {
  Player
    .find()
    .sort({"gol": -1})
    .exec(
      (err, players) => {
        if (err) return console.log(err);
        Team
          .find()
          .exec(
            (err, teams) => {
              if (err) return console.log(err);
              res.render('admin/teams', {
                page: 'admin/teams',
                title: 'Takım Bilgileri',
                includes: {
                  external: ["fontawesome", "js"]
                },
                players,
                teams
              }
            );
          }
        );
      }
    );
};
