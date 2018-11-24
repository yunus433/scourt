const mongoose = require('mongoose');
const Leagues = require('../../../models/league/Leagues');

module.exports = (req, res, next) => {
  Leagues
    .find()
    .sort({"date": -1})
    .exec(
      (err, leagues) => {
        if (err) return console.log(err);
        res.render('admin/leagues', {
          page: 'admin/leagues',
          title: 'Lig Bilgileri',
          includes: {
            external: ["fontawesome"]
          },
          leagues
        })
      }
    );
}
