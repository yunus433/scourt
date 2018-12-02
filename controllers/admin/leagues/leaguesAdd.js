const mongoose = require('mongoose');
const Team = require('../../../models/team/Team');

module.exports = (req, res, next) => {
  Team
    .find()
    .exec(
      (err, teams) => {
        if (err) return console.log(err);

        res.render('admin/leagues/new', {
          page: 'admin/leagues/new',
          title:  'Yeni Lig',
          includes: {
            external: ["fontawesome"]
          },
          teams
        });
      });
};
