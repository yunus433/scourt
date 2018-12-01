const mongoose = require('mongoose');
const Team = require('../../../models/team/Team');

module.exports = (req, res, next) => {
  Team
    .findById(mongoose.Types.ObjectId(req.query.id), (err, team) => {
      if (err) return console.log(err);
      res.render('admin/teams/edit', {
        page: 'admin/teams/edit',
        title:  'Takım Detayları',
        includes: {
          external: ["fontawesome"]
        },
        team
      });
    })
};
