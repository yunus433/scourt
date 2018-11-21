const mongoose = require('mongoose');
const Player = require('../../models/player/Player');

module.exports = (req, res, next) => {
  Player
    .find()
    .exec(
      (err, users) => {
        if (err) return console.log(err);
        res.render("admin/main", {
          page: "admin/main",
          title: "Admin Sayfası",
          includes: {
            external: ["fontawesome", "js"]
          },
          playerNumber: users.length
        });
      }
    );
}
