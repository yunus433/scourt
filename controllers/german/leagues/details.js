const mongoose = require('mongoose');
const League = require('./../../../models/league/League');

module.exports = (req, res, next) => {

    League
      .findById(mongoose.Types.ObjectId(req.query.id))
      .exec(
        (err, record) => {
          if (err) return console.log(err);

            if (err) return console.log(err);

            res.render("german/leagues/details", {
              page: "german/leagues/details",
              title: record.name,
              includes: {
                external: ["fontawesome", "js", "js-header"]
              },
              record
            });
  });
};
