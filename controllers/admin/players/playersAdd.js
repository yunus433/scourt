const mongoose = require('mongoose');
const Team = require('../../../models/team/Team');

module.exports = (req, res, next) => {
  Team
    .find()
    .exec(
      (err, teams) => {
        if (err) return console.log(err);

        res.render('admin/players/new', {
          page: 'admin/players/new',
          title:  'Yeni Oyuncu',
          includes: {
            external: ["fontawesome"]
          }, 
          teams
        });
      });
};
