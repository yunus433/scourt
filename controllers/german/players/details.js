const mongoose = require('mongoose');
const Player = require('../../../models/player/Player');

module.exports = (req, res, next) => {
  Player
    .findById(mongoose.Types.ObjectId(req.query.id))
    .exec(
      (err, record) => {
        if (err) return console.log(err);

        res.render("german/players/details", {
          page: "german/players/details",
          title: "Spieler Details",
          includes: {
            external: ["fontawesome", "js"]
          },
          record
        });
      }
    );
}
