const mongoose = require('mongoose');
const Match = require('../../../models/match/Match');

module.exports = (req, res, next) => {
  Match
    .find()
    .sort({"date": -1})
    .exec(
      (err, matches) => {
        if (err) return console.log(err);
        res.render('admin/matches', {
          page: 'admin/matches',
          title: 'Maç Bilgileri',
          includes: {
            external: ["fontawesome", "js"]
          },
          matches
        })
      }
    );
}
